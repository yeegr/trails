'use strict'

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  Log = require('./logging'),
  Util = require('./util'),
  User = require('./user'),
  Event = require('./event'),
  orderSchema = new Schema({
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    signUps: [{
      name: {
        type: String,
        required: true,
      },
      mobile: {
        type: Number,
        match: CONST.mobileRx,
        required: true
      },
      gender: {
        type: Number,
        match: CONST.genderRx,
        required: true
      },
      pid: {
        type: String,
        match: CONST.pidRx
      },
      level: {
        type: Number,
        match: CONST.levelRx
      }
    }],
    total: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: CONST.PAYMENT_MEDHODS,
      default: CONST.PAYMENT_MEDHODS[0],
      required: true
    }
  })

orderSchema.pre('save', function(next) {
  this.wasNew = this.isNew
  next()
})

orderSchema.post('save', function(doc) {
  User.findById(doc.creator, function(err, user) {
    if (user) {
      user.addToList('orders', doc.id)
    }
  })

  Event.findById(doc.ref, function(err, data) {
    if (data) {
      data.addSignUps(data.signUps)
    }
  })

  Log({
    creator: doc.creator,
    action: (doc.isNew) ? 'CREATE' : 'UPDATE',
    target: 'Order',
    ref: doc._id
  })
})

orderSchema.post('remove', function(doc) {
  User.findById(doc.creator, function(err, user) {
    if (user) {
      user.removeFromList('orders', doc.id)
    }
  })

  Event.findById(doc.ref, function(err, data) {
    if (data) {
      data.removeSignUps(data.signUps)
    }
  })

  Log({
    creator: this.creator,
    action: 'DELETE',
    target: 'Order',
    ref: this._id
  })
})

module.exports = mongoose.model('Order', orderSchema)
