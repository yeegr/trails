'use strict'

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  Log = require('./logging'),
  Util = require('./util'),
  User = require('./user'),
  Area = require('./area'),
  Trail = require('./trail'),
  Event = require('./event'),
  Post = require('./post'),
  commentSchema = new Schema({
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    target: {
      type: String,
      enum: CONST.TARGETS.COMMENT,
      required: true
    },
    ref: {
      type: Schema.Types.ObjectId,
      required: true
    },
    rating: {
      type: Number,
      required: false
    },
    content: {
      type: String,
      required: true
    }
  })

commentSchema.pre('save', function(next) {
  this.wasNew = this.isNew

  next()
})

commentSchema.post('save', function(doc) {
  User.findById(doc.creator, function(err, user) {
    if (user) {
      user.addToList('comments', doc.id)
    }
  })

  var Target = null

  switch(doc.target) {
    case 'Area':
      Target = Area
    break

    case 'Trail':
      Target = Trail
    break

    case 'Event':
      Target = Event
    break

    case 'Post':
      Target = Post
    break
  }

  Target.findById(doc.ref, function(err, data) {
    if (data) {
      data.addComment(doc.id, doc.rating)
    }
  })

  Log({
    creator: doc.creator,
    action: (doc.isNew) ? 'CREATE' : 'UPDATE',
    target: 'Comment',
    ref: doc._id
  })
})

commentSchema.post('remove', function(doc) {
  User.findById(doc.creator, function(err, user) {
    if (user) {
      user.removeFromList('comments', doc.id)
    }
  })

  var Target = null

  switch(doc.target) {
    case 'Area':
      Target = Area
    break

    case 'Trail':
      Target = Trail
    break

    case 'Event':
      Target = Event
    break

    case 'Post':
      Target = Post
    break
  }

  if (Target) {
    Target.findById(doc.ref, function(err, data) {
      if (data) {
        data.removeComment(doc.id, doc.rating)
      }
    })
  }

  Log({
    creator: this.creator,
    action: 'DELETE',
    target: 'Comment',
    ref: this._id
  })
})

module.exports = mongoose.model('Comment', commentSchema)