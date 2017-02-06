const mongoose = require('mongoose'),
  request = require('request'),
  formidable = require('formidable'),
  fs = require('fs'),
  CONST = require('../const'),
  UTIL = require('../util'),
  User = require('../models/user'),
  Event = require('../models/event')

mongoose.Promise = global.Promise

module.exports = (app) => {
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
  app.post('/events', (req, res, next) => {
    let tmp = new Event(req.body)

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
  app.get('/events', (req, res, next) => {
    let query = {}

    if (req.query.hasOwnProperty('creator')) {
      query.creator = req.query.creator
    }

    if (req.query.hasOwnProperty('isPublic')) {
      query.isPublic = req.query.isPublic
    }

    if (req.query.hasOwnProperty('status')) {
      query.status = req.query.status
    }

    if (req.query.hasOwnProperty('status!')) {
      query.status = {
        $ne: req.query['status!']
      }
    }

    if (req.query.hasOwnProperty('city')) {
      query.city = req.query.city
    }

    if (req.query.hasOwnProperty('in') && req.query.in !== '') {
      let tmp = (req.query.in).substring(1, (req.query.in).length - 1)
      query._id = {}
      query._id.$in = tmp.split(',')
    }

    Event
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
  app.get('/events/:id', (req, res, next) => {
    getOneById(req.params.id, res, 200)
  })

  function saveEvent(event, info, res) {
    event
    .set(info)
    .save()
    .then((data) => {
      if (data) {
        getOneById(data._id, res, 200)
      }
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  }

  /* Update */
  app.put('/events/:id', (req, res, next) => {
    Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      saveEvent(event, req.body, res)
    })
  })

  app.put('/events/:id/hero', (req, res, next) => {
    Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if (event) {
        let fileName = UTIL.generateRandomString(8) + '.jpg',
          form = new formidable.IncomingForm()

        form.parse(req, (err, fields, files) => {
          let url = 'http://static:8000/up',
            formData = {
              file: {
                value: fs.createReadStream(files.file.path),
                options: {
                  filename: fileName
                }
              },
              path: 'events/' + req.params.id + '/'
            }

          request.post({url, formData}, (err, response, body) => {
            if (err) console.log(err)
            saveEvent(event, {hero: fileName}, res)
          })
        })
      }
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })
  })

  /* Delete */
  app.delete('/events/:id', (req, res, next) => {
    Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if (event) {
        event
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