'use strict'

import * as ACTIONS from '../constants/navbarConstants'

export const navToSignUp = () => {
  return {
    type: ACTIONS.NAV_TO_SIGNUP
  }
}

export const gotToSignUp = () => {
  return {
    type: ACTIONS.GOT_TO_SIGNUP
  }
}

export const addEventSignUp = () => {
  return {
    type: ACTIONS.ADD_EVENT_SIGNUP
  }
}

export const eventSignUpAdded = () => {
  return {
    type: ACTIONS.EVENT_SIGNUP_ADDED
  }
}

export const navToRecordTrail = () => {
  return {
    type: ACTIONS.NAV_TO_RECORD_TRAIL
  }
}

export const backToRecordTrail = () => {
  return {
    type: ACTIONS.BACK_TO_RECORD_TRAIL
  }
}

export const navToEditTrail = () => {
  return {
    type: ACTIONS.NAV_TO_EDIT_TRAIL
  }
}

export const gotToEditTrail = () => {
  return {
    type: ACTIONS.GOT_TO_EDIT_TRAIL
  }
}

export const saveAgenda = () => {
  return {
    type: ACTIONS.SAVE_AGENDA
  }
}

export const agendaSaved = () => {
  return {
    type: ACTIONS.AGENDA_SAVED
  }
}