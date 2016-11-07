'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  Log = require('./logging'),
  Util = require('./util'),
  Moment = require('moment'),
  validateSchema = new Schema({
    action: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
      required: true,
      match: CONST.mobileRx
    },
    vcode: {
      type: String,
      required: true,
      trim: true,
      match: CONST.validatorRx
    },
    ip: {
      type: String,
      required: true,
      trim: true,
      match: CONST.ipRx
    },
    expiredAt: {
      type: Date,
      required: true
    },
    used: {
      type: Boolean,
      required: true,
      default: false
    }
  }, {
    timestamps: true
  })

validateSchema.pre('validate', function(next) {
  if (this.isNew) {
    this.expiredAt = Moment().add(5, 'minutes').toDate()
  }

  next()
})

module.exports = mongoose.model('Validate', validateSchema)