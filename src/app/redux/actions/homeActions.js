'use strict'

import * as ACTIONS from '../constants/homeConstants'

export const changeTab = (tabId) => {
  return {
    type: ACTIONS.TAB_CHANGED,
    tabId
  }
}