const mongoose = require('mongoose'),
  CONST = require('../const'),
  User = require('../models/user'),
  Area = require('../models/area')

mongoose.Promise = global.Promise

module.exports = (app) => {
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
        limit: 3,
        sort: ({'_id': -1})
      },
      populate: {
        path: 'creator'
      }
    })
    .populate({
      path: 'comments',
      modal: 'Comment',
      options: {
        limit: 3,
        sort: ({'_id': -1})
      },
      populate: {
        path: 'creator',
        modal: 'User',
        select: CONST.USER_LIST_FIELDS
      }
    })
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

  /* Create */
  app.post('/areas', (req, res, next) => {
    let tmp = new Area(req.body)

    User
    .findById(tmp.creator)
    .exec()
    .then((user) => {
      if (user) {
        return tmp.save()
      } else {
        res.status(404).send()
      }
    })
    .then((data) => {
      if (data) {
        getOneById(data._id, res, 201)
      }
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  })

  /* List */
  app.get('/areas', (req, res, next) => {
    let query = {},
      options = {}

    options.select = ''

    if (req.query.city) {
      query.city = req.query.city
    }

    if (req.query.type) {
      switch (req.query.type) {
        case 'compact':
          options.select = 'isDefault name hero' + CONST.VIRTUAL_FIELDS
        break
      }
    }

    Area
    .find(query)
    .select(options.select)
    .limit(CONST.DEFAULT_PAGINATION)
    .populate({
      path: 'leaders',
      modal: 'User',
      select: CONST.USER_LIST_FILEDS,
      options: {
        limit: 3
      }
    })
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

  /* Read */
  app.get('/areas/:id', (req, res, next) => {
    getOneById(req.params.id, res, 200)
  })

  /* Update */
  app.put('/areas/:id', (req, res, next) => {
    Area
    .findById(req.params.id)
    .exec()
    .then((area) => {
      area
      .set(req.body)
      .save()
      .then((data) => {
        if (data) {
          getOneById(data._id, res, 200)
        }
      })
      .catch((err) => {
        res.status(500).json({error: err})
      })
    })
  })

  /* Delete */
  app.delete('/areas/:id', (req, res, next) => {
    Area
    .findById(req.params.id)
    .exec()
    .then((area) => {
      if (area) {
        area
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
}