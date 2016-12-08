'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  request = require('request'),
  moment = require('moment'),
  CONST = require('../const'),
  UTIL = require('../util'),
  Log = require('./logging'),
  now = moment(),
  maxLevel = 4,
  minLevel = 0,
  userSchema = new Schema({
    modified: {
      type: Number,
      required: true,
      default: UTIL.getTimestamp()
    },
    role: {
      type: String,
      enum: CONST.Roles,
      required: true,
      default: CONST.Roles[0]
    },
    token: {
      type: String
    },
    expiredAt: {
      type: Number
    },
    lastLogin: {
      type: Number,
      required: true,
      default: now.valueOf()
    },
    wechat: {
      type: String,
      default: CONST.WeChatOpenId,
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
      default: 'User_' + Date.now().toString(),
      required: true,
      max: 60
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
      default: CONST.defaultUserAvatar,
      required: true
    },
    gender: {
      type: Number,
      match: CONST.genderRx,
      required: false
    },
    language: {
      type: String,
      minlength: 2,
      maxlength: 5
    },
    city: {
      type: String
    },
    country: {
      type: String,
      minlength: 2,
      maxlength: 2
    },
    verified: {
      on: {
        type: Number,
        default: UTIL.getTimestamp()
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
        let tmp = Math.floor(value)
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
      default: '',
      match: CONST.pidRx
    },
    emergencies: [{
      name: String,
      mobile: {
        type: Number,
        match: CONST.mobileRx
      }
    }],
    balance: {
      type: Number,
      default: 0,
      match: CONST.currentcyRx
    },
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
      ref: 'Order'
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

userSchema.methods.addOrder = function(id) {
  this.orders.push(id)
  this.save()
}

userSchema.methods.removeOrder = function(id) {
  this.orders.splice(this.orders.indexOf(id), 1)
  this.save()
}

userSchema.methods.addToList = function(key, id) {
  let list = (arguments[2]) ? this[arguments[2]][key] : this[key]
  UTIL.addToList(this, list, id)
}

userSchema.methods.removeFromList = function(key, id) {
  let list = (arguments[2]) ? this[arguments[2]][key] : this[key]
  UTIL.removeFromList(this, list, id)
}

userSchema.pre('save', function(next) {
  UTIL.updateModified(this, ['handle', 'avatar', 'gender', 'mobile'])
  this.wasNew = this.isNew

  this.token = UTIL.generateRandomString(24)
  this.expiredAt = moment().add(1, 'month').valueOf()

  if (this.avatar.substring(0, 4) === 'http') {
    let fileName = UTIL.generateRandomString(8)

    request({
      url: 'http://graphics:8000/avatar',
      method: 'POST',
      json: {
        id: this.id,
        filename: fileName,
        url: this.avatar
      }
    }, (error, response, body) => {
      this.avatar = fileName + '.jpg'
      next()
    })
  } else {
    next()
  }
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