'user strict'

import {
  combineReducers
} from 'redux'

import home from './homeReducer'
import login from './loginReducer'
import intro from './introReducer'
import areas from './areasReducer'
import events from './eventsReducer'
import orders from './ordersReducer'
import posts from './postsReducer'
import toolbar from './toolbarReducer'
import trails from './trailsReducer'
import newEvent from './newEventReducer'
import newTrail from './newTrailReducer'

const rootReducer = combineReducers({
  home,
  login,
  intro,
  areas,
  trails,
  events,
  orders,
  posts,
  toolbar,
  newEvent,
  newTrail
})

export default rootReducer