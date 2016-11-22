'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  UTIL = require('../util'),
  Log = require('./logging'),
  Agenda = require('./agenda'),
  Point = require('./point'),
  Trail = require('./trail'),
  agendaSchema = new Schema({
    trail: {
      type: Schema.Types.ObjectId,
      ref: 'Trail'
    },
    type: {
      type: Number,
      required: true
    },
    startTime: {
      type: Number,
      min: 0,
      max: 1439
    },
    endTime: {
      type: Number,
      min: 0,
      max: 1439
    },
    startPoi: {
      type: Point,
      required: true
    },
    endPoi: Point,
    duration: Number,
    difficultyLevel: Number
  })

module.exports = agendaSchema