'use strict'

import {
  AppSettings,
  Lang
} from '../../settings'
import * as ACTIONS from '../constants/newEventConstants'

const initState = {
  isEditing: false,
  isFetching: false,
  isPublic: false,
  privacyStatus: 'private',
  title: Lang.Unnamed,
  type: 0,
  hero: '',
  description: '',
  excerpt: '',
  tags: [],
  gatherTime: new Date,
  gatherLocation: {
    name: ''
  },
  contacts: [{
    name: 'aaa',
    mobileNumber: '12345678901'
  },{
    name: 'bbb',
    mobileNumber: '12345678901'
  },{
    name: 'ccc',
    mobileNumber: '12345678901'
  },{
    name: 'ddd',
    mobileNumber: '12345678901'
  },{
    name: 'eee',
    mobileNumber: '12345678901'
  }],
  minAttendee: AppSettings.minEventAttendees,
  maxAttendee: AppSettings.maxEventAttendees,
  schedule: [],
  expenses: {
    perPerson: 0,
    deposit: 0,
    insurance: true,
    detail: ['1','2','3','4','5'],
    include: ['A','B','C','D','E','F'],
    exclude: ['a','b','c']
  },
  destination: '',
  gears: {
    images: [0],
    tags: [],
    notes: []
  },
  photos: [],
  notes: ['x', 'y', 'z']
},

newEventReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.CREAT_EVENT:
      return initState

    case ACTIONS.EDIT_EVENT:
      return action.event

    case ACTIONS.SET_EVENT_PRIVACY:
      return Object.assign({}, state, {
        isPublic: action.isPublic
      })

    case ACTIONS.SET_EVENT_TITLE:
      return Object.assign({}, state, {
        title: action.title
      })

    case ACTIONS.SET_EVENT_TYPE:
      return Object.assign({}, state, {
        type: action.eventType
      })

    case ACTIONS.SET_GATHER_TIME:
      return Object.assign({}, state, {
        gatherTime: action.datetime
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

    case ACTIONS.EDIT_EVENT_SCHEDULE:
      return Object.assign({}, state, {
        isEditing: true
      })

    case ACTIONS.SET_EVENT_SCHEDULE:
      var schedule = state.schedule,
        agenda = action.agenda

      if (!schedule[agenda.day]) {
        schedule[agenda.day] = []
      }

      if (agenda.index === null) {
        agenda.index = schedule[agenda.day].length
        schedule[agenda.day].push(agenda)
      } else {
        schedule[agenda.day].splice(agenda.index, 1, agenda)
      }

      console.log(schedule)

      return Object.assign({}, state, {
        isEditing: false,
        schedule
      })

    case ACTIONS.DELETE_EVENT_AGENDA:
      var schedule = state.schedule,
        agenda = action.agenda

      if (agenda.index > -1) {
        schedule[agenda.day].splice(agenda.index, 1)
      }

      return Object.assign({}, state, {
        isEditing: false,
        schedule
      })

    case ACTIONS.SET_EVENT_EXPENSES:
      return Object.assign({}, state, {
        expenses: action.expenses
      })

    case ACTIONS.SET_EVENT_GEARS:
      return Object.assign({}, state, {
        gears: action.gears
      })

    case ACTIONS.SET_EVENT_DESTINATION:
      return Object.assign({}, state, {
        destination: action.destination
      })

    case ACTIONS.SET_EVENT_NOTES:
      return Object.assign({}, state, {
        notes: action.notes
      })

    case ACTIONS.SET_EVENT_DEPOSIT:
      return Object.assign({}, state, {
        expenses: expensesReducer(state.expenses, action)
      })

    default:
      return state
  }
}

export default newEventReducer