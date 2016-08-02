'use strict'

import {
  AppSettings,
  Lang
} from '../../settings'
import * as ACTIONS from '../constants/newEventConstants'
import Moment from 'moment'

let today = new Date(),
  hrs = today.getHours(),
  mns = today.getMinutes(),
  time = hrs * 60 + mns,
  d = Moment(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)),
  e = d.add(1, 'days'),
  timestamp = e.valueOf()

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
  groups: [timestamp],
  gatherTime: time,
  gatherLocation: {
    name: ''
  },
  contacts: [],
  minAttendee: AppSettings.minEventAttendees,
  maxAttendee: AppSettings.maxEventAttendees,
  schedule: [[]],
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

    case ACTIONS.SET_EVENT_HERO:
      return Object.assign({}, state, {
        hero: action.uri
      })

    case ACTIONS.SET_EVENT_TITLE:
      return Object.assign({}, state, {
        title: action.title
      })

    case ACTIONS.SET_EVENT_TYPE:
      return Object.assign({}, state, {
        type: action.eventType
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

    case ACTIONS.SET_EVENT_SCHEDULE_DAYS:
      let days = action.days,
        schedule = state.schedule

        console.log('reducer')
        console.log(days)
      
      if (days > schedule.length) {
        for (let i = schedule.length; i < days; i++) {
          schedule.push([])
        }
      } else if (days < schedule.length) {
        schedule.splice(days + 1, schedule.length - day)
      }

      return Object.assign({}, state, {
        schedule
      })

    case ACTIONS.EDIT_EVENT_SCHEDULE:
      return Object.assign({}, state, {
        isEditing: true
      })

    case ACTIONS.SET_EVENT_SCHEDULE:
      var schedule = state.schedule,
        day = schedule[action.day],
        agenda = action.agenda,
        index = 0

      if (action.index) {
        day.splice(action.index, 1)
      }

      if (day.length < 1) {
        day.push(agenda)
      } else {
        for (let i = 0, j = day.length; i < j; i++) {
          if (agenda.startTime >= day[i].startTime) {
            index = i + 1
            break
          }
        }

        day.splice(index, 0, agenda)
      }

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

    case ACTIONS.SET_EVENT_DEPOSIT:
      return Object.assign({}, state, {
        expenses: expensesReducer(state.expenses, action)
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

    case ACTIONS.SET_EVENT_PHOTOS:
      return Object.assign({}, state, {
        photos: action.photos
      })

    default:
      return state
  }
}

export default newEventReducer