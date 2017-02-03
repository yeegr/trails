'use strict'

import {AsyncStorage} from 'react-native'
import * as ACTIONS from '../constants/newTrailConstants'
import {
  CONSTANTS,
  UTIL,
  AppSettings
} from '../../settings'

const initTrail = {
  status: 'editing',
  isPublic: false,
  title: '',
  type: 0,
  areas: ['58512ea92019980015376e77'],
  areaNames: ['其他'],
  difficultyLevel: 2,
  description: '',
  points: [], //array of array [[],[],[],...]
  photos: [],
  comments: []
},
initStatus = {
  isRecording: false,
  isCalculating: false,
  isStored: false,
  isUploading: false,
  isSaved: false,
  isDeleted: false
},
initState = Object.assign({}, 
  initTrail, 
  initStatus
),

newTrailReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.NEW_TRAIL:
      return Object.assign({}, initState, {
        creator: action.creator,
        storeKey: UTIL.generateRandomString(16)
      })

    case ACTIONS.START_RECORDING_TRAIL:
      return Object.assign({}, state, {
        isRecording: true
      })

    case ACTIONS.STOP_RECORDING_TRAIL:
      return Object.assign({}, state, {
        isRecording: false
      })

    case ACTIONS.STORE_TRAIL_SUCCESS:
      return Object.assign({}, state, action.data, {
        isStored: true,
      })

    case ACTIONS.STORE_TRAIL_DATA:
      AsyncStorage
      .getItem(CONSTANTS.ACTION_TARGETS.TEMP)
      .then((tmp) => {
        return (UTIL.isNullOrUndefined(tmp)) ? {} : JSON.parse(tmp)
      })
      .then((tmp) => {
        tmp[state.storeKey] = state

        AsyncStorage
        .setItem(
          CONSTANTS.ACTION_TARGETS.TEMP,
          JSON.stringify(tmp)
        )
      })

      return state

    case ACTIONS.SET_TRAIL_DATA:
      return Object.assign({}, state, {
        isCalculating: false,
        points: action.points,
        date: action.date,
        totalDuration: action.totalDuration,
        totalDistance: action.totalDistance,
        totalElevation: action.totalElevation,
        maximumAltitude: action.maximumAltitude,
        averageSpeed: action.averageSpeed
      })

// edit trail
    case ACTIONS.EDIT_TRAIL:
      let areas = action.trail.areas.slice(0),
        photos = action.trail.photos.slice(0),
        comments = action.trail.comments.slice(0)

      return Object.assign({}, initState, action.trail, {
        areas,
        photos,
        comments,
      })

    case ACTIONS.SET_TO_PRIVATE:
      return Object.assign({}, state, {
        isPublic: false,
        status: 'private'
      })

    case ACTIONS.SET_TO_PUBLIC:
      return Object.assign({}, state, {
        isPublic: true,
        status: 'pending'
      })

    case ACTIONS.SET_TRAIL_TITLE:
      return Object.assign({}, state, {
        title: action.title
      })

    case ACTIONS.SET_TRAIL_AREAS:
      return Object.assign({}, state, {
        areas: action.areas,
        areaNames: action.areaNames
      })

    case ACTIONS.SET_TRAIL_TYPE:
      return Object.assign({}, state, {
        type: action.trailType
      })

    case ACTIONS.SET_TRAIL_DIFFICULTY:
      return Object.assign({}, state, {
        difficultyLevel: action.difficultyLevel
      })

    case ACTIONS.SET_TRAIL_DESCRIPTION:
      return Object.assign({}, state, {
        description: action.description
      })

    case ACTIONS.SET_TRAIL_PHOTOS:
      return Object.assign({}, state, {
        photos: action.photos
      })

// save trail
    case ACTIONS.VALIDATE_TRAIL:
      return (
        (state.title.length >= AppSettings.minTrailTitleLength) && 
        (state.type > -1) && 
        (state.difficultyLevel > -1) && 
        (state.areas.length > 0)
      )

    case ACTIONS.CREATE_TRAIL_REQUEST:
      return Object.assign({}, state, {
        isUploading: true
      })

    case ACTIONS.CREATE_TRAIL_SUCCESS:
      AsyncStorage
      .getItem(CONSTANTS.ACTION_TARGETS.TEMP)
      .then((tmp) => {
        return (UTIL.isNullOrUndefined(tmp)) ? {} : JSON.parse(tmp)
      })
      .then((tmp) => {
        delete tmp[action.storeKey]

        AsyncStorage
        .setItem(
          CONSTANTS.ACTION_TARGETS.TEMP,
          JSON.stringify(tmp)
        )
      })

      return Object.assign({}, state, {
        isUploading: false,
        isSaved: true
      })

    case ACTIONS.CREATE_TRAIL_FAILURE:
      return Object.assign({}, state, {
        isUploading: false,
        message: action.message
      })

// update trail
    case ACTIONS.UPDATE_TRAIL_REQUEST:
      return Object.assign({}, state, {
        isUploading: true
      })

    case ACTIONS.UPDATE_TRAIL_SUCCESS:
      return Object.assign({}, state, {
        isUploading: false,
        isSaved: true
      })

    case ACTIONS.UPDATE_TRAIL_FAILURE:
      return Object.assign({}, state, {
        isUploading: false,
        message: action.message
      })

// delete trail
    case ACTIONS.DELETE_TRAIL_REQUEST:
      return Object.assign({}, state, {
        isUploading: true
      })

    case ACTIONS.DELETE_TRAIL_SUCCESS:
      return Object.assign({}, initState, {
        isDeleted: true
      })

    case ACTIONS.DELETE_TRAIL_FAILURE:
      return Object.assign({}, state, {
        isUploading: false,
        message: action.message
      })

// delete local trail
    case ACTIONS.DELETE_LOCAL_TRAIL:
      AsyncStorage
      .getItem(CONSTANTS.ACTION_TARGETS.TEMP)
      .then((tmp) => {
        return (UTIL.isNullOrUndefined(tmp)) ? {} : JSON.parse(tmp)
      })
      .then((tmp) => {
        delete tmp[action.storeKey]

        AsyncStorage
        .setItem(
          CONSTANTS.ACTION_TARGETS.TEMP,
          JSON.stringify(tmp)
        )
      })

      return Object.assign({}, initState, {
        isDeleted: true
      })

    default:
      return state
  }
}

export default newTrailReducer