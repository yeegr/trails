const mongoose = require('mongoose'),
  moment = require('moment'),
  fs = require('fs'),
  crypto = require('crypto'),
  CONST = require('../const'),
  UTIL = require('../util'),
  User = require('../models/user'),
  Order = require('../models/order'),
  privateKey = fs.readFileSync('./rsa_private_key.pem').toString()

mongoose.Promise = global.Promise

module.exports = function(app) {
  function getOneById(id, res, statusCode) {
    Order
    .findById(id)
    .populate('event')
    .exec()
    .then(function(data) {
      if (data) {
        res.status(statusCode).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  }

  /* Create */
  app.post('/orders', function(req, res, next) {
    let order = new Order(req.body)

    User
    .findById(order.creator)
    .exec()
    .then(function(user) {
      if (user) {
        return order.save()
      } else {
        res.status(404).send()
      }
    })
    .then(function(data) {
      if (data) {
        let tmp = JSON.parse(JSON.stringify(data))
        tmp.alipay = Alipay(data)
        res.status(201).json(tmp)
      }
    })
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  })

  /* Read */
  app.get('/orders/:id', function(req, res, next) {
    getOneById(req.params.id, res, 200)
  })

  /* List */
  app.get('/orders', function(req, res) {
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
    .then(function(data) {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  })

  /* Delete */
  app.delete('/orders/:id', function(req, res, next) {
    Order
    .findById(req.params.id)
    .exec()
    .then(function(order) {
      if (order) {
        order
        .remove()
        .then(function(data) {
          if (data) {
            res.status(200).send()
          }
        })
        .catch(function(err) {
          res.status(500).json({error: err})
        })
      } else {
        res.status(404).send()
      }
    })
  })

  /* Update */
  app.put('/orders/:id/:status', function(req, res, next) {
    Order
    .findById(req.params.id)
    .exec()
    .then(function(order) {
      if (order) {
        order
        .set({
          status: req.params.status
        })
        .save()
        .then(function(data) {
          res.status(200).json(data)
        })
        .catch(function(err) {
          res.status(500).json({error: err})
        })
      }
    })
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  })

  function Alipay(order) {
    let sign = crypto.createSign('RSA-SHA1'),
    bizContent = Object.assign({}, CONST.Alipay.bizContent, {
      body: order.body,
      subject: order.title,
      out_trade_no: order.id,
      total_amount: order.subTotal.toString(),
      passback_params: '',
      promo_params: '',
      extend_params: '',
    }),
    pubContent = Object.assign({}, CONST.Alipay.pubContent, {
      timestamp: moment(UTIL.getTimeFromId(order._id)).format('YYYY-MM-DD hh:mm:ss'),
      biz_content: JSON.stringify(bizContent)
    }),
    arr = [],
    str = ''

    for (let key in pubContent) {
      arr.push({
        key,
        value: pubContent[key]
      })
    }

    arr.sort((a, b) => {
      return (a.key > b.key)
    })

    for (let i = 0, j = arr.length; i < j; i++) {
      str += '&' + arr[i].key + '=' + arr[i].value
    }

    str = str.substring(1)

    sign.update(str)

    let signedStr = sign.sign(privateKey, 'base64')

    return str + '&sign=' + encodeURIComponent(signedStr)
  }

  /* Alipay Return : return_url */
  app.get('/alipay/return', function(req, res, next) {
    res.status(200).json(data)
  })

  /* Alipay Notify : notify_url */
  app.post('/alipay/notify', function(req, res, next) {
    console.log('notify')
    console.log(req.body)
    res.status(200).send()
  })

}