'use strict'

import {CONSTANTS} from '../../settings'
import * as ACTIONS from '../constants/homeConstants'

const homeReducer = (state = {
  selectedTab: CONSTANTS.HOME_TABS.AREAS
}, action) => {
  switch (action.type) {
   case ACTIONS.TAB_CHANGED:
      return Object.assign({}, state, {
        selectedTab: action.tabId
      })

    default:
      return state
  }
}

export default homeReducer