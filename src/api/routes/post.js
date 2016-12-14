const mongoose = require('mongoose'),
  CONST = require('../const'),
  User = require('../models/user'),
  Post = require('../models/post')

mongoose.Promise = global.Promise

module.exports = (app) => {
  function getOneById(id, res, statusCode) {
    Post
    .findById(id)
    .populate('creator', CONST.USER_LIST_FIELDS)
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
  app.post('/posts', (req, res, next) => {
    let tmp = new Post(req.body)

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
  app.get('/posts', (req, res, next) => {
    let query = {}

    if (req.query.hasOwnProperty('in') && req.query.in !== '') {
      let tmp = (req.query.in).substring(1, (req.query.in).length - 1)
      query._id = {}
      query._id.$in = tmp.split(',')
    }

    Post
    .find(query)
    .limit(CONST.DEFAULT_PAGINATION)
    .sort({_id: -1})
    .populate('creator', CONST.USER_LIST_FIELDS)
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
  app.get('/posts/:id', (req, res, next) => {
    getOneById(req.params.id, res, 200)
  })

  /* Update */
  app.put('/posts/:id', (req, res, next) => {
    Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      post
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
  app.delete('/posts/:id', (req, res, next) => {
    Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if (post) {
        post
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