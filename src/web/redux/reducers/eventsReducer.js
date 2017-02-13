'use strict'

import * as ACTIONS from '../constants/eventsConstants'

const eventsReducer = (state = {
  isFetching: false,
  isPaying: false,
  list: [],
  event: null,
  message: null,
  order: null
}, action) => {
  switch (action.type) {
    case ACTIONS.LIST_EVENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.LIST_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        list: action.list
      })

    case ACTIONS.LIST_EVENTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        list: [],
      })

    case ACTIONS.GET_EVENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.GET_EVENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        event: action.event
      })

    case ACTIONS.GET_EVENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        event: null
      })

    case ACTIONS.CLEAR_EVENT:
      return Object.assign({}, state, {
        event: null
      })

    case ACTIONS.RESET_ORDER:
      return Object.assign({}, state, {
        order: null
      })

    case ACTIONS.PLACE_ORDER_REQUEST:
      return Object.assign({}, state, {
        isPaying: true
      })

    case ACTIONS.PLACE_ORDER_SUCCESS:
      return Object.assign({}, state, {
        order: action.order
      })

    case ACTIONS.PLACE_ORDER_FAILURE:
      return Object.assign({}, state, {
        message: action.message
      })

    case ACTIONS.UPDATE_ORDER_REQUEST:
      return Object.assign({}, state, {
      })

    case ACTIONS.UPDATE_ORDER_SUCCESS:
      return Object.assign({}, state, {
        order: action.order
      })

    case ACTIONS.UPDATE_ORDER_FAILURE:
      return Object.assign({}, state, {
        message: action.message
      })

    case ACTIONS.PAY_REQUEST:
      return Object.assign({}, state, {
        isPaying: true
      })

    case ACTIONS.PAY_SUCCESS:
      return Object.assign({}, state, {
        isPaying: false,
        order: action.order
      })

    case ACTIONS.PAY_FAILURE:
      return Object.assign({}, state, {
        isPaying: false,
        message: action.message
      })

    default:
      return state
  }
}

export default eventsReducer