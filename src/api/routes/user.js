var mongoose = require('mongoose'),
  CONST = require('../const'),
  User = require('../models/user'),
  formidable = require('formidable'),
  fs = require('fs'),
  path = require('path')

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
      res.status(500).send({error: err})
    })
  }

  /* Create */
  app.post('/users', function(req, res, next) {
    var tmp = new User(req.body)

    tmp
    .save()
    .then(function(data) {
      res.status(201).json(data)
    })
    .catch(function(err) {
      res.status(500).send({error: err})
    })
  })

  /* List */
  app.get('/users', function(req, res, next) {
    var query = {}

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
      res.status(500).send({error: err})
    })
  })

  /* Login */
  app.post('/login', function(req, res, next) {
    User
    .findOne(req.body)
    .exec()
    .then(function(data) {
      if (data) {
        data.token = data._id
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
  app.get('/users/:id', function(req, res, next) {
    getOneById(req.params.id, res, 200)
  })

  /* Update */
  app.put('/users/:id', function(req, res, next) {
    User
    .findById(req.params.id)
    .exec()
    .then(function(user) {
      if (user) {
        user
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
      }
    })
    .catch(function(err) {
      res.status(500).send({error: err})
    })
  })

  app.put('/users/:id/avatar', function(req, res, next) {
    User
    .findById(req.params.id)
    .exec()
    .then(function(user) {
      if (user) {
        var fileName = CONST.generateRandomString(8),
            form = new formidable.IncomingForm()

        form.parse(req, function(err, fields, files) {
          fs.rename(files.file.path, path.join('uploads/users/' + fileName + '.jpg'), (err) => {
            if (err) {
              throw err
            }

            user
            .set({
              avatar: fileName + '.jpg'
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
            res.status(200).send()
          }
        })
        .catch(function(err) {
          res.status(500).send({error: err})
        })
      }
    })
  })
}