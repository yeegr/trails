'use strict'

import * as ACTIONS from '../constants/areasConstants'
import {AppSettings} from '../../settings'

// list areas
const listAreasRequest = () => {
  return {
    type: ACTIONS.LIST_AREAS_REQUEST
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
    dispatch(listAreasRequest())

    console.log(AppSettings.apiUri + 'areas')

    return fetch(AppSettings.apiUri + 'areas' + (params || ''))
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.error) {
          dispatch(listAreasFailure(res.error))
          return Promise.reject(res)
        } else {
         dispatch(listAreasSuccess(res))
        }
      })
      .catch((err) => {
        dispatch(listAreasFailure(err))
      })
  }
}

// reset home page area list
export const resetAreas = () => {
  listAreas(AppSettings.home.areas + AppSettings.currentCity)
}

// get one area
const getAreaRequest = () => {
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
    dispatch(getAreaRequest())

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