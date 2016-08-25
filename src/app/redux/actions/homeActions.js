'use strict'

import {
  TAB_PRESSED,
  TAB_CHANGED
} from '../constants/homeConstants'

export const changeTab = (tabId) => {
  return {
    type: TAB_CHANGED,
    tabId
  }
}