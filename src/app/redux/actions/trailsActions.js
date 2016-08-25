'use strict'

import {CONFIG} from '../../../util/constants'
import {AppSettings} from '../../settings'
import * as ACTIONS from '../constants/trailsConstants'

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
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(listTrailsError(response.error))
          return Promise.reject(response)
        } else {
         dispatch(receiveTrails(response))
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
