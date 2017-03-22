'use strict'

import * as ACTIONS from '../constants/areasConstants'
import {AppSettings} from '../../../common/__'

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
export const resetAreaList = () => {
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
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.error) {
          dispatch(getAreaFailure(res.error))
          return Promise.reject(res)
        } else {
          dispatch(getAreaSuccess(res))
        }
      })
      .catch((err) => {
        dispatch(getAreaFailure(err))
      })
  }
}

export const clearArea = () => {
  return {
    type: ACTIONS.CLEAR_AREA
  }
}
