const SemVerCompare = require('semver-compare'),
  Settings = require('../models/settings.js')

module.exports = (app) => {
  /* Create */
  app.post('/settings', (req, res, next) => {
    let tmp = new Settings(req.body)
    tmp
    .save()
    .then((data) => {
      if (data) {
        res.status(201).json(data)
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).json({error: err})
      }
    })
  })

  /* List */
  function list(req, res, next) {
    Settings
    .find()
    .then((data) => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).json({error: err})
      }
    })
  }

  /* Latest */
  function latest(req, res, next) {
    Settings
    .findOne()
    .sort({_id: -1})
    .then((data) => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).send()
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).json({error: err})
      }
    })

    /*
    Settings.findOne({}, {}, {sort: {'_id' : -1}}, function(err, data) {
      if (err) {
        res.status(500).json({error: err})
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

  /* Compare */
  app.get('/settings', (req, res, next) => {
    if (req.query.version) {
      Settings
      .findOne()
      .sort({_id: -1})
      .then((data) => {
        if (SemVerCompare(req.query.version, data.version) < 0) {
          res.status(200).json(data)
        } else {
          res.status(204).send()
        }
      })
      .catch((err) => {
        if (err) {
          res.status(500).json({error: err})
        }
      })
    }
  })

  /* Read */
  app.get('/settings/:param', (req, res, next) => {
    let param = req.params.param

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
  app.put('/settings/:id', (req, res, next) => {
    Settings
    .findById(req.params.id)
    .exec()
    .then((settings) => {
      settings
      .set(req.body)
      .save()
      .then((data) => {
        if (data) {
          res.status(200).json(data)
        }
      })
      .catch((err) => {
        res.status(500).json({error: err})
      })
    })
  })

  /* Delete */
  app.delete('/settings/:id', (req, res, next) => {
    Settings
    .findById(req.params.id)
    .exec()
    .then((settings) => {
      if (settings) {
        settings
        .remove()
        .then((data) => {
          if (data) {
            res.status(200).send()
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