'use strict'

import * as ACTIONS from '../constants/homeConstants'
import {CONSTANTS} from '../../../common/__'

const homeReducer = (state = {
  selectedTab: CONSTANTS.HOME_TABS.DISCOVER
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