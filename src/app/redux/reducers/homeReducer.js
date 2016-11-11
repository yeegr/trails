'use strict'

import {CONSTANTS} from '../../settings'
import {TAB_CHANGED} from '../constants/homeConstants'

const homeReducer = (state = {
  selectedTab: CONSTANTS.HOME_TABS.AREAS
}, action) => {
  switch (action.type) {
   case TAB_CHANGED:
      return Object.assign({}, state, {
        selectedTab: action.tabId
      })

    default:
      return state
  }
}

export default homeReducer