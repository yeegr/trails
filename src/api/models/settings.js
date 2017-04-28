'use strict'

const mongoose = require('mongoose'),
  SettingsSchema = new mongoose.Schema({
    version: String
  }, {
    strict: false
  })

module.exports = mongoose.model('Settings', SettingsSchema)