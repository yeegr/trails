'use strict'

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  Log = require('./logging'),
  Util = require('./util'),
  Agenda = require('./agenda'),
  Point = require('./point'),
  Photo = require('./photo'),
  User = require('./user'),
  eventSchema = new Schema({
    creator: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    modified: {
      type: Number,
      required: true,
      default: Util.getTimestamp()
    },
    privacyStatus: {
      type: String,
      enum: CONST.STATUSES.EVENT,
      default: CONST.STATUSES.EVENT[0],
      required: true
    },
    isPublic: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      min: 2
    },
    type: {
      type: Number,
      required: true
    },
    hero: {
      type: String
    },
    description: {
      type: String,
      required: false
    },
    excerpt: {
      type: String,
      required: false,
      max: 100
    },
    tags: [String],
    gatherTime: {
      type: Number,
      required: false
    },
    gatherLocation: {
      type: Point,
      required: false
    },
    contacts: [{
      title: {
        type: String
      },
      mobileNumber: {
        type: Number,
        match: /1\d{10}/
      },
      _id: false
    }],
    maxAttendee: Number,
    minAttendee: Number,
    schedule: [{
      type: Schema.Types.Mixed,
      default: []
    }],
    expenses: {
      deposit: {
        type: Number,
        default: 0
      },
      perHead: {
        type: Number,
        required: true
      },
      includeInsurance: {
        type: Boolean,
        required: true,
        default: false
      },
      detail: [String],
      include: [String],
      exclude: [String]
    },
    destination: String,
    gears: {
      images: [Number],
      tags: [String],
      notes: [String]
    },
    reminders: [String],
    photos: [Photo],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    ratingTotal: {
      type: Number,
      default: 0
    },
    viewCount: {
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
    signups: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      realName: {
        type: String,
        required: true
      },
      mobileNumber: {
        type: Number,
        required: true
      },
      personalId: {
        type: String,
        match: /1\d{10}/
      },
      gender: {
        type: Number,
        match: /0|1/
      },
      status: {
        type: String,
        enum: CONST.STATUSES.SIGNUP,
        default: CONST.STATUSES.SIGNUP[0]
      },
      _id: false
    }],
  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  })

eventSchema.virtual('likeCount').get(function() {
  return this.likes.length
})

eventSchema.virtual('saveCount').get(function() {
  return this.saves.length
})

eventSchema.virtual('shareCount').get(function() {
  return this.shares.length
})

eventSchema.virtual('commentCount').get(function() {
  return this.comments.length
})

eventSchema.virtual('ratingAverage').get(function() {
  return Util.getAverageRating(this)
})

eventSchema.methods.addToList = function(type, id) {
  Util.addToList(this, this[type], id)
}

eventSchema.methods.removeFromList = function(type, id) {
  Util.removeFromList(this, this[type], id)
}

eventSchema.methods.addComment = function(id, rating) {
  Util.addComment(this, id, rating)
}

eventSchema.methods.removeComment = function(id, rating) {
  Util.removeComment(this, id, rating)
}

eventSchema.pre('save', function(next) {
  Util.updateModified(this, ['title', 'content', 'excerpt', 'hero', 'tags'])
  this.wasNew = this.isNew

  next()
})

eventSchema.post('save', function(doc) {
  User.findById(doc.creator, function(err, user) {
    if (user) {
      user.addToList('events', doc.id)
    }
  })

  Log({
    creator: doc.creator,
    action: (doc.isNew) ? 'CREATE' : 'UPDATE',
    target: 'Event',
    ref: doc._id
  })
})

eventSchema.post('remove', function(doc) {
  User.findById(doc.creator, function(err, user) {
    if (user) {
      user.removeFromList('events', doc.id)
    }
  })

  Log({
    creator: doc.creator,
    action: 'DELETE',
    target: 'Event',
    ref: doc._id
  })
})

module.exports = mongoose.model('Event', eventSchema)