'use strict'

import * as ACTIONS from '../constants/eventsConstants'

const eventsReducer = (state = {
  isFetching: false,
  list: [],
  event: null,
  message: null
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

    default:
      return state
  }
}

export default eventsReducer