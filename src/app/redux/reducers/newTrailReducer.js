'use strict'

import {AsyncStorage} from 'react-native'

import {AppSettings, Lang} from '../../settings'
import * as ACTIONS from '../constants/newTrailConstants'

const initState = {
  isRecording: false,
  isCalculating: false,
  isValidated: false,
  isUploading: false,

  status: 'submitting',
  isPublic: false,
  title: '',
  type: 0,
  areas: [],
  areasText: [],
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

    case ACTIONS.EDIT_TRAIL:
      return action.trail

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

    case ACTIONS.SET_TRAIL_TITLE:
      return Object.assign({}, state, {
        title: action.title
      })

    case ACTIONS.SET_TRAIL_AREAS:
      return Object.assign({}, state, {
        areas: action.areas,
        areasText: action.areasText
      })

    case ACTIONS.SET_TRAIL_TYPE:
      return Object.assign({}, state, {
        type: action.trailType
      })

    case ACTIONS.SET_TRAIL_DIFFICULTY:
      return Object.assign({}, state, {
        difficultyLevel: action.difficultyLevel
      })

    case ACTIONS.SET_TRAIL_PHOTOS:
      return Object.assign({}, state, {
        photos: action.photos
      })

    case ACTIONS.SET_TRAIL_DESCRIPTION:
      return Object.assign({}, state, {
        description: action.description
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

    case ACTIONS.VALIDATE_NEW_TRAIL:
      return (
        (state.title.length > AppSettings.minTrailTitleLength) && 
        (state.type > -1) && 
        (state.difficultyLevel > -1) && 
        (state.areas.length > 0)
      )

    case ACTIONS.SAVE_TRAIL:
      return Object.assign({}, state, {
        isUploading: true
      })

    case ACTIONS.SAVE_TRAIL_SUCCESS:
      return Object.assign({}, state, {
        isUploading: false,
        trail: action.trail
      })

    case ACTIONS.SAVE_TRAIL_FAILURE:
      return Object.assign({}, state, {
        isUploading: false,
        message: action.message
      })

    default:
      return state
  }
}

export default newTrailReducer