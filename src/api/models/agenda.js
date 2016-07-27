'use strict'

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  Log = require('./logging'),
  Util = require('./util'),
  Agenda = require('./agenda'),
  Point = require('./point'),
  agendaSchema = new Schema({
    type: {
      type: Number,
      required: true
    },
    start: {
      type: Number,
      min: 0,
      max: 1439
    },
    end: {
      type: Number,
      min: 0,
      max: 1439
    },
    from: {
      type: Point,
      required: true
    },
    to: Point,
    duration: {
      type: Number
    }
  })

module.exports = agendaSchema