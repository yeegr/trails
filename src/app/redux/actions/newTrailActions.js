'use strict'

import * as ACTIONS from '../constants/newTrailConstants'
import * as loginActions from './loginActions'
import {
  CONSTANTS,
  FETCH,
  UTIL,
  AppSettings
} from '../../../common/__'

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

const _storeTrailSuccess = (data) => {
  loginActions.reloadUser()

  return {
    type: ACTIONS.STORE_TRAIL_SUCCESS,
    data
  }
}

export const storeTrailData = (data) => {
  return (dispatch, getState) => {
    let storageEngine = AppSettings.storageEngine,
      storageType = AppSettings.storageType,
      newTrail = Object.assign({}, getState().newTrail, data),
      userId = getState().login.user._id

    switch (storageType) {
      case CONSTANTS.STORAGE_TYPES.ASYNC:
        storageEngine
        .getItem(userId)
        .then((str) => {
          return (UTIL.isNullOrUndefined(str)) ? {} : JSON.parse(str)
        })
        .then((tmp) => {
          tmp[newTrail.storeKey] = newTrail

          storageEngine
          .setItem(userId, JSON.stringify(tmp))
          .then(() => {
            dispatch(_storeTrailSuccess(data))
          })
        })
      break
    }
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

export const setTrailAreas = (areas, areaNames) => {
  return {
    type: ACTIONS.SET_TRAIL_AREAS,
    areas,
    areaNames
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
      if (newTrail.hasOwnProperty('_id') && !UTIL.isNullOrUndefined(newTrail._id)) {
        dispatch(updateTrail(newTrail))
      } else {
        dispatch(createTrail(newTrail))
      }
    }
  }
}

const _validateTrail = (trail) => {
  return (
    (trail.title.length >= AppSettings.minTrailTitleLength) && 
    (trail.type > -1) && 
    (trail.difficultyLevel > -1) && 
    (trail.areas.length > 0)
  )
}

const createTrailRequest = () => {
  return {
    type: ACTIONS.CREATE_TRAIL_REQUEST
  }
}

const createTrailSuccess = (trail, storeKey) => {
  loginActions.reloadUser()

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
  let tmp = data.photos,
    storeKey = data.storeKey,
    input = Object.assign({}, data, {
      photos: []
    })

  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify(input)
  })

  return (dispatch) => {
    dispatch(createTrailRequest())

    return fetch(AppSettings.apiUri + 'trails', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res._id) {
          let photos = UTIL.comparePhotoArrays(res.photos, tmp)

          if (!photos) {
            dispatch(createTrailSuccess(res, storeKey))
          } else {
            dispatch(_uploadPhotos(CONSTANTS.ACTION_TARGETS.TRAIL, res._id, photos))
          }
        } else {
          dispatch(createTrailFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(createTrailFailure(err)))
  }
}

// update trail
const _updateTrailRequest = () => {
  return {
    type: ACTIONS.UPDATE_TRAIL_REQUEST
  }
}

const _updateTrailSuccess = (trail) => {
  loginActions.reloadUser()

  return {
    type: ACTIONS.UPDATE_TRAIL_SUCCESS,
    trail
  }
}

const _updateTrailFailure = (message) => {
  return {
    type: ACTIONS.UPDATE_TRAIL_FAILURE,
    message
  }
}

const _uploadPhotos = (type, id, photos) => {
  let formData = new FormData()
  formData.append('type', type)
  formData.append('id', id)
  formData.append('path', type + '/' + id + '/')

  photos.map((photo) => {
    formData.append(photo.key, photo)
  })

  let config = Object.assign({}, FETCH.UPLOAD, {
    body: formData
  })

  return (dispatch) => {
    dispatch(_updateTrailRequest())

    return fetch(AppSettings.apiUri + 'photos', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        dispatch(_updateTrailSuccess(res))
      })
      .catch((err) => dispatch(_updateTrailFailure(err)))
  }
}

export const updateTrail = (data) => {
  let tmp = data.photos,
    input = Object.assign({}, data, {
      photos: []
    }),
    config = Object.assign({}, FETCH.PUT, {
      body: JSON.stringify(input)
    })

  return (dispatch) => {
    dispatch(_updateTrailRequest())

    return fetch(AppSettings.apiUri + 'trails/' + data._id, config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res._id) {
          let photos = UTIL.comparePhotoArrays(res.photos, tmp)

          if (!photos) {
            dispatch(_updateTrailSuccess(res))
          } else {
            dispatch(_uploadPhotos(CONSTANTS.ACTION_TARGETS.TRAIL, res._id, photos))
          }
        } else {
          dispatch(_updateTrailFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(_updateTrailFailure(err)))
  }
}

// delete cloud trail
const deleteTrailRequest = (trail) => {
  return {
    type: ACTIONS.DELETE_TRAIL_REQUEST,
    trail
  }
}

const deleteTrailSuccess = () => {
  loginActions.reloadUser()

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
  let storageEngine = AppSettings.storageEngine,
    storageType = AppSettings.storageType,
    userId = (typeof(data.creator) === 'object') ? data.creator._id : data.creator

  return (dispatch) => {
    switch (storageType) {
      case CONSTANTS.STORAGE_TYPES.ASYNC:
        storageEngine
        .getItem(userId)
        .then((str) => {
          return (UTIL.isNullOrUndefined(str)) ? {} : JSON.parse(str)
        })
        .then((tmp) => {
          delete tmp[data.storeKey]

          storageEngine
          .setItem(userId, JSON.stringify(tmp))
          .then(() => {
            dispatch(deleteTrailSuccess())
          })
        })
      break
    }
  }
}
