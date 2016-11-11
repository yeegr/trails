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
   case ACTIONS.REQUEST_EVENTS:
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

    case ACTIONS.REQUEST_EVENT:
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