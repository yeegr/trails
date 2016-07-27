var SemVerCompare = require('semver-compare'),
  Settings = require('../models/settings.js')

module.exports = function(app) {
  /* Create */
  app.post('/settings', function(req, res, next) {
    var tmp = new Settings(req.body)
    tmp
    .save()
    .then(function(data) {
      if (data) {
        res.status(201).json(data)
      }
    })
    .catch(function(err) {
      if (err) {
        res.status(500).send({error: err})
      }
    })
  })

  /* List */
  function list(req, res, next) {
    Settings
    .find()
    .then(function(data) {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch(function(err) {
      if (err) {
        res.status(500).send({error: err})
      }
    })
  }

  /* Latest */
  function latest(req, res, next) {
    Settings
    .findOne()
    .sort({_id: -1})
    .then(function(data) {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch(function(err) {
      if (err) {
        res.status(500).send({error: err})
      }
    })

    /*
    Settings.findOne({}, {}, {sort: {'_id' : -1}}, function(err, data) {
      if (err) {
        res.status(500).send({error: err})
      }

      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    */
  }

  /* Get */
  function get(req, res, next) {
    Settings
    .findById(req.params.query)
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

  /* Compare */
  app.get('/settings', function(req, res, next) {
    if (req.query.version) {
      Settings
      .findOne()
      .sort({_id: -1})
      .then(function(data) {
        if (SemVerCompare(req.query.version, data.version) < 0) {
          res.status(200).json(data)
        } else {
          res.status(204).send()
        }
      })
      .catch(function(err) {
        if (err) {
          res.status(500).send({error: err})
        }
      })
    }
  })

  /* Read */
  app.get('/settings/:param', function(req, res, next) {
    var param = req.params.param

    switch(param) {
      case 'all':
        list(req, res, next)
      break

      case 'latest':
        latest(req, res, next)
      break

      default:
        get(req, res, next)
      break
    }
  })

  /* Update */
  app.put('/settings/:id', function(req, res, next) {
    Settings
    .findById(req.params.id)
    .exec()
    .then(function(settings) {
      settings
      .set(req.body)
      .save()
      .then(function(data) {
        if (data) {
          res.status(200).json(data)
        }
      })
      .catch(function(err) {
        res.status(500).send({error: err})
      })
    })
  })

  /* Delete */
  app.delete('/settings/:id', function(req, res, next) {
    Settings
    .findById(req.params.id)
    .exec()
    .then(function(settings) {
      if (settings) {
        settings
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