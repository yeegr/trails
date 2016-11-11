'use strict'

import * as ACTIONS from '../constants/navbarConstants'

const navbarReducer = (state = {
  addingEventSignup: false,
  savingEventAgenda: false,
  nav_to_signup: false,
  selectedCity: '010'
}, action) => {
  switch (action.type) {
    case ACTIONS.NAV_TO_SIGNUP:
      return Object.assign({}, state, {
        nav_to_signup: true
      })

    case ACTIONS.GOT_TO_SIGNUP:
      return Object.assign({}, state, {
        nav_to_signup: false
      })

    case ACTIONS.ADD_EVENT_SIGNUP:
      return Object.assign({}, state, {
        addingEventSignup: true
      })

    case ACTIONS.EVENT_SIGNUP_ADDED:
      return Object.assign({}, state, {
        addingEventSignup: false
      })

    case ACTIONS.SAVE_AGENDA:
      return Object.assign({}, state, {
        savingEventAgenda: true
      })

    case ACTIONS.AGENDA_SAVED:
      return Object.assign({}, state, {
        savingEventAgenda: false
      })

    default:
      return state
  }
}

export default navbarReducer