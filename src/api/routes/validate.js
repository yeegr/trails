const mongoose = require('mongoose'),
  request = require('request'),
  moment = require('moment'),
  UTIL = require('../util'),
  Validate = require('../models/validate')

mongoose.Promise = global.Promise

module.exports = function(app) {
  /* Save */
  function save(input, ip, res) {
    input.ip = ip

    input
    .save()
    .then(function(output) {
      res.status(201).send()
    })
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  }

  /* Create */
  app.post('/validate', function(req, res, next) {
    let tmp = new Validate(req.body),
      remoteAddress = req.connection.remoteAddress,
      ip = remoteAddress.substring(remoteAddress.lastIndexOf(':') + 1)

    tmp.vcode = UTIL.generateRandomNumericString(4)

    if (process.env.NODE_ENV === 'development') {
      save(tmp, ip, res)
    } else {
      request.post({url: 'http://graphics:8000/validate', json: tmp}, (err, response, body) => {
        if (err) throw err
        save(tmp, ip, res)
      })
    }
  })

  /* Update */
  app.put('/validate', function(req, res, next) {
    let query = req.body

    query.mobile = parseInt(query.mobile)
    query.expiredAt = {}
    query.expiredAt.$gte = moment()
    query.used = false

    Validate
    .findOne(query)
    .exec()
    .then(function(data) {
      if (data) {
        data
        .set({used: true})
        .save()
        .then(function(updated) {
          switch(updated.action) {
            case 'login':
              request.post({url: 'http://api:3000/login', json: {mobile: query.mobile}}, (err, response, body) => {
                res.status(response.statusCode).json(response.body)
              })
            break
            
            default:
              res.status(200).json({verified: true})
            break
          }
        })
        .catch(function(err) {
          res.status(500).json({error: err})
        })
      } else {
        res.status(404).json({
          error: 'ValidationCodeUnmatched'
        })
      }
    })
    .catch(function(err) {
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
  }

  app.get('/validate', function(req, res, next) {
    list(res, {})
  })

  app.get('/validate/:mobile', function(req, res, next) {
    let query = {}

    if (req.params.mobile && req.params.mobile.length === 11) {
      query.mobile = parseInt(req.params.mobile)
    }

    list(res, query)
  })
}