const mongoose = require('mongoose'),
  request = require('request'),
  formidable = require('formidable'),
  fs = require('fs'),
  moment = require('moment'),
  CONST = require('../const'),
  UTIL = require('../util'),
  User = require('../models/user'),
  Validate = require('../models/validate')

mongoose.Promise = global.Promise

module.exports = function(app) {
  function getOneById(id, res, statusCode) {
    User
    .findById(id)
    .exec()
    .then(function(data) {
      if (data) {
        res.status(statusCode).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  }

  function createUser(info, res) {
    let tmp = new User(info)

    tmp
    .save()
    .then(function(data) {
      res.status(201).json(data)
    })
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  }

  function updateUser(id, info, res) {
    console.log(id)
    console.log(info)
    User
    .findById(id)
    .exec()
    .then(function(user) {
      if (user) {
        user
        .set(info)
        .save()
        .then(function(data) {
          if (data) {
            getOneById(data._id, res, 200)
          }
        })
        .catch(function(err) {
          res.status(500).json({error: err})
        })
      }
    })
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  }

  /* Create */
  app.post('/users', function(req, res, next) {
    createUser(req.body, res)
  })

  /* List */
  app.get('/users', function(req, res, next) {
    let query = {}

    User
    .find(query)
    .limit(CONST.DEFAULT_PAGINATION)
    .exec()
    .then(function(data) {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  })

  /* Login */
  app.post('/login', function(req, res, next) {
    let body = req.body, 
      query = {}

    let hasMobile = UTIL.isNotUndefinedNullEmpty(body.mobile),  
      hasWeChat = UTIL.isNotUndefinedNullEmpty(body.wechat)

    if (hasMobile) {
      query.mobile = parseInt(body.mobile)
    }

    if (hasWeChat) {
      query.wechat = body.wechat
    }

    User
    .findOne(query)
    .exec()
    .then(function(data) {
      if (data) {
        res.status(200).json(data)
      } else if (hasMobile && hasWeChat) {
        User
        .findOne({mobile: query.mobile})
        .then(function(user) {
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
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  })

  /* Read */
  app.get('/users/:id', function(req, res, next) {
    getOneById(req.params.id, res, 200)
  })

  /* Update */
  app.put('/users/:id', function(req, res, next) {
    updateUser(req.params.id, req.body, res)
  })

  /* Update user avatar */
  app.put('/users/:id/avatar', function(req, res, next) {
    User
    .findById(req.params.id)
    .exec()
    .then(function(user) {
      if (user) {
        let fileName = UTIL.generateRandomString(8) + '.jpg',
        form = new formidable.IncomingForm()

        form.parse(req, function(err, fields, files) {
          let formData = {
            file: {
              value: fs.createReadStream(files.file.path),
              options: {
                filename: fileName
              }
            },
            path: 'users/' + user._id + '/'
          }

          request.post({url: 'http://graphics:8000/up', formData: formData}, (err, response, body) => {
            if (err) {
              throw err
            }

            user
            .set({
              avatar: fileName
            })
            .save()
            .then(function(data) {
              if (data) {
                getOneById(data._id, res, 200)
              }
            })
            .catch(function(err) {
              res.status(500).json({error: err})
            })
          })
        })
      }
    })
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  })


  app.put('/users/:id/mobile', function(req, res, next) {
    User
    .findById(req.params.id)
    .exec()
    .then(function(user) {
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
        .then(function(validation) {
          if (validation) {
            user
            .set({mobile: query.mobile})
            .save()
            .then(function(updated) {
              validation
              .set({used: true})
              .save()

              res.status(200).json(updated)
            })
            .catch(function(err) {
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
    .catch(function(err) {
      res.status(500).json({error: err})
    })
  })

  /* Delete */
  app.delete('/users/:id', function(req, res, next) {
    User
    .findById(req.params.id)
    .exec()
    .then(function(user) {
      if (user) {
        user
        .remove()
        .then(function(data) {
          if (data) {
            res.status(410).send()
          }
        })
        .catch(function(err) {
          res.status(500).json({error: err})
        })
      }
    })
  })
}