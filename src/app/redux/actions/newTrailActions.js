'use strict'

import * as ACTIONS from '../constants/newTrailConstants'
import * as userActions from './userActions'
import {
  CONSTANTS,
  FETCH,
  UTIL,
  AppSettings,
  Defaults
} from '../../../common/__'

// toggle track recorder
export const showRecorder = (paths) => {
  return {
    type: ACTIONS.SHOW_RECORDER,
    paths
  }
}

export const hideRecorder = () => {
  return {
    type: ACTIONS.HIDE_RECORDER
  }
}

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

const _storePathSuccess = (data, isFinal) => {
  return {
    type: ACTIONS.STORE_PATH_SUCCESS,
    data,
    isFinal
  }
}

export const storeTrailPath = (data, isFinal) => {
  let storageEngine = AppSettings.storageEngine,
    storageType = AppSettings.storageType,
    tmp = {}

  return (dispatch, getState) => {
    let user = getState().login.user,
      trail = _normalizeTrail(data, user),
      storeKey = getState().newTrail.storeKey

    trail.storeKey = storeKey
    tmp[storeKey] = trail

    switch (storageType) {
      case CONSTANTS.STORAGE_TYPES.ASYNC:
        storageEngine
        .mergeItem(CONSTANTS.STORAGE_KEYS.TRAILS, JSON.stringify(tmp))
        .then(() => {
          dispatch(_storePathSuccess(trail, isFinal))

          storageEngine
          .getItem(CONSTANTS.STORAGE_KEYS.TRAILS)
          .then((str) => JSON.parse(str))
          .then((obj) => UTIL.obj2arr(obj))
          .then((trails) => {
            dispatch(userActions.setLocalTrails(trails))
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

const _normalizeTrail = (trail, user) => {
  let tmp = {}

  tmp.isSynced = false
  tmp.creator = user._id
  tmp.storeKey = trail.storeKey
  tmp.modified = UTIL.getTimestamp()
  tmp.date = trail.points[0][0]
  tmp.points = trail.points
  tmp.status = trail.status || 'editing'
  tmp.isPublic = trail.isPublic || false
  tmp.title = trail.title || ''
  tmp.type = trail.type || 0
  tmp.areas = trail.areas || Defaults.Trail.areaIds
  tmp.difficultyLevel = trail.difficultyLevel || 2
  tmp.totalDistance = trail.totalDistance
  tmp.totalDuration = trail.totalDuration
  tmp.totalElevation = trail.totalElevation
  tmp.maximumAltitude = trail.maximumAltitude
  tmp.averageSpeed = trail.averageSpeed
  tmp.description = trail.description || ''
  tmp.photos = trail.photos || []

  if (!UTIL.isNullOrUndefined(trail._id)) {
    tmp._id = trail._id
  }

  return tmp
}

const syncTrail = (trail) => {
  return (dispatch) => {
    if (trail.hasOwnProperty('_id') && !UTIL.isNullOrUndefined(newTrail._id)) {
      dispatch(updateTrail(trail))
    } else {
      dispatch(createTrail(trail))
    }
  }
}

// save trail
export const saveTrail = () => {
  let storageEngine = AppSettings.storageEngine,
    storageType = AppSettings.storageType,
    tmp = {}

  return (dispatch, getState) => {
    const newTrail = getState().newTrail,
      trails = getState().login.trails

    if (newTrail.isDirty) {
      let trail = _normalizeTrail(newTrail, getState().login.user)

      tmp[trail.storeKey] = trail

      if (_validateTrail(trail)) {
        switch (storageType) {
          case CONSTANTS.STORAGE_TYPES.ASYNC:
            storageEngine
            .mergeItem(CONSTANTS.STORAGE_KEYS.TRAILS, JSON.stringify(tmp))
            .then(() => {
              trails.map((tmp, index) => {
                if (tmp.storeKey === trail.storeKey) {
                  trails.splice(index, 1, trail)
                }
              })

              dispatch(userActions.setLocalTrails(trails))
              dispatch(syncTrail(trail))
            })
          break
        }
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
  userActions.reloadUser()

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
  userActions.reloadUser()

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

// remove from local storage
const _removeTrailSuccess = () => {
  return {
    type: ACTIONS.DELETE_LOCAL_TRAIL
  }
}

// delete trail
export const deleteTrail = (trail) => {
  let storageEngine = AppSettings.storageEngine,
    storageType = AppSettings.storageType

  return (dispatch) => {
    switch (storageType) {
      case CONSTANTS.STORAGE_TYPES.ASYNC:
        storageEngine
        .getItem(CONSTANTS.STORAGE_KEYS.TRAILS)
        .then((str) => {
          return (UTIL.isNullOrUndefined(str)) ? [] : JSON.parse(str)
        })
        .then((tmp) => {
          delete tmp[trail.storeKey]

          storageEngine
          .setItem(CONSTANTS.STORAGE_KEYS.TRAILS, JSON.stringify(tmp))
          .then(() => {
            dispatch(_removeTrailSuccess())
            dispatch(userActions.setLocalTrails(UTIL.obj2arr(tmp)))

            if (!UTIL.isNullOrUndefined(trail._id)) {
              dispatch(_deleteCloudTrail(trail))
            }
          })
        })
      break
    }
  }
}

// delete cloud trail
const _deleteTrailRequest = (trail) => {
  console.log(trail)
  return {
    type: ACTIONS.DELETE_TRAIL_REQUEST,
    trail
  }
}

const _deleteTrailSuccess = () => {
  console.log('delete trail success')
  return {
    type: ACTIONS.DELETE_TRAIL_SUCCESS
  }
}

const _deleteTrailFailure = (message) => {
  console.log('delete trail failed')
  return {
    type: ACTIONS.DELETE_TRAIL_FAILURE,
    message
  }
}

const _deleteCloudTrail = (trail) => {
  let config = Object.assign({}, FETCH.DELETE)

  return (dispatch) => {
    dispatch(_deleteTrailRequest(trail))

    return fetch(AppSettings.apiUri + 'trails/' + trail._id, config)
      .then((res) => {
         if (res.status === 410) {
          dispatch(_deleteTrailSuccess(trail.storeKey))
         } else {
          dispatch(_deleteTrailFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(_deleteTrailFailure(err)))
  }

}

// reset trail
export const resetTrail = () => {
  return {
    type: ACTIONS.RESET_TRAIL
  }
}
