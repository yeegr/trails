var mongoose = require('mongoose'),
  CONST = require('../const'),
  User = require('../models/user'),
  Event = require('../models/event'),
  request = require('request'),
  formidable = require('formidable'),
  fs = require('fs'),
  path = require('path')

mongoose.Promise = global.Promise

module.exports = function(app) {
  function getOneById(id, res, statusCode) {
    Event
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
  app.post('/events', function(req, res) {
    var tmp = new Event(req.body)

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
  app.get('/events', function(req, res) {
    var query = {}

    if (req.query.hasOwnProperty('isPublic')) {
      query.isPublic = req.query.isPublic
    }

    if (req.query.hasOwnProperty('status')) {
      query.status = req.query.status
    }

    if (req.query.hasOwnProperty('city')) {
      query.city = req.query.city
    }

    if (req.query.hasOwnProperty('in') && req.query.in !== '') {
      var tmp = (req.query.in).substring(1, (req.query.in).length - 1)
      query._id = {}
      query._id.$in = tmp.split(',')
    }

    Event
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
  app.get('/events/:id', function(req, res) {
    getOneById(req.params.id, res, 200)
  })

  /* Update */
  app.put('/events/:id', function(req, res, next) {
    Event
    .findById(req.params.id)
    .exec()
    .then(function(event) {
      event
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

  app.put('/events/:id/hero', function(req, res, next) {
    Event
    .findById(req.params.id)
    .exec()
    .then(function(event) {
      if (event) {
        var fileName = CONST.generateRandomString(8) + '.jpg',
          form = new formidable.IncomingForm()

        form.parse(req, function(err, fields, files) {
          var formData = {
            file: {
              value: fs.createReadStream(files.file.path),
              options: {
                filename: fileName
              }
            },
            path: 'events/' + req.params.id + '/'
          }

          request.post({url: 'http://graphics:8000/up', formData: formData}, (err, response, body) => {
            if (err) {
              throw err
            }

            event
            .set({
              hero: fileName
            })
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
      }
    })
    .catch(function(err) {
      res.status(500).send({error: err})
    })
  })

  /* Delete */
  app.delete('/events/:id', function(req, res, next) {
    Event
    .findById(req.params.id)
    .exec()
    .then(function(event) {
      if (event) {
        event
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