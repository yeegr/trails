'use strict'

import * as ACTIONS from '../constants/navbarConstants'

const navbarReducer = (state = {
  addingEventSignup: false,
  savingEventAgenda: false,
  nav_to_edit_trail: false,  
  nav_to_signup_event: false,
  selectedCity: '010'
}, action) => {
  switch (action.type) {
    case ACTIONS.NAV_TO_SIGNUP:
      return Object.assign({}, state, {
        nav_to_signup_event: true
      })

    case ACTIONS.GOT_TO_SIGNUP:
      return Object.assign({}, state, {
        nav_to_signup_event: false
      })

    case ACTIONS.ADD_EVENT_SIGNUP:
      return Object.assign({}, state, {
        addingEventSignup: true
      })

    case ACTIONS.EVENT_SIGNUP_ADDED:
      return Object.assign({}, state, {
        addingEventSignup: false
      })

    case ACTIONS.NAV_TO_RECORD_TRAIL:
      return Object.assign({}, state, {
        nav_to_record_trail: true
      })

    case ACTIONS.BACK_TO_RECORD_TRAIL:
      return Object.assign({}, state, {
        nav_to_edit_trail: false
      })

    case ACTIONS.NAV_TO_EDIT_TRAIL:
      return Object.assign({}, state, {
        nav_to_edit_trail: true
      })

    case ACTIONS.GOT_TO_EDIT_TRAIL:
      return Object.assign({}, state, {
        nav_to_edit_trail: false
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