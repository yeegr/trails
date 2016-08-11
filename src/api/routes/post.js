var mongoose = require('mongoose'),
  CONST = require('../const'),
  User = require('../models/user'),
  Post = require('../models/post')

mongoose.Promise = global.Promise

module.exports = function(app) {
  function getOneById(id, res, statusCode) {
    Post
    .findById(id)
    .populate('creator', CONST.USER_LIST_FIELDS)
    .populate('comments')
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
  app.post('/posts', function(req, res, next) {
    var tmp = new Post(req.body)

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
  app.get('/posts', function(req, res, next) {
    var query = {}

    Post
    .find(query)
    .limit(CONST.DEFAULT_PAGINATION)
    .sort({_id: -1})
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
      res.status(500).send({error: err})
    })
  })

  /* Read */
  app.get('/posts/:id', function(req, res, next) {
    getOneById(req.params.id, res, 200)
  })

  /* Update */
  app.put('/posts/:id', function(req, res, next) {
    Post
    .findById(req.params.id)
    .exec()
    .then(function(post) {
      post
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
  app.delete('/posts/:id', function(req, res, next) {
    Post
    .findById(req.params.id)
    .exec()
    .then(function(post) {
      if (post) {
        post
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