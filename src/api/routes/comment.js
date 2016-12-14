const mongoose = require('mongoose'),
  CONST = require('../const'),
  Area = require('../models/area'),
  Trail = require('../models/trail'),
  Event = require('../models/event'),
  Post = require('../models/post'),
  User = require('../models/user'),
  Comment = require('../models/comment')

mongoose.Promise = global.Promise

module.exports = (app) => {
  /* List */
  app.get('/comments', (req, res, next) => {
    let Target = null

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
        let tmp = {
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
    .catch((err) => {
      res.status(500).json({error: err})
    })
  })

  /* Create */
  app.post('/comments', (req, res, next) => {
    let tmp = new Comment(req.body)

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
        res.status(201).json(data)
      }
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  })

  /* Delete */
  app.delete('/comments/:id', (req, res, next) => {
    Comment
    .findById(req.params.id)
    .exec()
    .then((comment) => {
      if (comment) {
        comment
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