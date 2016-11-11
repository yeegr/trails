'use strict'

import * as ACTIONS from '../constants/trailsConstants'
import {
  AppSettings
} from '../../settings'

// list trails
const requestTrails = (params) => {
  return {
    type: ACTIONS.REQUEST_TRAILS,
    params
  }
}

const receiveTrails = (list) => {
  return {
    type: ACTIONS.LIST_TRAILS_SUCCESS,
    list
  }
}

const listTrailsError = (message) => {
  return {
    type: ACTIONS.LIST_TRAILS_FAILURE,
    message
  }
}

export const listTrails = (params) => {
  return (dispatch) => {
    dispatch(requestTrails(params))

    return fetch(AppSettings.apiUri + 'trails/' + params)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.error) {
          dispatch(listTrailsError(res.error))
          return Promise.reject(res)
        } else {
         dispatch(receiveTrails(res))
        }
      })
      .catch((err) => {
        dispatch(listTrailsError(err))
      })
  }
}


// get one trail
const requestTrail = (id) => {
  return {
    type: ACTIONS.REQUEST_TRAIL
  }
}

const receiveTrail = (trail) => {
  return {
    type: ACTIONS.GET_TRAIL_SUCCESS,
    trail
  }
}

const getTrailError = (message) => {
  return {
    type: ACTIONS.GET_TRAIL_SUCCESS,
    message
  }
}

export const getTrail = (id) => {
  return (dispatch) => {
    dispatch(requestTrail(id))

    return fetch(AppSettings.apiUri + 'trails/' + id)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(getTrailError(response.error))
          return Promise.reject(response)
        } else {
          dispatch(receiveTrail(response))
        }
      })
      .catch((err) => {
        dispatch(getTrailError(err))
      })
  }
}
