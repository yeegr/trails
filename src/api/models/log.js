'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  logSchema = new Schema({
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    action: {
      type: String,
      enum: CONST.ACTIONS.USER.splice(0, 0, CONST.ACTIONS.COMMON),
      required: true
    },
    target: {
      type: String,
      enum: CONST.TARGETS.ACTION,
      required: true
    },
    ref: {
      type: Schema.Types.ObjectId,
      required: true
    }
  })

module.exports = mongoose.model('Log', logSchema)