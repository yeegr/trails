'use strict'

import * as ACTIONS from '../constants/newEventConstants'
import * as loginActions from './loginActions'
import {
  CONSTANTS,
  FETCH,
  UTIL,
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
      if (UTIL.isNullOrUndefined(newEvent._id)) {
        dispatch(createEvent(newEvent))
      } else {
        dispatch(updateEvent(newEvent))
      }
    }
  }
}

export const validateEvent = (event) => {
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
  loginActions.reloadUser()

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

const createEvent = (data) => {
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

// update trail
const updateEventRequest = () => {
  return {
    type: ACTIONS.UPDATE_EVENT_REQUEST
  }
}

const updateEventSuccess = (event) => {
  loginActions.reloadUser()

  return {
    type: ACTIONS.UPDATE_EVENT_SUCCESS,
    event
  }
}

const updateEventFailure = (message) => {
  return {
    type: ACTIONS.UPDATE_EVENT_FAILURE,
    message
  }
}

const uploadEventHero = (event_id, uri) => {
  let formData = new FormData()

  formData.append('file', {
    type: 'image/jpg',
    name: 'hero.jpg',
    uri
  })

  let config = Object.assign({}, FETCH.UPLOAD, {
    body: formData
  })

  return (dispatch) => {
    dispatch(updateEventRequest())

    return fetch(AppSettings.apiUri + 'events/' + event_id + '/hero', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        dispatch(updateEventSuccess(res))
      })
      .catch((err) => dispatch(updateEventFailure(err)))
  }
}

const comparePhotoArrays = (saved, selected) => {
  let added = []

  selected.map((photo) => {
    let filename = photo.filename, 
      tmp = filename.split('.'),
      key = tmp[0],
      ext = tmp[1]

    if (saved.indexOf(filename) < 0) {
      added.push({
        key,
        type: 'image/' + ext,
        name: filename,
        uri: photo.uri
      })
    }
  })

  if (added.length > 0) {
    return added
  }
  
  return false
}

const uploadPhotos = (type, id, photos) => {
  let formData = new FormData()
  formData.append('type', type)
  formData.append('id', id)
  formData.append('path', type + '/' + id + '/')

  photos.map((photo) => {
    formData.append(photo.key, photo)
  })

  let config = Object.assign({}, FETCH.UPLOAD, {
    body: formData
  })

  return (dispatch) => {
    dispatch(updateEventRequest())

    return fetch(AppSettings.apiUri + 'photos', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        dispatch(updateEventSuccess(res))
      })
      .catch((err) => dispatch(updateEventFailure(err)))
  }
}

export const updateEvent = (data) => {
  let selectedPhotos = data.photos
  data.photos = []

  let config = Object.assign({}, FETCH.PUT, {
    body: JSON.stringify(data)
  })

  return (dispatch) => {
    dispatch(updateEventRequest(data))

    return fetch(AppSettings.apiUri + 'trails/' + data._id, config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res._id) {
          let photos = comparePhotoArrays(res.photos, selectedPhotos)

          if (!photos) {
            dispatch(updateEventSuccess(res, selectedPhotos))
          } else {
            dispatch(uploadPhotos(CONSTANTS.ACTION_TARGETS.TRAIL, res._id, photos))
          }
        } else {
          dispatch(updateEventFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(updateEventFailure(err)))
  }
}