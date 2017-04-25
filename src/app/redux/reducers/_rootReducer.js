'user strict'

import {
  combineReducers
} from 'redux'

import login from './userReducer'
import home from './homeReducer'
import intro from './introReducer'
import areas from './areasReducer'
import trails from './trailsReducer'
import events from './eventsReducer'
import orders from './ordersReducer'
import posts from './postsReducer'
import toolbar from './toolbarReducer'
import comments from './commentsReducer'
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
  comments,
  newEvent,
  newTrail
})

export default rootReducer