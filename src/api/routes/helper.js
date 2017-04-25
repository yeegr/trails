const mongoose = require('mongoose'),
  CONST = require('../const'),
  Event = require('../models/event'),
  Order = require('../models/order'),
  Trail = require('../models/trail'),
  Validate = require('../models/validate')

mongoose.Promise = global.Promise

module.exports = (app) => {
  function queryBuilder(req) {
    let query = {}

    if (req.query.hasOwnProperty('creator')) {
      query.creator = req.query.creator
    }

    if (req.query.hasOwnProperty('isPublic') && req.query.isPublic === 'true') {
      query.isPublic = true
      query.status = CONST.STATUSES.TRAIL[2]
    }

    if (req.query.hasOwnProperty('status') && req.query.status !== '') {
      query.status = req.query.status
    }

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

    return query
  }

  /* list only ids */
  app.get('/helper/list', (req, res, next) => {
    let query = queryBuilder(req),
      model = Trail

    switch (req.query.type) {
      case 'event':
        model = Event
      break

      case 'order':
        model = Order
      break

      default:
      break
    }

    model
    .find(query)
    .sort({_id: -1})
    .select('id date' + CONST.VIRTUAL_FIELDS)
    .exec()
    .then((data) => {
      if (data) {
        let result = []

        data.map((trail) => {
          result.push(trail._id)
        })

        res.status(200).json(result)
      } else {
        res.status(404).send()
      }
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  })

  /* Delete multiple trails */
  app.post('/helper/clear', (req, res, next) => {
    let results = [],
      model = Trail

    switch (req.query.type) {
      case 'event':
        model = Event
      break

      case 'order':
        model = Order
      break

      default:
      break
    }

    req.body.list.map((id) => {
      model
      .findByIdAndRemove(id, (err, data) => {
        data.remove()

        results.push({
          id: data._id,
          status: 410
        })
      })
    })

    res.status(200).json(results)
  })

  // list last validation coce
  app.get('/helper/login', (req, res, next) => {
    let query = req.query

    query.action = 'LOGIN'
    query.used = false

    Validate
    .findOne(query)
    .sort({_id: -1})
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          vcode: data.vcode
        })
      } else {
        res.status(404).send()
      }
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  })
}