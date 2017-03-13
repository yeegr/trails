'use strict'

import * as ACTIONS from '../constants/introConstants'

export const showIntro = () => {
  return {
    type: ACTIONS.SHOW_INTRO
  }
}

export const hideIntro = () => {
  return {
    type: ACTIONS.HIDE_INTRO
  }
}
