const mongoose = require('mongoose'),
  CONST = require('../const'),
  User = require('../models/user'),
  Trail = require('../models/trail')

mongoose.Promise = global.Promise

module.exports = function(app) {
  function getOneById(id, res, statusCode) {
    Trail
    .findById(id)
    .populate({
      path: 'creator',
      modal: 'User',
      select: CONST.USER_LIST_FIELDS
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
      res.status(500).json({error: err})
    })
  }

  /* Create */
  app.post('/trails', function(req, res, next) {
    var tmp = new Trail(req.body)

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
      res.status(500).json({error: err})
    })
  })

  /* List */
  app.get('/trails', function(req, res, next) {
    let query = {}

    if (req.query.hasOwnProperty('area') && req.query.area !== '') {
      query.areas = {}
      query.areas.$in = [req.query.area]
    }

    if (req.query.hasOwnProperty('in') && req.query.in !== '') {
      let tmp = (req.query.in).substring(1, (req.query.in).length - 1)
      query._id = {}
      query._id.$in = tmp.split(',')
    }

    if (req.query.hasOwnProperty('keywords') && req.query.keywords !== '') {
      let keywords = new RegExp(req.query.keywords.trim().replace(' ', '|'))
      query.$or = []
      query.$or.push({'title': keywords})
      query.$or.push({'description': keywords})
    }

    if (req.query.hasOwnProperty('types') && req.query.types !== '') {
      query.type = {}
      query.type.$in = req.query.types.split(',')
    }

    if (req.query.hasOwnProperty('minDifficulty') || req.query.hasOwnProperty('maxDifficulty')) {
      query.difficultyLevel = {}

      if (req.query.hasOwnProperty('minDifficulty')) {
        query.difficultyLevel.$gte = parseInt(req.query.minDifficulty)
      }

      if (req.query.hasOwnProperty('maxDifficulty')) {
        query.difficultyLevel.$lte = parseInt(req.query.maxDifficulty)
      }
    }

    if (req.query.hasOwnProperty('minDistance') || req.query.hasOwnProperty('maxDistance')) {
      query.totalDistance = {}

      if (req.query.hasOwnProperty('minDistance')) {
        query.totalDistance.$gte = parseInt(req.query.minDistance)
      }

      if (req.query.hasOwnProperty('maxDistance')) {
        query.totalDistance.$lte = parseInt(req.query.maxDistance)
      }
    }

    /*
    if (req.query.hasOwnProperty('minRating') || req.query.hasOwnProperty('maxRating')) {
      query.averageRating = {}

      if (req.query.hasOwnProperty('minRating')) {
        query.averageRating.$gte = parseInt(req.query.minRating)
      }

      if (req.query.hasOwnProperty('maxRating')) {
        query.averageRating.$lte = parseInt(req.query.maxRating)
      }
    }
    */

    Trail
    .find(query)
    .limit(CONST.DEFAULT_PAGINATION)
    .populate('creator', CONST.USER_LIST_FIELDS)
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

  /* Read */
  app.get('/trails/:id', function(req, res, next) {
    getOneById(req.params.id, res, 200)
  })

  /* Update */
  app.put('/trails/:id', function(req, res, next) {
    Trail
    .findById(req.params.id)
    .exec()
    .then(function(trail) {
      trail
      .set(req.body)
      .save()
      .then(function(data) {
        if (data) {
          getOneById(data._id, res, 200)
        }
      })
      .catch(function(err) {
        res.status(500).json({error: err})
      })
    })
  })

  /* Delete */
  app.delete('/trails/:id', function(req, res, next) {
    Trail
    .findById(req.params.id)
    .exec()
    .then(function(trail) {
      if (trail) {
        trail
        .remove()
        .then(function(data) {
          if (data) {
            res.status(410).send()
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
}