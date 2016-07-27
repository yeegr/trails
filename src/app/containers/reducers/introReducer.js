'use strict'

import {
  SHOW_INTRO,
  HIDE_INTRO
} from '../constants/introConstants'

const introReducer = (state = {
  showIntro: true
}, action) => {
  switch (action.type) {
   case SHOW_INTRO:
      return Object.assign({}, state, {
        showIntro: true
      })

   case HIDE_INTRO:
      return Object.assign({}, state, {
        showIntro: false
      })

    default:
      return state
  }
}

export default introReducer