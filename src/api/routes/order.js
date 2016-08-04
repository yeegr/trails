var mongoose = require('mongoose'),
  CONST = require('../const'),
  User = require('../models/user'),
  Order = require('../models/order')

mongoose.Promise = global.Promise

module.exports = function(app) {
  /* Create */
  app.post('/orders', function(req, res, next) {
    var tmp = new Order(req.body)

    User
    .findById(tmp.creator)
    .exec()
    .then(function(user) {
      if (user) {
        return tmp.save()
      } else {
        res.status(404).send()
      }
    })
    .then(function(data) {
      if (data) {
        res.status(201).json(data)
      }
    })
    .catch(function(err) {
      res.status(500).send({error: err})
    })
  })

  /* Read */
  app.get('/orders/:id', function(req, res, next) {
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
      res.status(500).send({error: err})
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
          res.status(500).send({error: err})
        })
      } else {
        res.status(404).send()
      }
    })
  })
}