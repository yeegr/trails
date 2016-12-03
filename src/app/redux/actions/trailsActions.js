'use strict'

import * as ACTIONS from '../constants/trailsConstants'
import {
  AppSettings
} from '../../settings'

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
const getTrailRequest = (id) => {
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
    dispatch(getTrailRequest(id))

    return fetch(AppSettings.apiUri + 'trails/' + id)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(getTrailFailure(response.error))
          return Promise.reject(response)
        } else {
          dispatch(getTrailSuccess(response))
        }
      })
      .catch((err) => {
        dispatch(getTrailFailure(err))
      })
  }
}
