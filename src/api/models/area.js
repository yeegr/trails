'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  UTIL = require('../util'),
  Log = require('./logging'),
  Photo = require('./photo'),
  Point = require('./point'),
  areaSchema = new Schema({
    modified: {
      type: Number,
      required: true,
      default: UTIL.getTimestamp()
    },
    status: {
      type: String,
      enum: CONST.STATUSES.AREA,
      default: CONST.STATUSES.AREA[0],
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    approved: {
      on: {
        type: Number,
        default: UTIL.getTimestamp()
      },
      by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    city: {
      type: String,
      required: true
    },
    isDefault: {
      type: Boolean,
      default: false,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    hero: {
      type: String,
      required: false
    },
    description: {
      type: String
    },
    tags: [Number],
    map: [Point],
    leaders: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }],
    photos: [Photo],
    trails: [{
      type: Schema.Types.ObjectId,
      ref: 'Trail'
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    ratingTotal: {
      type: Number,
      default: 0
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    saves: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    shares: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    totalViews: {
      type: Number,
      default: 0
    }
  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  })

areaSchema.virtual('likeCount').get(function() {
  return this.likes.length
})

areaSchema.virtual('saveCount').get(function() {
  return this.saves.length
})

areaSchema.virtual('shareCount').get(function() {
  return this.shares.length
})

areaSchema.virtual('commentCount').get(function() {
  return this.comments.length
})

areaSchema.virtual('ratingAverage').get(function() {
  return UTIL.getAverageRating(this)
})

areaSchema.methods.addToList = function(type, id) {
  UTIL.addToList(this, this[type], id)
}

areaSchema.methods.removeFromList = function(type, id) {
  UTIL.removeFromList(this, this[type], id)
}

areaSchema.methods.addComment = function(id, rating) {
  UTIL.addComment(this, id, rating)
}

areaSchema.methods.removeComment = function(id, rating) {
  UTIL.removeComment(this, id, rating)
}

areaSchema.pre('save', function(next) {
  UTIL.updateModified(this, ['name', 'hero', 'description', 'tags', 'photos'])
  this.wasNew = this.isNew

  next()
})

areaSchema.post('save', function(doc) {
  Log({
    creator: doc.creator,
    action: (doc.isNew) ? 'CREATE' : 'UPDATE',
    target: 'Area',
    ref: doc._id
  })
})

areaSchema.post('remove', function(doc) {
  Log({
    creator: doc.creator,
    action: 'DELETE',
    target: 'Area',
    ref: doc._id
  })
})

module.exports = mongoose.model('Area', areaSchema)