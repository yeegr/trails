'use strict'

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  Log = require('./logging'),
  Util = require('./util'),
  Roles = ['normal', 'captain', 'staff', 'editor', 'admin', 'super'],
  maxLevel = 4,
  minLevel = 0,
  userSchema = new Schema({
    modified: {
      type: Number,
      required: true,
      default: Util.getTimestamp()
    },
    role: {
      type: String,
      enum: Roles,
      required: true,
      default: Roles[0]
    },
    token: {
      type: String
    },
    wechat: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
      match: CONST.mobileRx
    },
    handle: {
      type: String,
      required: true,
      max: 60
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
      required: true
    },
    gender: {
      type: Number,
      match: CONST.genderRx,
      required: false
    },
    verified: {
      on: {
        type: Number,
        default: Util.getTimestamp()
      },
      by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    xp: {
      type: Number,
      required: true,
      default: 0,
      set: function(value) {
        return Math.floor(value)
      }
    },
    level: {
      type: Number,
      required: true,
      default: minLevel,
      match: CONST.levelRx,
      set: function(value) {
        var tmp = Math.floor(value)
        if (tmp > maxLevel) tmp = maxLevel
        if (tmp < minLevel) tmp = minLevel
        return tmp
      },
      validate: function(value) {
        return (value > (minLevel - 1) && value < (maxLevel + 1))
      }
    },
    pid: {
      type: String,
      default: null,
      match: CONST.pidRx
    },
    emergencies: [{
      name: String,
      mobile: {
        type: Number,
        match: CONST.mobileRx
      }
    }],
    tags: {
      type: [String]
    },
    trails: [{
      type: Schema.Types.ObjectId,
      ref: 'Trail'
    }],
    events: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }],
    orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }],
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    likes: {
      areas: [{
        type: Schema.Types.ObjectId,
        ref: 'Area'
      }],
      trails: [{
        type: Schema.Types.ObjectId,
        ref: 'Trail'
      }],
      events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }],
      posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }],
    },
    saves: {
      areas: [{
        type: Schema.Types.ObjectId,
        ref: 'Area'
      }],
      trails: [{
        type: Schema.Types.ObjectId,
        ref: 'Trail'
      }],
      events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }],
      posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }],
    },
    shares: {
      areas: [{
        type: Schema.Types.ObjectId,
        ref: 'Area'
      }],
      trails: [{
        type: Schema.Types.ObjectId,
        ref: 'Trail'
      }],
      events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }],
      posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }],
    },
    followings: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    followers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    viewCount: {
      type: Number,
      default: 0,
      validate: function(value) {
        return (value > -1)
      }
    }
  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  })

userSchema.virtual('totalTrails').get(function() {
  return this.trails.length
})

userSchema.virtual('totalEvents').get(function() {
  return this.events.length
})

userSchema.virtual('totalPosts').get(function() {
  return this.posts.length
})

userSchema.virtual('totalComments').get(function() {
  return this.comments.length
})

userSchema.virtual('totalFollowers').get(function() {
  return this.followers.length
})

userSchema.methods.addToList = function(key, id) {
  var list = (arguments[2]) ? this[arguments[2]][key] : this[key]
  Util.addToList(this, list, id)
}

userSchema.methods.removeFromList = function(key, id) {
  var list = (arguments[2]) ? this[arguments[2]][key] : this[key]
  Util.removeFromList(this, list, id)
}

userSchema.pre('save', function(next) {
  Util.updateModified(this, ['handle', 'avatar', 'gender', 'mobile'])
  this.wasNew = this.isNew
  next()
})

userSchema.post('save', function(doc) {
  Log({
    creator: doc.creator,
    action: (doc.isNew) ? 'CREATE' : 'UPDATE',
    target: 'User',
    ref: doc._id
  })
})

userSchema.post('remove', function(doc) {
  Log({
    creator: doc.creator,
    action: 'DELETE',
    target: 'User',
    ref: doc._id
  })
})

module.exports = mongoose.model('User', userSchema)