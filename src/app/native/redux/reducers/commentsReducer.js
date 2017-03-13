'use strict'

import * as ACTIONS from '../constants/commentsConstants'

const commentsReducer = (state = {
  isFetching: false,
  message: null,
  list: [],
  comment: null
}, action) => {
  switch (action.type) {
    case ACTIONS.LIST_COMMENTS_REQUEST:
      return Object.assign({}, state, {
          isFetching: true
        })

    case ACTIONS.LIST_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        list: action.list
      })

    case ACTIONS.LIST_COMMENTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        list: [],
      })

    case ACTIONS.CREATE_COMMENT_REQUEST:
      return Object.assign({}, state, {
          isFetching: true
        })

    case ACTIONS.CREATE_COMMENT_SUCCESS:
      return Object.assign({}, state, {
          isFetching: false
        })

    case ACTIONS.CREATE_COMMENT_FAILURE:
      return Object.assign({}, state, {
          isFetching: false
        })

    default:
      return state
  }
}

export default commentsReducer