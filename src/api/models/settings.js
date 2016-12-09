'use strict'

const mongoose = require('mongoose'),
  SettingsSchema = new mongoose.Schema({
    version: String,
    platform: String,
    baseUri: String,
    apiUri: String,
    assetUri: String,
    maxTopCaptainsPerArea: Number,
    maxTrailPreviewsPerArea: Number,
    maxPhotoPreviewsPerGallery: Number,
    maxCommentPreviewsPerTrail: Number,
    getVerificationTimer: Number,
    verificationCodeLength: Number,
    verificationCodeType: String,

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

module.exports = mongoose.model('Settings', SettingsSchema)