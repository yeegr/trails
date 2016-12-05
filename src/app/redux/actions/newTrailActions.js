'use strict'

import * as ACTIONS from '../constants/newTrailConstants'
import * as trailsActions from '../actions/trailsActions'
import {
  FETCH,
  UTIL,
  AppSettings
} from '../../settings'

export const newTrail = (creator) => {
  return {
    type: ACTIONS.NEW_TRAIL,
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

const _setTrailData = (points) => {
  const {
    date,
    totalDuration,
    totalDistance,
    totalElevation,
    maximumAltitude,
    averageSpeed
  } = UTIL.calculateTrailData(points)

  if (averageSpeed && averageSpeed > 0) {
    return {
      type: ACTIONS.SET_TRAIL_DATA,
      points, //array of array [[],[],[],...]
      date,
      totalDuration,
      totalDistance,
      totalElevation,
      maximumAltitude,
      averageSpeed
    }
  } else {
    _setTrailData(points)
  }
}

const _storeTrailData = () => {
  return {
    type: ACTIONS.STORE_TRAIL_DATA
  }
}

export const storeTrailData = (points) => {
  return (dispatch) => {
    dispatch(_setTrailData(points))

    setTimeout(() => {
      dispatch(_storeTrailData())
    }, 50)
  }
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
export const saveTrail = () => {
  return (dispatch, getState) => {
    const newTrail = getState().newTrail
    newTrail.creator = getState().login.user._id

    if (_validateTrail(newTrail)) {
      if (UTIL.isNullOrUndefined(newTrail._id)) {
        dispatch(createTrail(newTrail))
      } else {
        dispatch(updateTrail(newTrail))
      }
    }
  }
}

const _validateTrail = (trail) => {
  return (
    (trail.title.length > AppSettings.minTrailTitleLength) && 
    (trail.type > -1) && 
    (trail.difficultyLevel > -1) && 
    (trail.areas.length > 0)
  )
}

const createTrailRequest = (trail) => {
  return {
    type: ACTIONS.CREATE_TRAIL_REQUEST,
    trail
  }
}

const createTrailSuccess = (trail, storeKey) => {
  return {
    type: ACTIONS.CREATE_TRAIL_SUCCESS,
    trail,
    storeKey
  }
}

const createTrailFailure = (message) => {
  return {
    type: ACTIONS.CREATE_TRAIL_FAILURE,
    message
  }
}

export const createTrail = (data) => {
  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify(data)
  })

  return (dispatch) => {
    dispatch(createTrailRequest(data))

    return fetch(AppSettings.apiUri + 'trails', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.id) {
          dispatch(createTrailSuccess(res, data.storeKey))
        } else {
          dispatch(createTrailFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(createTrailFailure(err)))
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

    return fetch(AppSettings.apiUri + 'trails/' + data._id, config)
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

// delete trail
const deleteTrailRequest = (trail) => {
  return {
    type: ACTIONS.DELETE_TRAIL_REQUEST,
    trail
  }
}

const deleteTrailSuccess = () => {
  return {
    type: ACTIONS.DELETE_TRAIL_SUCCESS
  }
}

const deleteTrailFailure = (message) => {
  return {
    type: ACTIONS.DELETE_TRAIL_FAILURE,
    message
  }
}

export const deleteTrail = (data) => {
  let config = Object.assign({}, FETCH.DELETE)

  return (dispatch) => {
    dispatch(deleteTrailRequest(data))

    return fetch(AppSettings.apiUri + 'trails/' + data._id, config)
      .then((res) => {
        if (res.status === 410) {
          dispatch(deleteTrailSuccess())
        } else {
          dispatch(deleteTrailFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(deleteTrailFailure(err)))
  }
}

// delete local trail
export const deleteLocalTrail = (data) => {
  return {
    type: ACTIONS.DELETE_LOCAL_TRAIL,
    storeKey: data.storeKey
  }
}