'use strict'

import * as ACTIONS from '../constants/trailsConstants'
import {AppSettings} from '../../../common/__'

// list trails
const listTrailsRequest = () => {
  return {
    type: ACTIONS.LIST_TRAILS_REQUEST
  }
}

const listTrailsSuccess = (list) => {
  return {
    type: ACTIONS.LIST_TRAILS_SUCCESS,
    list
  }
}

const listTrailsFailure = (message) => {
  return {
    type: ACTIONS.LIST_TRAILS_FAILURE,
    message
  }
}

export const listTrails = (query) => {
  return (dispatch) => {
    dispatch(listTrailsRequest(query))

    return fetch(AppSettings.apiUri + 'trails/' + query)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.error) {
          dispatch(listTrailsFailure(res.error))
          return Promise.reject(res)
        } else {
         dispatch(listTrailsSuccess(res))
        }
      })
      .catch((err) => {
        dispatch(listTrailsFailure(err))
      })
  }
}

// get one trail
const getTrailRequest = () => {
  return {
    type: ACTIONS.GET_TRAIL_REQUEST
  }
}

const getTrailSuccess = (trail) => {
  return {
    type: ACTIONS.GET_TRAIL_SUCCESS,
    trail
  }
}

const getTrailFailure = (message) => {
  return {
    type: ACTIONS.GET_TRAIL_SUCCESS,
    message
  }
}

export const getTrail = (id) => {
  return (dispatch) => {
    dispatch(getTrailRequest())

    return fetch(AppSettings.apiUri + 'trails/' + id)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.error) {
          dispatch(getTrailFailure(res.error))
          return Promise.reject(res)
        } else {
          dispatch(getTrailSuccess(res))
        }
      })
      .catch((err) => {
        dispatch(getTrailFailure(err))
      })
  }
}

// reset trail
export const resetTrail = (trail) => {
  return {
    type: ACTIONS.RESET_TRAIL,
    trail
  }
}
