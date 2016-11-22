'use strict'

import * as ACTIONS from '../constants/areasConstants'
import {AppSettings} from '../../settings'

// list areas
const listAreasRequest = (params) => {
  return {
    type: ACTIONS.LIST_AREAS_REQUEST,
    params
  }
}

const listAreasSuccess = (list) => {
  return {
    type: ACTIONS.LIST_AREAS_SUCCESS,
    list
  }
}

const listAreasFailure = (message) => {
  return {
    type: ACTIONS.LIST_AREAS_FAILURE,
    message
  }
}

export const listAreas = (params) => {
  return (dispatch) => {
    dispatch(listAreasRequest(params))

    return fetch(AppSettings.apiUri + 'areas/' + params)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(listAreasFailure(response.error))
          return Promise.reject(response)
        } else {
         dispatch(listAreasSuccess(response))
        }
      })
      .catch((err) => {
        dispatch(listAreasFailure(err))
      })
  }
}

// get one area
const getAreaRequest = (id) => {
  return {
    type: ACTIONS.GET_AREA_REQUEST
  }
}

const getAreaSuccess = (area) => {
  return {
    type: ACTIONS.GET_AREA_SUCCESS,
    area
  }
}

const getAreaFailure = (message) => {
  return {
    type: ACTIONS.GET_AREA_SUCCESS,
    message
  }
}

export const getArea = (id) => {
  return (dispatch) => {
    dispatch(getAreaRequest(id))

    return fetch(AppSettings.apiUri + 'areas/' + id)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(getAreaFailure(response.error))
          return Promise.reject(response)
        } else {
          dispatch(getAreaSuccess(response))
        }
      })
      .catch((err) => {
        dispatch(getAreaFailure(err))
      })
  }
}