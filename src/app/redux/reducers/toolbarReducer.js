'use strict'

import * as ACTIONS from '../constants/toolbarConstants'

const toolbarReducer = (state = {
  isFetching: false,
  target: null,
  ref: null,
  likeCount: 0,
  saveCount: 0,
  shareCount: 0,
  commentCount: 0
}, action) => {
  switch (action.type) {
    case ACTIONS.RESET_TOOLBAR:
    	return {
        isFetching: false,
        target: action.stats.target,
        ref: action.stats.ref,
        likeCount: action.stats.likeCount,
        saveCount: action.stats.saveCount,
        shareCount: action.stats.shareCount,
        commentCount: action.stats.commentCount
      }

    case ACTIONS.TOOLBAR_ACTION_REQUEST:
    	return Object.assign({},
        state, {
          isFetching: true
        })

    case ACTIONS.TOOLBAR_ACTION_SUCCESS:
      return Object.assign({}, state, {
          isFetching: false
        }, action.response)

    case ACTIONS.TOOLBAR_ACTION_FAILURE:
      return Object.assign({}, state, {
          isFetching: false
        })

    default:
      return state
  }
}

export default toolbarReducer