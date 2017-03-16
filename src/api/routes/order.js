const mongoose = require('mongoose'),
  moment = require('moment'),
  fs = require('fs'),
  crypto = require('crypto'),
  md5 = require('md5'),
  JSON2XML = require('js2xmlparser'),
  CONST = require('../const'),
  UTIL = require('../util'),
  User = require('../models/user'),
  Order = require('../models/order'),
  AlipayPrivateKey = fs.readFileSync('./rsa_private_key.pem').toString()

mongoose.Promise = global.Promise

const formatPaymentString = (order) => {
  let arr = [],
    str = ''

  for (let key in order) {
    arr.push({
      key,
      value: order[key]
    })
  }

  arr.sort((a, b) => {
    return (a.key > b.key)
  })

  for (let i = 0, j = arr.length; i < j; i++) {
    str += '&' + arr[i].key + '=' + arr[i].value
  }

  return str.substring(1)
},
Alipay = {
  assemblePaymentString(order) {
    let bizContent = Object.assign({}, CONST.Alipay[order.type].bizContent, {
        body: order.body,
        subject: order.title,
        out_trade_no: order._id,
        total_amount: order.subTotal.toString(),
        auth_token: order.auth_token || '',
        passback_params: order.passback_params || '',
        promo_params: order.promo_params || '',
        extend_params: order.extend_params || '',
        disable_pay_channels: order.disable_pay_channels || '',
        store_id: order.store_id || ''
      }),
      pubContent = Object.assign({}, CONST.Alipay[order.type].pubContent, {
        timestamp: moment(UTIL.getTimeFromId(order._id)).format('YYYY-MM-DD hh:mm:ss'),
        biz_content: JSON.stringify(bizContent)
      })
      
    return formatPaymentString(pubContent)
  },

  pay(order) {
    let sign = crypto.createSign('RSA-SHA1'),
      str = this.assemblePaymentString(order)

    sign.update(str)
    let signedStr = sign.sign(AlipayPrivateKey, 'base64')

    return str + '&sign=' + encodeURIComponent(signedStr)
  },

  verify(order, response) {
    let idCheck = (order._id.toString() === response.out_trade_no),
      paymentCheck = (order.subTotal.toString() === response.total_amount),
      sellerCheck = (CONST.Alipay[order.type].bizContent.seller_id === response.seller_id),
      appCheck = (CONST.Alipay[order.type].pubContent.app_id === response.app_id)

    return idCheck && paymentCheck && sellerCheck && appCheck
  }
},
WeChatPay = {
  assemblePaymentString(order) {
    let orderContent = Object.assign({}, CONST.WeChatPay[order.type].orderContent, {
        nonce_str: '',
        body: order.title,
        out_trade_no: order._id,
        total_fee: Math.round(order.subTotal * 100),
        spbill_create_ip: order.ip
      })

    return formatPaymentString(orderContent)
  },

  pay(order) {
    let str = this.assemblePaymentString(order)
    order.sign = md5(str)

    return JSON2XML(order)
  },

  verify(order, response) {

  }
}
  
module.exports = (app) => {
  function getOneById(id, res, statusCode) {
    Order
    .findById(id)
    .populate('event')
    .exec()
    .then((data) => {
      if (data) {
        res.status(statusCode).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  }

  /* Alipay validation */
  app.post('/alipay', (req, res, next) => {
    let sign = crypto.createSign('RSA-SHA1'),
      str = '{"a":"123"}'

    sign.update(str)
    let signedStr = sign.sign(AlipayPrivateKey, 'base64')

    res.status(200).send(encodeURIComponent(signedStr))
  })

  /* Create */
  app.post('/orders', (req, res, next) => {
    let order = new Order(req.body)

    User
    .findById(order.creator)
    .exec()
    .then((user) => {
      if (user) {
        return order.save()
      } else {
        res.status(404).send()
      }
    })
    .then((data) => {
      if (data) {
        let tmp = JSON.parse(JSON.stringify(data))

        switch (tmp.method) {
          case 'Alipay':
            tmp.Alipay = Alipay.pay(data)
          break

          case 'WeChatPay':
            tmp.WeChatPay = WeChatPay.pay(data)
          break
        }

        res.status(201).json(tmp)
      }
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  })

  /* Read */
  app.get('/orders/:id', (req, res, next) => {
    getOneById(req.params.id, res, 200)
  })

  /* List */
  app.get('/orders', (req, res, next) => {
    let query = {}

    if (req.query.creator) {
      query.creator = req.query.creator
    }

    Order
    .find(query)
    .populate('event')
    .limit(CONST.DEFAULT_PAGINATION)
    .sort({_id: -1})
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  })

  /* Delete */
  app.delete('/orders/:id', (req, res, next) => {
    Order
    .findById(req.params.id)
    .exec()
    .then((order) => {
      if (order) {
        order
        .remove()
        .then((data) => {
          if (data) {
            res.status(410).send()
          }
        })
        .catch((err) => {
          res.status(500).json({error: err})
        })
      } else {
        res.status(404).send()
      }
    })
  })

  /* Update */
  app.put('/orders', (req, res, next) => {
    let tmp = req.body

    switch (tmp.method) {
      case 'Alipay':
        let statusCode = tmp.resultStatus,
          result = tmp.result,
          response = result.alipay_trade_app_pay_response,
          id = response.out_trade_no

        Order
        .findById(id)
        .exec()
        .then((order) => {
          if (order && Alipay.verify(order, response)) {
            let status = CONST.Alipay[order.type].statuses[statusCode]

            order
            .set({
              status
            })
            .save()
            .then((data) => {
              res.status(200).json(data)
            })
            .catch((err) => {
              res.status(500).json({error: err})
            })
          } else {
            res.status(304).json({error: 'Not Modified'})
          }
        })
        .catch((err) => {
          res.status(500).json({error: err})
        })
      break

      default:
        res.status(500).send()
      break
    }
  })

  /* Alipay Return : return_url */
  app.get('/alipay/return', (req, res, next) => {
    console.log('alipay return: ', moment())
    console.log(req)
    //console.log(req.body)
    res.status(200).send()
  })

  /* Alipay Notify : notify_url */
  app.post('/alipay/notify', (req, res, next) => {
    console.log('alipay notify: ', moment())
    //console.log(req)
    //console.log(req.body)
    res.status(200).send()
  })

}