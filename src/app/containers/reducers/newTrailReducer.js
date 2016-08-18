'use strict'

import {AsyncStorage} from 'react-native'

import {Lang} from '../../settings'
import * as ACTIONS from '../constants/newTrailConstants'

const points = require('../../../points')

const initState = {
  isRecording: false,
  isCalculating: false,

  privacyStatus: 'private',
  isPublic: false,
  title: Lang.Unnamed,
  type: 0,
  areas: [],
  difficultyLevel: 2,
  description: '',
  points: points,
  photos: [],
  comments: []
},

newTrailReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_TRAIL:
      return Object.assign({}, initState, {
        creator: action.creator
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

    case ACTIONS.SAVE_TRAIL_POINTS:
      return Object.assign({}, state, {
        points: action.points
      })

    case ACTIONS.SET_TRAIL_TITLE:
      return Object.assign({}, state, {
        title: action.title
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
        privacyStatus: 'private'
      })

    case ACTIONS.SET_TO_PUBLIC:
      return Object.assign({}, state, {
        isPublic: true,
        privacyStatus: 'submitting'
      })

    case ACTIONS.SAVE_TRAIL:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.SAVE_TRAIL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        trail: action.trail
      })

    case ACTIONS.SAVE_TRAIL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })

    default:
      return state
  }
}

export default newTrailReducer