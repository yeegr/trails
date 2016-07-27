'use strict'

var mongoose = require('mongoose')
var settingsSchema = new mongoose.Schema({
  version: String,
  platform: String,
  baseUri: String,
  apiUri: String,
  assetUri: String,
  maxTopCaptainsPerArea: Number,
  maxTrailPreviewsPerArea: Number,
  maxPhotoPreviewsPerGallery: Number,
  maxCommentPreviewsPerTrail: Number,
  getValidationTimer: Number,
  validationCodeLength: Number,
  validationCodeType: String,

  colors: {
    primary: String,
    background: String,
    foreground: String,
    tagBackground: String,
    textOverlay: String,
    darkGray: String,
    midGray: String,
    lightGray: String,
    star: String,
    placeholderText: String,
    errorText: String,
    disabledButtonBackground: String,
    disabledButtonText: String
  },

  lang: {
    home: String
  }
}, {
  strict: false
})

module.exports = mongoose.model('Settings', settingsSchema)