'user strict'

import {
  combineReducers
} from 'redux'

import login from './loginReducer'
import events from './eventsReducer'
import orders from './ordersReducer'

const rootReducer = combineReducers({
  login,
  events,
  orders,
})

export default rootReducer