var mongoose = require('mongoose'),
  CONST = require('../const'),
  Area = require('../models/area'),
  Trail = require('../models/trail'),
  Event = require('../models/event'),
  Post = require('../models/post'),
  User = require('../models/user'),
  Comment = require('../models/comment')

mongoose.Promise = global.Promise

module.exports = function(app) {
  /* List */
  app.get('/comments', function(req, res) {
    var Target = null

    switch (req.query.type) {
      case 'Area':
        Target = Area
      break

      case 'Trail':
        Target = Trail
      break

      case 'Event':
        Target = Event
      break

      case 'Post':
        Target = Post
      break
    }

    Target
    .findById(req.query.id)
    .select('title likes saves shares comments')
    .populate({
      path: 'comments',
      modal: 'Comment',
      populate: {
        path: 'creator',
        modal: 'User',
        select: CONST.USER_LIST_FIELDS
      }
    })
    .exec()
    .then(function(data) {
      if (data) {
        var tmp = {
          _id: data._id,
          title: data.title,
          comments: data.comments,
          commentCount: data.commentCount
        }

        res.status(200).json(tmp)
      } else {
        res.status(404).send()
      }
    })
    .catch(function(err) {
      res.status(500).send({error: err})
    })
  })

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