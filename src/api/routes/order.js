const mongoose = require('mongoose'),
  moment = require('moment'),
  fs = require('fs'),
  crypto = require('crypto'),
  md5 = require('md5'),
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
    let bizContent = Object.assign({}, CONST.Alipay[order.channel].bizContent, {
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
      pubContent = Object.assign({}, CONST.Alipay[order.channel].pubContent, {
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
      sellerCheck = (CONST.Alipay[order.channel].bizContent.seller_id === response.seller_id),
      appCheck = (CONST.Alipay[order.channel].pubContent.app_id === response.app_id)

    return idCheck && paymentCheck && sellerCheck && appCheck
  }
},
WeChatPay = {
  assemblePaymentString(order) {

    console.log('init')
    console.log(order)
    
    let orderContent = Object.assign({}, CONST.WeChatPay[order.channel].orderContent, {
        nonce_str: UTIL.generateRandomString(32),
        body: '识途驴-' + order.title + '-' + order.type,
        out_trade_no: order._id,
        total_fee: Math.floor(order.subTotal * 100),
        spbill_create_ip: order.ip
      }),
      detail = []

    console.log('pre detail')
    console.log(orderContent)

    order.signUps.map((signUp) => {
      let tmp = {
        goods_id: order.event,
        goods_name: order.title,
        quantity: 1,
        price: signUp.payment.cost * 100,
        body: signUp.name + ' | ' + signUp.mobile.toString()
      }

      detail.push(tmp)
    })

    orderContent.detail = JSON.stringify({
      goods_detail: detail
    })

    console.log('post detail')
    console.log(orderContent)

    let str = formatPaymentString(orderContent),
      tmp = Object.assign({}, orderContent, {
        sign: md5(str)
      })

    console.log('post sign')
    console.log(tmp)

    return tmp
  },

  pay(order) {
    return this.assemblePaymentString(order)
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
    let order = new Order(req.body),
      ip = UTIL.getUserIP(req)

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
        tmp.ip = ip

        switch (data.method) {
          case 'Alipay':
            tmp.Alipay = Alipay.pay(data)
          break

          case 'WeChatPay':
            tmp.WeChatPay = WeChatPay.pay(tmp)
          break
        }

        console.log('post assemble')
        console.log(tmp)

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
            let status = CONST.Alipay[order.channel].statuses[statusCode]

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