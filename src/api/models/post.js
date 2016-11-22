'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  UTIL = require('../util'),
  Log = require('./logging'),
  User = require('./user'),
  postSchema = new Schema({
    modified: {
      type: Number,
      required: true,
      default: UTIL.getTimestamp()
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      min: 2
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    hero: {
      type: String,
      required: false
    },
    excerpt: {
      type: String,
      required: false
    },
    status: {
      type: String,
      enum: CONST.STATUSES.POST,
      required: true,
      default: CONST.STATUSES.POST[0]
    },
    published: {
      type: Number,
      required: false
    },
    tags: [String],
    viewCount: {
      type: Number,
      default: 0
    },
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
    }]
  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  })

postSchema.virtual('likeCount').get(function() {
  return this.likes.length
})

postSchema.virtual('saveCount').get(function() {
  return this.saves.length
})

postSchema.virtual('shareCount').get(function() {
  return this.shares.length
})

postSchema.virtual('commentCount').get(function() {
  return this.comments.length
})

postSchema.virtual('ratingAverage').get(function() {
  return UTIL.getAverageRating(this)
})

postSchema.methods.addToList = function(type, id) {
  UTIL.addToList(this, this[type], id)
}

postSchema.methods.removeFromList = function(type, id) {
  UTIL.removeFromList(this, this[type], id)
}

postSchema.methods.addComment = function(id, rating) {
  UTIL.addComment(this, id, rating)
}

postSchema.methods.removeComment = function(id, rating) {
  UTIL.removeComment(this, id, rating)
}

postSchema.pre('save', function(next) {
  UTIL.updateModified(this, ['title', 'content', 'excerpt', 'hero', 'tags'])
  this.wasNew = this.isNew

  next()
})

postSchema.post('save', function(doc) {
  if (doc.isNew) {
    User.findById(doc.creator, function(err, user) {
      if (user) {
        user.addToList('posts', doc.id)
      }
    })
  }

  Log({
    creator: doc.creator,
    action: (doc.isNew) ? 'CREATE' : 'UPDATE',
    target: 'Post',
    ref: doc._id
  })
})

postSchema.post('remove', function(doc) {
  User.findById(doc.creator, function(err, user) {
    if (user) {
      user.removeFromList('posts', doc.id)
    }
  })

  Log({
    creator: doc.creator,
    action: 'DELETE',
    target: 'Post',
    ref: doc._id
  })
})

/*
postSchema.post('validate', function(doc) {
  console.log('%s has been validated!', doc._id)
})

postSchema.post('init', function(doc) {
  console.log('%s has been initialized!', doc._id)
})
*/

module.exports = mongoose.model('Post', postSchema)