const mongoose = require('mongoose'),
  formidable = require('formidable'),
  fs = require('fs'),
  request = require('request'),
  moment = require('moment'),
  CONST = require('../const'),
  UTIL = require('../util'),
  User = require('../models/user'),
  Validate = require('../models/validate'),
  Log = require('../models/logging')

mongoose.Promise = global.Promise

module.exports = (app) => {
  function getOneById(id, res, statusCode) {
    User
    .findById(id)
    .exec()
    .then((data) => {
      if (data) {
        res.status(statusCode).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch((err) => {
      res.status(500).json({err})
    })
  }

  function getOneByToken(token, res, statusCode) {
    User
    .findOne({
      token
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
      res.status(500).json({err})
    })
  }

  function createUser(info, res) {
    let tmp = new User(info)

    tmp
    .save()
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      res.status(500).json({err})
    })
  }

  function updateUser(id, info, res) {
    User
    .findById(id)
    .exec()
    .then((user) => {
      if (user) {
        user
        .set(info)
        .save()
        .then((data) => {
          if (data) {
            getOneById(data._id, res, 200)
          }
        })
        .catch((err) => {
          res.status(500).json({err})
        })
      }
    })
    .catch((err) => {
      res.status(500).json({err})
    })
  }

  /* Create */
  app.post('/users', (req, res, next) => {
    createUser(req.body, res)
  })

  /* List */
  app.get('/users', (req, res, next) => {
    let query = {}

    if (req.query.hasOwnProperty('in') && req.query.in !== '') {
      let tmp = (req.query.in).substring(1, (req.query.in).length - 1)
      query._id = {}
      query._id.$in = tmp.split(',')
    }

    User
    .find(query)
    .limit(CONST.DEFAULT_PAGINATION)
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch((err) => {
      res.status(500).json({err})
    })
  })

  /* Login */
  app.post('/login', (req, res, next) => {
    let body = req.body,
      query = {},
      device = {}

    let hasMobile = UTIL.isNotUndefinedNullEmpty(body.mobile),
      hasWeChat = UTIL.isNotUndefinedNullEmpty(body.wechat)

    if (hasMobile) {
      query.mobile = parseInt(body.mobile)
    }

    if (hasWeChat) {
      query.wechat = body.wechat
    }

    if (body.hasOwnProperty('device')) {
      device = body.device
    }

    User
    .findOne(query)
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json(data)

        Log({
          creator: data._id,
          action: 'LOGIN',
          target: 'User',
          ref: data._id,
          device
        })
      } else if (hasMobile && hasWeChat) {
        User
        .findOne({
          mobile: query.mobile
        })
        .then((user) => {
          if (user) {
            delete body.mobile
            updateUser(user._id, body, res)
          } else {
            createUser(body, res)
          }
        })
      } else if (hasMobile) {
        createUser(body, res)
      } else {
        res.status(404).send()
      }
    })
    .catch((err) => {
      res.status(500).json({err})
    })
  })

  /* Read */
  app.get('/mine/:id', (req, res, next) => {
    getOneById(req.params.id, res, 200)
  })

  app.get('/users/:id', (req, res, next) => {
    User
    .findById(req.params.id)
    .populate({
      path: 'trails',
      model: 'Trail',
      match: {
        isPublic: {
          $eq: true
        },
        status: {
          $eq: 'approved'
        }
      },
      options: {
        sort: {'_id': -1}
      },
      select: '_id points' + CONST.VIRTUAL_FIELDS
    })
    .populate({
      path: 'events',
      model: 'Event',
      match: {
        isPublic: {
          $eq: true
        },
        status: {
          $eq: 'approved'
        }
      },
      options: {
        sort: {'_id': -1}
      },
      select: '_id ' + CONST.VIRTUAL_FIELDS
    })
    .populate({
      path: 'posts',
      model: 'Post',
      match: {
        status: {
          $eq: 'approved'
        }
      },
      options: {
        sort: {'_id': -1}
      },
      select: '_id ' + CONST.VIRTUAL_FIELDS
    })
    .exec()
    .then((data) => {
      if (data) {
        let trails = [],
          events = [],
          posts = []

        data.trails.map((trail) => {
          trails.push(trail._id)
        })

        data.events.map((event) => {
          events.push(event._id)
        })

        data.posts.map((post) => {
          posts.push(post._id)
        })

        data.trails = trails
        data.events = events
        data.posts = posts

        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch((error) => {
      res.status(500).json({error})
    })
  })

  app.get('/users/token/:token', (req, res, next) => {
    getOneByToken(req.params.token, res, 200)
  })

  /* Update */
  app.put('/users/:id', (req, res, next) => {
    updateUser(req.params.id, req.body, res)
  })

  /* Update user avatar */
  app.put('/users/:id/avatar', (req, res, next) => {
    User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (user) {
        let fileName = UTIL.generateRandomString(8) + '.jpg',
          form = new formidable.IncomingForm()

        form.parse(req, (err, fields, files) => {
          let formData = {
            file: {
              value: fs.createReadStream(files.file.path),
              options: {
                filename: fileName
              }
            },
            path: 'users/' + user._id + '/'
          }

          request.post({
            url: 'http://static:3000/up',
            formData
          }, (err, response, body) => {
            if (err) console.log(err)

            user
            .set({
              avatar: fileName
            })
            .save()
            .then((data) => {
              if (data) {
                getOneById(data._id, res, 200)
              }
            })
            .catch((err) => {
              res.status(500).json({err})
            })
          })
        })
      }
    })
    .catch((err) => {
      res.status(500).json({err})
    })
  })

  app.put('/users/:id/mobile', (req, res, next) => {
    User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (user) {
        let query = {}

        query.mobile = parseInt(req.body.mobile)
        query.vcode = req.body.vcode
        query.expiredAt = {}
        query.expiredAt.$gte = moment()
        query.used = false

        Validate
        .findOne(query)
        .exec()
        .then((validation) => {
          if (validation) {
            user
            .set({ mobile: query.mobile })
            .save()
            .then((updated) => {
              validation
                .set({ used: true })
                .save()

              res.status(200).json(updated)
            })
            .catch((err) => {
              res.status(500).json({
                error: err
              })
            })
          } else {
            res.status(401).json({
              error: 'ValidationCodeUnmatched'
            })
          }
        })
      } else {
        res.status(404).json({
          error: 'UserNotFound'
        })
      }
    })
    .catch((err) => {
      res.status(500).json({err})
    })
  })

  app.put('/users/:id/follow', (req, res, next) => {
    User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (user) {
        let followings = user.followings

        User
        .findById(req.body.following)
        .exec()
        .then((following) => {
          if (following) {
            if (followings.indexOf(following._id) > -1) {
              followings.splice(followings.indexOf(following._id), 1)
            } else {
              followings.push(following._id)
            }

            user
            .set({followings})
            .save()
            .then((updated) => {
              res.status(200).json(updated)
            })
            .catch((err) => {
              res.status(500).json({err})
            })

            following
            .set
          }
        })
      } else {
        res.status(404).json({
          err: CONST.ERRORS.USER_NOT_FOUND
        })
      }
    })
    .catch((err) => {
      res.status(500).json({err})
    })
  })

  /* Delete */
  app.delete('/users/:id', (req, res, next) => {
    User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (user) {
        user
        .remove()
        .then((data) => {
          if (data) {
            res.status(410).send()
          }
        })
        .catch((err) => {
          res.status(500).json({err})
        })
      }
    })
  })
}