'use strict'

import {CONFIG} from '../../../util/constants'
import {AppSettings} from '../../settings'
import * as ACTIONS from '../constants/areasConstants'

// list areas
const requestAreas = (params) => {
  return {
    type: ACTIONS.REQUEST_AREAS,
    params
  }
}

const receiveAreas = (list) => {
  return {
    type: ACTIONS.LIST_AREAS_SUCCESS,
    list
  }
}

const listAreasError = (message) => {
  return {
    type: ACTIONS.LIST_AREAS_FAILURE,
    message
  }
}

export const listAreas = (params) => {
  return (dispatch) => {
    dispatch(requestAreas(params))

    return fetch(AppSettings.apiUri + 'areas/' + params)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(listAreasError(response.error))
          return Promise.reject(response)
        } else {
         dispatch(receiveAreas(response))
        }
      })
      .catch((err) => {
        dispatch(listAreasError(err))
      })
  }
}

// get one area
const requestArea = (id) => {
  return {
    type: ACTIONS.REQUEST_AREA
  }
}

const receiveArea = (area) => {
  return {
    type: ACTIONS.GET_AREA_SUCCESS,
    area
  }
}

const getAreaError = (message) => {
  return {
    type: ACTIONS.GET_AREA_SUCCESS,
    message
  }
}

export const getArea = (id) => {
  return (dispatch) => {
    dispatch(requestArea(id))

    return fetch(AppSettings.apiUri + 'areas/' + id)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(getAreaError(response.error))
          return Promise.reject(response)
        } else {
          dispatch(receiveArea(response))
        }
      })
      .catch((err) => {
        dispatch(getAreaError(err))
      })
  }
}