'use strict'

import * as ACTIONS from '../constants/eventsConstants'
import {
  AppSettings
} from '../../settings'

// list events
const listEventsRequest = (params) => {
  return {
    type: ACTIONS.LIST_EVENTS_REQUEST,
    params
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
    dispatch(listEventsRequest(params))

    return fetch(AppSettings.apiUri + 'events/' + params)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(listEventsFailure(response.error))
          return Promise.reject(response)
        } else {
         dispatch(listEventsSuccess(response))
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
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(getEventFailure(response.error))
          return Promise.reject(response)
        } else {
          dispatch(getEventSuccess(response))
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
