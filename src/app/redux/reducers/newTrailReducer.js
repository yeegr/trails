'use strict'

import {AsyncStorage} from 'react-native'
import * as ACTIONS from '../constants/newTrailConstants'
import {
  CONSTANTS,
  AppSettings
} from '../../settings'

const initState = {
  isRecording: false,
  isCalculating: false,
  isUploading: false,
  isValidated: false,

  status: 'submitting',
  isPublic: false,
  title: '',
  type: 0,
  areas: [],
  difficultyLevel: 2,
  description: '',
  points: [],
  photos: [],
  comments: []
},

newTrailReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_TRAIL:
      return Object.assign({}, initState, {
        creator: action.creator,
        isValidated: false
      })

    case ACTIONS.STORE_PATH:
      AsyncStorage
      .setItem(
        CONSTANTS.ACTION_TARGETS.PATH,
        JSON.stringify({
          id: action.id,
          path: action.path
        })
      )
      return state

    case ACTIONS.START_RECORDING_TRAIL:
      return Object.assign({}, state, {
        isRecording: true
      })

    case ACTIONS.STOP_RECORDING_TRAIL:
      return Object.assign({}, state, {
        isRecording: false
      })

    case ACTIONS.SET_TRAIL_POINTS:
      return Object.assign({}, state, {
        points: action.points
      })

    case ACTIONS.START_CALCULATION:
      return Object.assign({}, state, {
        isCalculating: true
      })

    case ACTIONS.GET_TRAIL_DATA:
      return Object.assign({}, state, {
        isCalculating: false,
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

      return Object.assign({}, state, action.trail, {
        areas,
        photos,
        comments
      })

    case ACTIONS.SET_TO_PRIVATE:
      return Object.assign({}, state, {
        isPublic: false,
        status: 'private'
      })

    case ACTIONS.SET_TO_PUBLIC:
      return Object.assign({}, state, {
        isPublic: true,
        status: 'submitting'
      })

    case ACTIONS.SET_TRAIL_TITLE:
      return Object.assign({}, state, {
        title: action.title
      })

    case ACTIONS.SET_TRAIL_AREAS:
      return Object.assign({}, state, {
        areas: action.areas
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
        (state.title.length > AppSettings.minTrailTitleLength) && 
        (state.type > -1) && 
        (state.difficultyLevel > -1) && 
        (state.areas.length > 0)
      )

    case ACTIONS.SAVE_TRAIL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.SAVE_TRAIL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tmp: action.trail
      })

    case ACTIONS.SAVE_TRAIL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })

// update trail
    case ACTIONS.UPDATE_TRAIL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.UPDATE_TRAIL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tmp: action.trail
      })

    case ACTIONS.UPDATE_TRAIL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })

    default:
      return state
  }
}

export default newTrailReducer