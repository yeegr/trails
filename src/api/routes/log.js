const mongoose = require('mongoose'),
  Log = require('../models/log')

mongoose.Promise = global.Promise

module.exports = (app) => {
  /* List */
  app.get('/logs', (req, res, next) => {
    Log
    .find()
    .sort({_id: -1})
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
}