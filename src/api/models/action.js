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
  actionSchema = new Schema({
    creator: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    action: {
      type: String,
      enum: CONST.ACTIONS.USER,
      required: true
    },
    target: {
      type: String,
      enum: CONST.TARGETS.ACTION,
      required: true
    },
    ref: {
      type: Schema.ObjectId,
      required: true
    }
  })

actionSchema.post('save', function(doc) {
  Log(doc)

  var key = '',
    Target = null

  switch(doc.target) {
    case 'Area':
      key = 'areas',
      Target = Area
    break

    case 'Trail':
      key = 'trails',
      Target = Trail
    break

    case 'Event':
      key = 'events',
      Target = Event
    break

    case 'Post':
      key = 'posts',
      Target = Post
    break

    case 'User':
      key = 'followers',
      Target = User
    break
  }

  User.findById(doc.creator, function(err, user) {
    if (user) {
      switch(doc.action) {
        case 'FOLLOW':
          user.addToList(key, doc.ref, 'followings')
        break

        case 'UNFOLLOW':
          user.removeFromList(key, doc.ref, 'followings')
        break

        case 'APPLY':
          user.addToList('signups', {event: doc.ref})
        break

        case 'RETRACT':
          user.removeFromList('signups', {event: doc.ref})
        break

        case 'LIKE':
          user.addToList(key, doc.ref, 'likes')
        break

        case 'UNLIKE':
          user.removeFromList(key, doc.ref, 'likes')
        break

        case 'SAVE':
          user.addToList(key, doc.ref, 'saves')
        break

        case 'UNSAVE':
          user.removeFromList(key, doc.ref, 'saves')
        break

        case 'SHARE':
          user.addToList(key, doc.ref, 'shares')
        break
      }
    }
  })

  Target.findById(doc.ref, function(err, data) {
    if (data) {
      switch(doc.action) {
        case 'FOLLOW':
          data.addToList('followers', doc.creator)
        break

        case 'UNFOLLOW':
          data.removeFromList('followers', doc.creator)
        break

        case 'APPLY':
          data.addToList('signups', {user: doc.creator})
        break

        case 'RETRACT':
          data.removeFromList('signups', {user: doc.creator})
        break

        case 'LIKE':
          data.addToList('likes', doc.creator)
        break

        case 'UNLIKE':
          data.removeFromList('likes', doc.creator)
        break

        case 'SAVE':
          data.addToList('saves', doc.creator)
        break

        case 'UNSAVE':
          data.removeFromList('saves', doc.creator)
        break

        case 'SHARE':
          data.addToList('shares', doc.creator)
        break
      }
    }
  })
})

module.exports = mongoose.model('Action', actionSchema)