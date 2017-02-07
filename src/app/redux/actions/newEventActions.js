'use strict'

import * as ACTIONS from '../constants/newEventConstants'
import * as loginActions from './loginActions'
import {
  CONSTANTS,
  FETCH,
  UTIL,
  AppSettings
} from '../../settings'

export const newEvent = (event) => {
  return {
    type: ACTIONS.NEW_EVENT,
    event
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

export const setEventDescription = (description) => {
  return {
    type: ACTIONS.SET_EVENT_DESCRIPTION,
    description
  }
}

export const setEventExcerpt = (excerpt) => {
  return {
    type: ACTIONS.SET_EVENT_EXCERPT,
    excerpt
  }
}

export const setEventDifficulty = (difficultyLevel) => {
  return {
    type: ACTIONS.SET_EVENT_DIFFICULTY_LEVEL,
    difficultyLevel
  }
}

export const setDepartCity = (city) => {
  return {
    type: ACTIONS.SET_DEPART_CITY,
    city
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

export const setEventSchedule = (schedule) => {
  return {
    type: ACTIONS.SET_EVENT_SCHEDULE,
    schedule
  }
}

export const setExpensesPerHead = (perHead) => {
  return {
    type: ACTIONS.SET_EXPENSES_PERHEAD,
    perHead
  }
}

export const setExpensesDeposit = (deposit) => {
  return {
    type: ACTIONS.SET_EXPENSES_DEPOSIT,
    deposit
  }
}

export const setEventInsurance = (insurance) => {
  return {
    type: ACTIONS.SET_EVENT_INSURANCE,
    insurance
  }
}

export const setExpensesDetails = (detail) => {
  return {
    type: ACTIONS.SET_EXPENSE_DETAIL,
    detail
  }
}

export const setExpensesIncludes = (includes) => {
  return {
    type: ACTIONS.SET_EXPENSE_INCLUDES,
    includes
  }
}

export const setExpensesExcludes = (excludes) => {
  return {
    type: ACTIONS.SET_EXPENSE_EXCLUDES,
    excludes
  }
}

export const setGearImages = (images) => {
  return {
    type: ACTIONS.SET_GEAR_IMAGES,
    images
  }
}

export const setGearTags = (tags) => {
  return {
    type: ACTIONS.SET_GEAR_TAGS,
    tags
  }
}

export const setGearNotes = (notes) => {
  return {
    type: ACTIONS.SET_GEAR_NOTES,
    notes
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

    console.log(newEvent)
    console.log(validateEventBase(newEvent))

    if (validateEvent(newEvent)) {
      if (UTIL.isNullOrUndefined(newEvent._id)) {
        dispatch(createEvent(newEvent))
      } else {
        dispatch(updateEvent(newEvent))
      }
    }
  }
}

export const submitEvent = (event) => {
  return (dispatch, getState) => {
    dispatch(editEvent(event))
    const newEvent = getState().newEvent
    newEvent.status = 'approved'

    dispatch(saveEvent())
  }
}

export const validateEventBase = (event) => {
  let init = 0

  if (UTIL.isNullOrUndefined(event.isPublic)) init++
  if (event.title.length < AppSettings.minEventTitleLength) init++
  if (event.city.length < 1) init++ 
  if (event.groups.length < 1) init++
  if (UTIL.isNullOrUndefined(event.gatherTime)) init++
  if (event.gatherLocation.name.length < 1) init++
  if (event.contacts.length < 1) init++

  return (init > 0) ? init : true
}

export const validateEvent = (event) => {
  return (
    (validateEventBase(event) === true) && 
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

    return fetch(AppSettings.apiUri + 'events/' + data._id, config)
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