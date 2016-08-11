'use strict'

import * as ACTIONS from '../constants/commentConstants'

const commentReducer = (state = {
  isFetching: false,
  list: [],
  comment: null
}, action) => {
  switch (action.type) {
    case ACTIONS.SEND_CREATE_REQUEST:
    	return Object.assign({},
        state, {
          isFetching: true
        })

    case ACTIONS.CREATE_COMMENT_SUCCESS:
    console.log(action.response)
      return Object.assign({},
        state, {
          isFetching: false
        },
        action.response)

    case ACTIONS.CREATE_COMMENT_FAILURE:
      return Object.assign({},
        state, {
          isFetching: false
        })

    default:
      return state
  }
}

export default commentReducer