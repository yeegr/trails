'use strict'

var Log = require('./log')

module.exports = function(obj) {
  var log = new Log(obj)
  log.save()
}