const mongoose = require('mongoose'),
  request = require('request'),
  moment = require('moment'),
  os = require('os'),
  CONST = require('../const'),
  UTIL = require('../util'),
  Validate = require('../models/validate')

mongoose.Promise = global.Promise

module.exports = (app) => {
  /* Save */
  function saveValidation(input, ip, res) {
    input.ip = ip

    input
    .save()
    .then((output) => {
      res.status(201).send()
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  }

  /* Create */
  app.post('/validate', (req, res, next) => {
    let tmp = new Validate(req.body),
      remoteAddress = req.connection.remoteAddress,
      ip = remoteAddress.substring(remoteAddress.lastIndexOf(':') + 1)

    tmp.vcode = (tmp.mobile === CONST.demo.mobile) ? CONST.demo.vcode : UTIL.generateRandomNumericString(4)

    if (process.env.NODE_ENV === 'development') {
      saveValidation(tmp, ip, res)
    } else {
      request.post({url: 'http://static:3000/validate', json: tmp}, (err, response, body) => {
        if (err) {
          res.status(500).json({error: err})
        } else {
          saveValidation(tmp, ip, res)
        }
      })
    }
  })

  /* Update */
  app.put('/validate', (req, res, next) => {
    let query = req.body,
      url = 'http://' + os.hostname() + ':3000/login'

    query.mobile = parseInt(query.mobile)
    query.expiredAt = {}
    query.expiredAt.$gte = moment()
    query.used = false

    Validate
    .findOne(query)
    .exec()
    .then((data) => {
      if (data) {
        data
        .set({used: true})
        .save()
        .then((updated) => {
          switch(updated.action) {
            case CONST.ACCOUNT_ACTIONS.LOGIN:
              request.post({url, json: {mobile: query.mobile}}, (err, response, body) => {
                res.status(response.statusCode).json(response.body)
              })
            break
            
            default:
              res.status(200).json({verified: true})
            break
          }
        })
        .catch((err) => {
          res.status(500).json({error: err})
        })
      } else {
        res.status(404).json({
          error: 'ValidationCodeUnmatched'
        })
      }
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  })

  /* List */
  function list(res, query) {
    Validate
    .find(query)
    .sort({_id: -1})
    .limit(5)
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
  }

  app.get('/validate', (req, res, next) => {
    list(res, {})
  })

  app.get('/validate/:mobile', (req, res, next) => {
    let query = {}

    if (req.params.mobile && req.params.mobile.length === 11) {
      query.mobile = parseInt(req.params.mobile)
    }

    list(res, query)
  })
}