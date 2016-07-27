'use strict'

import {CONFIG} from '../../../constants'
import {AppSettings} from '../../settings'
import * as ACTIONS from '../constants/eventsConstants'

// list events
const requestEvents = (params) => {
  return {
    type: ACTIONS.REQUEST_EVENTS,
    params
  }
}

const receiveEvents = (list) => {
  return {
    type: ACTIONS.LIST_EVENTS_SUCCESS,
    list
  }
}

const listEventsError = (message) => {
  return {
    type: ACTIONS.LIST_EVENTS_FAILURE,
    message
  }
}

export const listEvents = (params) => {
  return (dispatch) => {
    dispatch(requestEvents(params))

    return fetch(AppSettings.apiUri + 'events/' + params)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(listEventsError(response.error))
          return Promise.reject(response)
        } else {
         dispatch(receiveEvents(response))
        }
      })
      .catch((err) => {
        dispatch(listEventsError(err))
      })
  }
}

// get one event
const requestEvent = (id) => {
  return {
    type: ACTIONS.REQUEST_EVENT
  }
}

const receiveEvent = (event) => {
  return {
    type: ACTIONS.GET_EVENT_SUCCESS,
    event
  }
}

const getEventError = (message) => {
  return {
    type: ACTIONS.GET_EVENT_SUCCESS,
    message
  }
}

export const getEvent = (id) => {
  return (dispatch) => {
    dispatch(requestEvent(id))

    return fetch(AppSettings.apiUri + 'events/' + id)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(getEventError(response.error))
          return Promise.reject(response)
        } else {
          dispatch(receiveEvent(response))
        }
      })
      .catch((err) => {
        dispatch(getEventError(err))
      })
  }
}
