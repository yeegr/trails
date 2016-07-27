'use strict'

import * as ACTIONS from '../constants/eventsConstants'

const eventsReducer = (state = {
  isFetching: false,
  list: [],
  event: null,
  message: null
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

    default:
      return state
  }
}

export default eventsReducer