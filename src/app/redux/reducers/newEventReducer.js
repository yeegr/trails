'use strict'

import moment from 'moment'
import * as ACTIONS from '../constants/newEventConstants'
import {
  UTIL,
  AppSettings,
  Defaults
} from '../../../common/__'

let today = new Date(),
  hrs = today.getHours(),
  mns = today.getMinutes(),
  time = hrs * 60 + mns,
  d = moment(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)),
  e = d.add(1, 'days'),
  timestamp = e.valueOf()

const initState = {
  isUploading: false,
  isSaved: false,

  isPublic: true,
  status: 'editing',
  title: '',
  city: AppSettings.defaultCity,
  hero: AppSettings.defaultEventHeroUri,
  description: '',
  excerpt: '',
  difficultyLevel: AppSettings.defaultDifficultyLevel,
  tags: [],
  groups: [{
    startDate: timestamp,
    deadline: timestamp - 86400
  }],
  gatherTime: null,
  gatherLocation: {
    name: ''
  },
  contacts: [],
  minAttendee: AppSettings.minEventAttendees,
  maxAttendee: AppSettings.maxEventAttendees,
  schedule: [],
  expenses: {
    perHead: 0,
    deposit: 0,
    insurance: true,
    detail: Defaults.Event.Expenses.Detail,
    includes: Defaults.Event.Expenses.Includes,
    excludes: Defaults.Event.Expenses.Excludes
  },
  destination: '',
  gears: {
    images: [],
    tags: [],
    notes: []
  },
  photos: [],
  notes: Defaults.Event.Notes,
  comments: []
},

newEventReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.NEW_EVENT:
      return (UTIL.isNullOrUndefined(action.event)) ? initState : UTIL.mergeDeep(initState, action.event)

    case ACTIONS.EDIT_EVENT:
      return action.event

    case ACTIONS.RESET_EVENT:
      return initState

    case ACTIONS.SET_EVENT_PRIVACY:
      return Object.assign({}, state, {
        isPublic: action.isPublic
      })

    case ACTIONS.SET_EVENT_TITLE:
      return Object.assign({}, state, {
        title: action.title
      })

    case ACTIONS.SET_EVENT_HERO:
      return Object.assign({}, state, {
        hero: action.uri
      })

    case ACTIONS.SET_EVENT_DESCRIPTION:
      return Object.assign({}, state, {
        description: action.description
      })

    case ACTIONS.SET_EVENT_EXCERPT:
      return Object.assign({}, state, {
        excerpt: action.excerpt
      })

    case ACTIONS.SET_EVENT_TAGS:
      return Object.assign({}, state, {
        tags: action.tags
      })

    case ACTIONS.SET_EVENT_DIFFICULTY_LEVEL:
      return Object.assign({}, state, {
        difficultyLevel: action.difficultyLevel
      })

    case ACTIONS.SET_DEPART_CITY:
      return Object.assign({}, state, {
        city: action.city
      })

    case ACTIONS.SET_EVENT_GROUPS:
      return Object.assign({}, state, {
        groups: action.groups
      })

    case ACTIONS.SET_GATHER_TIME:
      return Object.assign({}, state, {
        gatherTime: action.time
      })

    case ACTIONS.SET_GATHER_LOCATION:
      return Object.assign({}, state, {
        gatherLocation: action.poi
      })

    case ACTIONS.SET_EVENT_CONTACTS:
      return Object.assign({}, state, {
        contacts: action.contacts
      })

    case ACTIONS.SET_ATTENDEE_LIMITS:
      return Object.assign({}, state, {
        minAttendee: action.minValue,
        maxAttendee: action.maxValue
      })

    case ACTIONS.SET_EVENT_SCHEDULE:
      return Object.assign({}, state, {
        schedule: action.schedule
      })

    case ACTIONS.SET_EXPENSES_PERHEAD:
      return Object.assign({}, state, {
        expenses: Object.assign({}, state.expenses, {
          perHead: action.perHead
        })
      })

    case ACTIONS.SET_EXPENSES_DEPOSIT:
      return Object.assign({}, state, {
        expenses: Object.assign({}, state.expenses, {
          deposit: action.deposit
        })
      })

    case ACTIONS.SET_EVENT_INSURANCE:
      return Object.assign({}, state, {
        expenses: Object.assign({}, state.expenses, {
          insurance: action.insurance
        })
      })

    case ACTIONS.SET_EXPENSE_DETAIL:
      return Object.assign({}, state, {
        expenses: Object.assign({}, state.expenses, {
          detail: action.detail
        })
      })

    case ACTIONS.SET_EXPENSE_INCLUDES:
      return Object.assign({}, state, {
        expenses: Object.assign({}, state.expenses, {
          includes: action.includes
        })
      })

    case ACTIONS.SET_EXPENSE_EXCLUDES:
      return Object.assign({}, state, {
        expenses: Object.assign({}, state.expenses, {
          excludes: action.excludes
        })
      })

    case ACTIONS.SET_GEAR_IMAGES:
      return Object.assign({}, state, {
        gears: Object.assign({}, state.gears, {
          images: action.images
        })
      })

    case ACTIONS.SET_GEAR_TAGS:
      return Object.assign({}, state, {
        gears: Object.assign({}, state.gears, {
          tags: action.tags
        })
      })

    case ACTIONS.SET_GEAR_NOTES:
      return Object.assign({}, state, {
        gears: Object.assign({}, state.gears, {
          notes: action.notes
        })
      })

    case ACTIONS.SET_EVENT_DESTINATION:
      return Object.assign({}, state, {
        destination: action.destination
      })

    case ACTIONS.SET_EVENT_NOTES:
      return Object.assign({}, state, {
        notes: action.notes
      })

    case ACTIONS.SET_EVENT_PHOTOS:
      return Object.assign({}, state, {
        photos: action.photos
      })

// create event
    case ACTIONS.CREATE_EVENT_REQUEST:
      return Object.assign({}, state, {
        isUploading: true
      })

    case ACTIONS.CREATE_EVENT_SUCCESS:
      return Object.assign({}, state, {
        isUploading: false,
        isSaved: true
      })

    case ACTIONS.CREATE_EVENT_FAILURE:
      return Object.assign({}, state, {
        isUploading: false,
        message: action.message
      })

// update event
    case ACTIONS.UPDATE_EVENT_REQUEST:
      return Object.assign({}, state, {
        isUploading: true
      })

    case ACTIONS.UPDATE_EVENT_SUCCESS:
      return Object.assign({}, state, {
        isUploading: false,
        isSaved: true
      })

    case ACTIONS.UPDATE_EVENT_FAILURE:
      return Object.assign({}, state, {
        isUploading: false,
        message: action.message
      })

// delete local event

    default:
      return state
  }
}

export default newEventReducer