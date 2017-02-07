'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Point = require('./point'),
  agendaSchema = new Schema({
    trail: {
      type: Schema.Types.ObjectId,
      ref: 'Trail'
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
    startPoi: Point,
    endPoi: Point,
    duration: Number,
    day: Number,
    _id: false
  })

module.exports = agendaSchema