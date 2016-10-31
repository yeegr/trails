var mongoose = require('mongoose'),
  request = require('request'),
  moment = require('moment'),
  CONST = require('../const'),
  Validate = require('../models/validate')

mongoose.Promise = global.Promise

module.exports = function(app) {
  /* Create */
  app.post('/validate', function(req, res, next) {
    var tmp = new Validate(req.body),
      remoteAddress = req.connection.remoteAddress,
      ip = remoteAddress.substring(remoteAddress.lastIndexOf(':') + 1)

    tmp.code = CONST.generateRandomNumericString(4)

    request.post({url: 'http://graphics:8000/validate', json: tmp}, (err, response, body) => {
      if (err) {
        throw err
      }

      tmp.ip = ip

      tmp
      .save()
      .then(function(data) {
        res.status(201).json(data)
      })
      .catch(function(err) {
        res.status(500).send({error: err})
      })
    })
  })

  /* Update */
  app.put('/validate', function(req, res, next) {
    var query = req.body

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
          res.status(200).send()
        })
        .catch(function(err) {
          res.status(500).send({error: err})
        })
      } else {
        res.status(404).send()
      }
    })
    .catch(function(err) {
      res.status(500).send({error: err})
    })
  })

  /* List */
  app.get('/validate', function(req, res, next) {
    var query = {}

    if (req.query.hasOwnProperty('mobile') && req.query.mobile.length === 11) {
      query.mobile = req.query.mobile
    }

    Validate
    .find(query)
    .exec()
    .then(function(data) {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch(function(err) {
      res.status(500).send({error: err})
    })
  })
}