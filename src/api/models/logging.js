'use strict'

const Log = require('./log')

module.exports = function(obj) {
  let log = new Log(obj)
  log.save()
}