'use strict'

import {AsyncStorage} from 'react-native'

import {
  CONFIG,
  ACCESS_TOKEN,
  USER
} from '../../../util/constants'

import {AppSettings} from '../../settings'
import * as ACTIONS from '../constants/newTrailConstants'
import {calculateTrailData} from '../../../util/common'

export const createTrail = (creator) => {
  return {
    type: ACTIONS.CREATE_TRAIL,
    creator
  }
}

export const startRecording = () => {
  return {
    type: ACTIONS.START_RECORDING_TRAIL
  }
}

export const stopRecording = () => {
  return {
    type: ACTIONS.STOP_RECORDING_TRAIL
  }
}

export const saveTrailPoints = (points) => {
  return {
    type: ACTIONS.SET_TRAIL_POINTS,
    points
  }
}

export const setTrailTitle = (title) => {
  return {
    type: ACTIONS.SET_TRAIL_TITLE,
    title
  }
}

export const setTrailAreas = (areas, areasText) => {
  return {
    type: ACTIONS.SET_TRAIL_AREAS,
    areas,
    areasText
  }
}

export const setTrailType = (trailType) => {
  return {
    type: ACTIONS.SET_TRAIL_TYPE,
    trailType
  }
}

export const setDifficultyLevel = (difficultyLevel) => {
  return {
    type: ACTIONS.SET_TRAIL_DIFFICULTY,
    difficultyLevel
  }
}

export const setTrailDescription = (description) => {
  return {
    type: ACTIONS.SET_TRAIL_DESCRIPTION,
    description
  }
}

export const setTrailPhotos = (photos) => {
  return {
    type: ACTIONS.SET_TRAIL_PHOTOS,
    photos
  }
}

const _startCalculation = () => {
  return {
    type: ACTIONS.START_CALCULATION
  }
}

const _getTrailData = (points) => {
  const {
      date,
      totalDuration,
      totalDistance,
      totalElevation,
      maximumAltitude,
      averageSpeed
    } = calculateTrailData(points)

  return {
    type: ACTIONS.GET_TRAIL_DATA,
    date,
    totalDuration,
    totalDistance,
    totalElevation,
    maximumAltitude,
    averageSpeed
  }
}

export const calculateData = (points) => {
  return (dispatch) => {
    dispatch(saveTrailPoints(points))
    dispatch(_startCalculation())
    return dispatch(_getTrailData(points))
  }
}

export const setTrailPrivacy = (value) => {
  return {
    type: (value === false) ? ACTIONS.SET_TO_PRIVATE : ACTIONS.SET_TO_PUBLIC
  }
}

const sendUploadRequest = (trail) => {
  return {
    type: ACTIONS.SAVE_TRAIL,
    trail
  }
}

const receiveUploadResponse = (trail) => {
  console.log(trail)
  return {
    type: ACTIONS.SAVE_TRAIL_SUCCESS,
    trail
  }
}

const uploadError = (message) => {
  return {
    type: ACTIONS.SAVE_TRAIL_FAILURE,
    message
  }
}

export const uploadTrail = (data) => {
  let config = Object.assign({}, CONFIG.POST, {
    body: JSON.stringify(data)
  })

  return (dispatch) => {
    console.log(dispatch)

    dispatch(sendUploadRequest(data))

    return fetch(AppSettings.apiUri + 'trails', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log('response')
        console.log(res)
        if (res.id) {
          dispatch(receiveUploadResponse(res))
        } else {
          dispatch(saveError(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(saveError(err)))
  }
}

const validateTrail = (state) => {
  console.log(state)
  return (
    (state.title.length > AppSettings.minTrailTitleLength) && 
    (state.type > -1) && 
    (state.difficultyLevel > -1) && 
    (state.areas.length > 0)
  )
}

export const saveTrail = () => {
  return (dispatch, getState) => {
    const newTrail = getState().newTrail

    console.log('validate: ' + validateTrail(newTrail))

    if (validateTrail(newTrail)) {
      dispatch(uploadTrail(newTrail))
    }
  }
}