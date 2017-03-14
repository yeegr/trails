'use strict'

import * as ACTIONS from '../constants/eventsConstants'
import {AppSettings} from '../../../common/__'

// list events
const listEventsRequest = () => {
  return {
    type: ACTIONS.LIST_EVENTS_REQUEST
  }
}

const listEventsSuccess = (list) => {
  return {
    type: ACTIONS.LIST_EVENTS_SUCCESS,
    list
  }
}

const listEventsFailure = (message) => {
  return {
    type: ACTIONS.LIST_EVENTS_FAILURE,
    message
  }
}

export const listEvents = (params) => {
  return (dispatch) => {
    dispatch(listEventsRequest())

    return fetch(AppSettings.apiUri + 'events/' + (params || ''))
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.error) {
          dispatch(listEventsFailure(res.error))
          return Promise.reject(res)
        } else {
         dispatch(listEventsSuccess(res))
        }
      })
      .catch((err) => {
        dispatch(listEventsFailure(err))
      })
  }
}

// reset home page event list
export const resetEvents = () => {
  listEvents(AppSettings.home.events + AppSettings.currentCity)
}

// get one event
const getEventRequest = () => {
  return {
    type: ACTIONS.GET_EVENT_REQUEST
  }
}

const getEventSuccess = (event) => {
  return {
    type: ACTIONS.GET_EVENT_SUCCESS,
    event
  }
}

const getEventFailure = (message) => {
  return {
    type: ACTIONS.GET_EVENT_FAILURE,
    message
  }
}

export const getEvent = (id) => {
  return (dispatch) => {
    dispatch(getEventRequest())

    return fetch(AppSettings.apiUri + 'events/' + id)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.error) {
          dispatch(getEventFailure(res.error))
          return Promise.reject(res)
        } else {
          dispatch(getEventSuccess(res))
        }
      })
      .catch((err) => {
        dispatch(getEventFailure(err))
      })
  }
}

export const clearEvent = () => {
  return {
    type: ACTIONS.CLEAR_EVENT
  }
}
