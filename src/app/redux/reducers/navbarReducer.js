'use strict'

import * as ACTIONS from '../constants/navbarConstants'

const navbarReducer = (state = {
  addingEventSignup: false
}, action) => {
  switch (action.type) {
    case ACTIONS.ADD_EVENT_SIGNUP:
      return Object.assign({}, state, {
        addingEventSignup: true
      })

    case ACTIONS.EVENT_SIGNUP_ADDED:
      return Object.assign({}, state, {
        addingEventSignup: false
      })

    default:
      return state
  }
}

export default navbarReducer