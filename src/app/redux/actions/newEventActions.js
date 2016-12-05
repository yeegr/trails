'use strict'

import * as ACTIONS from '../constants/newEventConstants'
import {
  FETCH,
  AppSettings
} from '../../settings'

export const newEvent = () => {
  return {
    type: ACTIONS.NEW_EVENT
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

export const setEventAgenda = (day, index, agenda) => {
  return {
    type: ACTIONS.SET_EVENT_AGENDA,
    day,
    index,
    agenda
  }
}

export const deleteEventAgenda = (day, index) => {
  return {
    type: ACTIONS.DELETE_EVENT_AGENDA,
    day,
    index
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

// save event
export const saveEvent = () => {
  return (dispatch, getState) => {
    const newEvent = getState().newEvent
    newEvent.creator = getState().login.user._id

    if (validateEvent(newEvent)) {
      dispatch(createEVent(newEvent))
    }
  }
}

const validateEvent = (event) => {
  return (
    (event.isPublic !== null && event.isPublic !== undefined) &&
    (event.title.length >= AppSettings.minEventTitleLength) &&
    (event.city.length > 2) && 
    (event.hero.length > 0) && 
    (event.type > -1) && 
    (event.groups.length > 0) && 
    (event.gatherTime !== null) && 
    (event.gatherLocation.name.length > 0) && 
    (event.contacts.length > 0) && 
    (event.schedule.length > 0) && 
    (event.schedule[0].length > 0) && 
    (event.expenses.perHead !== null && event.expenses.perHead > -1)
  )
}

const createEventRequest = () => {
  return {
    type: ACTIONS.CREATE_EVENT_REQUEST
  }
}

const createEventSuccess = (event) => {
  return {
    type: ACTIONS.CREATE_EVENT_SUCCESS,
    event
  }
}

const createEventFailure = (message) => {
  return {
    type: ACTIONS.CREATE_EVENT_FAILURE,
    message
  }
}

const createEVent = (data) => {
  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify(data)
  })

  return (dispatch) => {
    dispatch(createEventRequest())

    return fetch(AppSettings.apiUri + 'events', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.id) {
          if (data.hero !== AppSettings.defaultEventHeroUri) {
            dispatch(uploadEventHero(res.id, data.hero))
          } else {
            dispatch(createEventSuccess(res))
          }
        } else {
          dispatch(createEventFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(createEventFailure(err)))
  }
}

const uploadEventHero = (id, uri) => {
  let body = new FormData()

  body.append('file', {
    type: 'image/jpg',
    name: 'hero.jpg',
    uri
  })

  let config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body
  }

  return (dispatch) => {
    return fetch(AppSettings.apiUri + 'events/' + id + '/hero', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res._id) {
          dispatch(receiveSaveResponse(res))
        } else {
          dispatch(saveError(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(saveError(err)))
  }
}