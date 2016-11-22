'use strict'

import * as ACTIONS from '../constants/trailsConstants'

const trailsReducer = (state = {
  isFetching: false,
  list: [],
  trail: null,
  message: null,
}, action) => {
  switch (action.type) {
   case ACTIONS.LIST_TRAILS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.LIST_TRAILS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        list: action.list
      })

    case ACTIONS.LIST_TRAILS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        list: [],
      })

   case ACTIONS.GET_TRAIL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.GET_TRAIL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        trail: action.trail
      })

    case ACTIONS.GET_TRAIL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        trail: null
      })

    default:
      return state
  }
}

export default trailsReducer