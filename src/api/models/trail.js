'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CONST = require('../const'),
  UTIL = require('../util'),
  Log = require('./logging'),
  Photo = require('./photo'),
  User = require('./user'),
  Area = require('./area'),
  trailSchema = new Schema({
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    modified: {
      type: Number,
      required: true,
      default: UTIL.getTimestamp()
    },
    status: {
      type: String,
      enum: CONST.STATUSES.TRAIL,
      default: CONST.STATUSES.TRAIL[0],
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
    areas: [{
      type: Schema.Types.ObjectId,
      ref: 'Area'
    }],
    difficultyLevel: {
      type: Number, //1-5
      required: true,
      min: 1,
      max: 5
    },
    totalDistance: {
      type: Number  //km
    },
    totalDuration: {
      type: Number  //seconds
    },
    totalElevation: {
      type: Number  //metre
    },
    maximumAltitude: {
      type: Number  //metre
    },
    averageSpeed: {
      type: Number  //km/h
    },
    description: {
      type: String,
      trim: true
    },
    points: [Schema.Types.Mixed],
    photos: [Photo],
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

trailSchema.virtual('likeCount').get(function() {
  return this.likes.length
})

trailSchema.virtual('saveCount').get(function() {
  return this.saves.length
})

trailSchema.virtual('shareCount').get(function() {
  return this.shares.length
})

trailSchema.virtual('commentCount').get(function() {
  return this.comments.length
})

trailSchema.virtual('ratingAverage').get(function() {
  return UTIL.getAverageRating(this)
})

trailSchema.virtual('date').get(function() {
  return this.points[0][0]
})

trailSchema.methods.addToList = function(type, id) {
  UTIL.addToList(this, this[type], id)
}

trailSchema.methods.removeFromList = function(type, id) {
  UTIL.removeFromList(this, this[type], id)
}

trailSchema.methods.addComment = function(id, rating) {
  UTIL.addComment(this, id, rating)
}

trailSchema.methods.removeComment = function(id, rating) {
  UTIL.removeComment(this, id, rating)
}

trailSchema.pre('save', function(next) {
  UTIL.updateModified(this, ['title', 'type', 'description', 'difficultyLevel', 'photos'])
  this.wasNew = this.isNew

  const points = this.points

  let altitues = []
  this.points.map(function(p) {
    altitues.push(p[3])
  })

  if (!this.totalDistance) {
    this.totalDistance = Math.round(points[points.length - 1][5] * 10) / 10
  }

  if (!this.totalDuration) {
    this.totalDuration = (points[points.length - 1][0] - points[0][0])
  }

  if (!this.maximumAltitude) {
    this.maximumAltitude = Math.max(...altitues)
  }

  if (!this.totalElevation) {
    this.totalElevation = this.maximumAltitude - Math.min(...altitues)
  }

  if (!this.averageSpeed) {
    this.averageSpeed = Math.round((points[points.length - 1][5] / this.totalDuration) * 3600 * 100) / 100
  }

  next()
})

trailSchema.post('save', function(doc) {
  if (doc.wasNew) {
    User.findById(doc.creator, function(err, user) {
      if (user) {
        user.addToList('trails', doc.id)
      }
    })
  }

  doc.areas.map(function(id) {
    Area.findById(id, function(err, area) {
      if (area) {
        area.addToList('trails', doc.id)
      }
    })
  })

  Log({
    creator: doc.creator,
    action: (doc.isNew) ? 'CREATE' : 'UPDATE',
    target: 'Trail',
    ref: doc._id
  })
})

trailSchema.post('remove', function(doc) {
  User.findById(doc.creator, function(err, user) {
    if (user) {
      user.removeFromList('trails', doc.id)
    }
  })

  doc.areas.map(function(id) {
    Area.findById(id, function(err, area) {
      if (area) {
        area.removeFromList('trails', doc.id)
      }
    })
  })

  Log({
    creator: doc.creator,
    action: 'DELETE',
    target: 'Trail',
    ref: doc._id
  })
})

module.exports = mongoose.model('Trail', trailSchema)