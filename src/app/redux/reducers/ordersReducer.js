'use strict'

import * as ACTIONS from '../constants/ordersConstants'

const ordersReducer = (state = {
  isFetching: false,
  message: null,
  list: []
}, action) => {
  switch (action.type) {
   case ACTIONS.REQUEST_ORDERS:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.LIST_ORDERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        list: action.list
      })

    case ACTIONS.LIST_ORDERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        list: [],
      })

    default:
      return state
  }
}

export default ordersReducer