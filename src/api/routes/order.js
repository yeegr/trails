var mongoose = require('mongoose'),
  CONST = require('../const'),
  User = require('../models/user'),
  Order = require('../models/order')

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
      res.status(500).send({error: err})
    })
  }

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

  /* List */
  app.get('/orders', function(req, res) {
    var query = {}

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