'use strict'

import * as ACTIONS from '../constants/eventsConstants'
import * as loginActions from './loginActions'
import {
  FETCH,
  AppSettings
} from '../../settings'

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
const requestEvent = () => {
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
    type: ACTIONS.GET_EVENT_FAILURE,
    message
  }
}

export const getEvent = (id) => {
  return (dispatch) => {
    dispatch(requestEvent())

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

export const clearEvent = () => {
  return {
    type: ACTIONS.CLEAR_EVENT
  }
}

// orders
export const resetOrder = () => {
  return {
    type: ACTIONS.RESET_ORDER
  }
}

// place order
const sendOrderRequest = () => {
  return {
    type: ACTIONS.PLACE_ORDER_REQUEST
  }
}

const receiveOrderResponse = (order) => {
  return {
    type: ACTIONS.PLACE_ORDER_SUCCESS,
    order
  }
}

const orderError = (message) => {
  return {
    type: ACTIONS.PLACE_ORDER_FAILURE,
    message
  }
}

export const placeOrder = (order) => {
  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify(order)
  })

  return (dispatch) => {
    dispatch(sendOrderRequest())

    return fetch(AppSettings.apiUri + 'orders', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res._id) {
          dispatch(receiveOrderResponse(res))
          dispatch(loginActions.getUpdatedUser(order.creator))
        } else {
          dispatch(orderError(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(orderError(err)))
  }
}

// update order
const sendOrderUpdateRequest = () => {
  return {
    type: ACTIONS.UPDATE_ORDER_REQUEST
  }
}

const receiveOrderUpdateResponse = (order) => {
  return {
    type: ACTIONS.UPDATE_ORDER_SUCCESS,
    order
  }
}

export const updateOrder = (order, status) => {
  let config = Object.assign({}, FETCH.PUT)

  return (dispatch) => {
    dispatch(sendOrderUpdateRequest())

    return fetch(AppSettings.apiUri + 'orders/' + order._id + '/' + status, config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res._id) {
          dispatch(receiveOrderUpdateResponse(res))
          //dispatch(loginActions.getUpdatedUser(order.creator))
        } else {
          dispatch(orderError(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(orderError(err)))
  }
}
