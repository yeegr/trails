'use strict'

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  pointSchema = new Schema({
    lat: {
      type: Number,
      required: false
    },
    lng: {
      type: Number,
      required: false
    },
    alt: {
      type: Number,
      required: false,
      default: 0
    },
    zoom: {
      type: Number,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    _id: false
  })

module.exports = pointSchema
