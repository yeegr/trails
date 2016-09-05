'use strict'

import {CONFIG} from '../../../util/constants'
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

export const setEventHero = (uri) => {
  return {
    type: ACTIONS.SET_EVENT_HERO,
    uri
  }
}
export const setEventTitle = (title) => {
  return {
    type: ACTIONS.SET_EVENT_TITLE,
    title
  }
}

export const setDepartCity = (city) => {
  return {
    type: ACTIONS.SET_DEPART_CITY,
    city
  }
}

export const setEventType = (eventType) => {
  return {
    type: ACTIONS.SET_EVENT_TYPE,
    eventType
  }
}

export const setEventGroups = (groups) => {
  return {
    type: ACTIONS.SET_EVENT_GROUPS,
    groups
  }
}

export const setGatherTime = (time) => {
  return {
    type: ACTIONS.SET_GATHER_TIME,
    time
  }
}

export const setGatherLocation = (poi) => {
  return {
    type: ACTIONS.SET_GATHER_LOCATION,
    poi
  }
}

export const setEventContacts = (contacts) => {
  return {
    type: ACTIONS.SET_EVENT_CONTACTS,
    contacts
  }
}

export const setAttendeeLimits = (minValue, maxValue) => {
  return {
    type: ACTIONS.SET_ATTENDEE_LIMITS,
    minValue,
    maxValue
  }
}

export const setEventScheduleDays = (days) => {
  return {
    type: ACTIONS.SET_EVENT_SCHEDULE_DAYS,
    days
  }
}
export const editEventSchedule = () => {
  return {
    type: ACTIONS.EDIT_EVENT_SCHEDULE
  }
}

export const setEventAgenda = (index, agenda) => {
  return {
    type: ACTIONS.SET_EVENT_AGENDA,
    index,
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

export const saveEvent = () => {
  return (dispatch, getState) => {
    const newEvent = getState().newEvent

    if (validateEvent(newEvent)) {
      dispatch(uploadEvent(newEvent))
    }
  }
}

const validateEvent = (event) => {
  return (
    (event.isPublic !== null && event.isPublic !== undefined) &&
    (event.title.length > AppSettings.minEventTitleLength) &&
    (event.city.length > 2) && 
    (event.hero.length > 0) && 
    (event.type > -1) && 
    (event.groups.length > 0) && 
    (event.schedule.length > 0) && 
    (event.expenses.perPerson !== null && event.expenses.perPerson > -1)
  )
}

const sendUploadRequest = (event) => {
  return {
    type: ACTIONS.SAVE_EVENT,
    event
  }
}

const receiveUploadResponse = (event) => {
  return {
    type: ACTIONS.SAVE_EVENT_SUCCESS,
    event
  }
}

const uploadError = (message) => {
  return {
    type: ACTIONS.SAVE_EVENT_FAILURE,
    message
  }
}

const uploadEvent = (data) => {
  let config = Object.assign({}, CONFIG.POST, {
    body: JSON.stringify(data)
  })

  return (dispatch) => {
    dispatch(sendUploadRequest(data))

    return fetch(AppSettings.apiUri + 'events', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log('response')
        console.log(res)
        if (res.id) {
          dispatch(receiveUploadResponse(res))
        } else {
          dispatch(saveError(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(saveError(err)))
  }
}