'use strict'

import {CONFIG} from '../../../constants'
import {AppSettings} from '../../settings'
import * as ACTIONS from '../constants/newEventConstants'

export const createEvent = () => {
  return {
    type: ACTIONS.CREAT_EVENT
  }
}

export const editEvent = (event) => {
  return {
    type: ACTIONS.EDIT_EVENT,
    event
  }
}

export const setEventPrivacy = (isPublic) => {
  return {
    type: ACTIONS.SET_EVENT_PRIVACY,
    isPublic
  }
}

export const setEventTitle = (title) => {
  return {
    type: ACTIONS.SET_EVENT_TITLE,
    title
  }
}

export const setEventType = (eventType) => {
  return {
    type: ACTIONS.SET_EVENT_TYPE,
    eventType
  }
}

export const setEventContacts = (contacts) => {
  return {
    type: ACTIONS.SET_EVENT_CONTACTS,
    contacts
  }
}

export const setGatherTime = (datetime) => {
  return {
    type: ACTIONS.SET_GATHER_TIME,
    datetime
  }
}

export const setGatherLocation = (poi) => {
  return {
    type: ACTIONS.SET_GATHER_LOCATION,
    poi
  }
}

export const setAttendeeLimits = (minValue, maxValue) => {
  return {
    type: ACTIONS.SET_ATTENDEE_LIMITS,
    minValue,
    maxValue
  }
}

export const editEventSchedule = () => {
  return {
    type: ACTIONS.EDIT_EVENT_SCHEDULE
  }
}

export const setEventSchedule = (agenda) => {
  return {
    type: ACTIONS.SET_EVENT_SCHEDULE,
    agenda
  }
}

export const deleteEventAgenda = (agenda) => {
  return {
    type: ACTIONS.DELETE_EVENT_AGENDA,
    agenda
  }
}

export const setEventExpenses = (expenses) => {
  return {
    type: ACTIONS.SET_EVENT_EXPENSES,
    expenses
  }
}

export const setEventGears = (gears) => {
  return {
    type: ACTIONS.SET_EVENT_GEARS,
    gears
  }
}

export const setEventDestination = (destination) => {
  return {
    type: ACTIONS.SET_EVENT_DESTINATION,
    destination
  }
}

export const setEventNotes = (notes) => {
  return {
    type: ACTIONS.SET_EVENT_NOTES,
    notes
  }
}

export const setEventPhotos = (photos) => {
  return {
    type: ACTIONS.SET_EVENT_PHOTOS,
    photos
  }
}