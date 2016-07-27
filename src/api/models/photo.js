'use strict'

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  photoSchema = new Schema({
    url: {
      type: String,
      required: true
    },
    thumb: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: false,
    },
    _id: false
  })

module.exports = photoSchema
