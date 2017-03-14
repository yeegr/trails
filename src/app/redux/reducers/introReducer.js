'use strict'

import * as ACTIONS from '../constants/introConstants'

const introReducer = (state = {
  showIntro: false
}, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_INTRO:
      return Object.assign({}, state, {
        showIntro: true
      })

    case ACTIONS.HIDE_INTRO:
      return Object.assign({}, state, {
        showIntro: false
      })

    default:
      return state
  }
}

export default introReducer