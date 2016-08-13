var mongoose = require('mongoose'),
  CONST = require('../const'),
  User = require('../models/user'),
  Area = require('../models/area')

mongoose.Promise = global.Promise

module.exports = function(app) {
  function getOneById(id, res, statusCode) {
    Area
    .findById(id)
    .populate({
      path: 'leaders',
      options: {
        limit: 3
      }
    })
    .populate({
      path: 'trails',
      options: {
        limit: 3
      },
      populate: {
        path: 'creator'
      }
    })
    .populate({
      path: 'comments',
      modal: 'Comment',
      limit: 3,
      options: {
        sort: {'_id': -1}
      },
      populate: {
        path: 'creator',
        modal: 'User',
        select: CONST.USER_LIST_FIELDS
      }
    })
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
  app.post('/areas', function(req, res, next) {
    var tmp = new Area(req.body)

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
        getOneById(data._id, res, 201)
      }
    })
    .catch(function(err) {
      res.status(500).send({error: err})
    })
  })

  /* List */
  app.get('/areas', function(req, res, next) {
    var query = {}

    if (req.query.city) {
      query.city = req.query.city
    }

    Area
    .find(query)
    .limit(CONST.DEFAULT_PAGINATION)
    .populate({
      path: 'leaders',
      options: {
        limit: 3
      }
    })
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

  /* Read */
  app.get('/areas/:id', function(req, res, next) {
    getOneById(req.params.id, res, 200)
  })

  /* Update */
  app.put('/areas/:id', function(req, res, next) {
    Area
    .findById(req.params.id)
    .exec()
    .then(function(area) {
      area
      .set(req.body)
      .save()
      .then(function(data) {
        if (data) {
          getOneById(data._id, res, 200)
        }
      })
      .catch(function(err) {
        res.status(500).send({error: err})
      })
    })
  })

  /* Delete */
  app.delete('/areas/:id', function(req, res, next) {
    Area
    .findById(req.params.id)
    .exec()
    .then(function(area) {
      if (area) {
        area
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