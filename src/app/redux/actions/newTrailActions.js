'use strict'

import * as ACTIONS from '../constants/newTrailConstants'
import {
  FETCH,
  UTIL,
  AppSettings
} from '../../settings'

export const createTrail = (creator) => {
  return {
    type: ACTIONS.CREATE_TRAIL,
    creator
  }
}

export const storePath = (id, path) => {
  return {
    type: ACTIONS.STORE_PATH,
    id,
    path
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

export const setTrailPoints = (points) => {
  return {
    type: ACTIONS.SET_TRAIL_POINTS,
    points
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
    } = UTIL.calculateTrailData(points)

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

export const calculateTrailData = (points) => {
  return (dispatch) => {
    dispatch(setTrailPoints(points))
    dispatch(_startCalculation())
    return dispatch(_getTrailData(points))
  }
}

const validateTrail = (trail) => {
  return (
    (trail.title.length > AppSettings.minTrailTitleLength) && 
    (trail.type > -1) && 
    (trail.difficultyLevel > -1) && 
    (trail.areas.length > 0)
  )
}


// edit trail
export const editTrail = (trail) => {
  return {
    type: ACTIONS.EDIT_TRAIL,
    trail
  }
}

export const setTrailPrivacy = (value) => {
  return {
    type: (value === false) ? ACTIONS.SET_TO_PRIVATE : ACTIONS.SET_TO_PUBLIC
  }
}

export const setTrailTitle = (title) => {
  return {
    type: ACTIONS.SET_TRAIL_TITLE,
    title
  }
}

export const setTrailAreas = (areas) => {
  return {
    type: ACTIONS.SET_TRAIL_AREAS,
    areas
  }
}

export const setTrailType = (trailType) => {
  return {
    type: ACTIONS.SET_TRAIL_TYPE,
    trailType
  }
}

export const setTrailDifficulty = (difficultyLevel) => {
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

// save trail
const saveTrailRequest = (trail) => {
  return {
    type: ACTIONS.SAVE_TRAIL_REQUEST,
    trail
  }
}

const saveTrailSuccess = (trail) => {
  return {
    type: ACTIONS.SAVE_TRAIL_SUCCESS,
    trail
  }
}

const saveTrailFailure = (message) => {
  return {
    type: ACTIONS.SAVE_TRAIL_FAILURE,
    message
  }
}

export const saveTrail = (data) => {
  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify(data)
  })

  return (dispatch) => {
    dispatch(saveTrailRequest(data))

    return fetch(AppSettings.apiUri + 'trails', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.id) {
          dispatch(saveTrailSuccess(res))
        } else {
          dispatch(saveTrailFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(saveTrailFailure(err)))
  }
}

// update trail
const updateTrailRequest = (trail) => {
  return {
    type: ACTIONS.UPDATE_TRAIL_REQUEST,
    trail
  }
}

const updateTrailSuccess = (trail) => {
  return {
    type: ACTIONS.UPDATE_TRAIL_SUCCESS,
    trail
  }
}

const updateTrailFailure = (message) => {
  return {
    type: ACTIONS.UPDATE_TRAIL_FAILURE,
    message
  }
}

export const updateTrail = (data) => {
  let config = Object.assign({}, FETCH.PUT, {
    body: JSON.stringify(data)
  })

  return (dispatch) => {
    dispatch(updateTrailRequest(data))

    return fetch(AppSettings.apiUri + 'trails', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.id) {
          dispatch(updateTrailSuccess(res))
        } else {
          dispatch(updateTrailFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(updateTrailFailure(err)))
  }
}
