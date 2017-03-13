'use strict'

import * as ACTIONS from '../constants/areasConstants'

const areasReducer = (state = {
  isFetching: false,
  message: null,
  list: [],
  area: null
}, action) => {
  switch (action.type) {
    case ACTIONS.LIST_AREAS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.LIST_AREAS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        list: action.list
      })

    case ACTIONS.LIST_AREAS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        list: [],
      })

   case ACTIONS.GET_AREA_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.GET_AREA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        area: action.area
      })

    case ACTIONS.GET_AREA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        area: null
      })

    default:
      return state
  }
}

export default areasReducer