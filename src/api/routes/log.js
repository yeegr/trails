var mongoose = require('mongoose'),
  Log = require('../models/log')

mongoose.Promise = global.Promise

module.exports = function(app) {
  /* List */
  app.get('/logs', function(req, res, next) {
    Log
    .find()
    .sort({_id: -1})
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
}