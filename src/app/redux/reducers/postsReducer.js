'use strict'

import * as ACTIONS from '../constants/postsConstants'

const postsReducer = (state = {
  isFetching: false,
  message: null,
  list: [],
  post: null
}, action) => {
  switch (action.type) {
   case ACTIONS.LIST_POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.LIST_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        list: action.list
      })

    case ACTIONS.LIST_POSTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        list: [],
      })

   case ACTIONS.GET_POST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.GET_POST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        post: action.post
      })

    case ACTIONS.GET_POST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        post: null
      })

    default:
      return state
  }
}

export default postsReducer