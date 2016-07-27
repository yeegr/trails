var mongoose = require('mongoose'),
  CONST = require('../const'),
  User = require('../models/user'),
  Comment = require('../models/comment')

mongoose.Promise = global.Promise

module.exports = function(app) {
  /* Create */
  app.post('/comments', function(req, res, next) {
    var tmp = new Comment(req.body)

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

  /* Delete */
  app.delete('/comments/:id', function(req, res, next) {
    Comment
    .findById(req.params.id)
    .exec()
    .then(function(comment) {
      if (comment) {
        comment
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