'use strict'

import * as ACTIONS from '../constants/introConstants'
import {
  CONSTANTS,
  AppSettings
} from '../../../common/__'

const _showIntro = () => {
  return {
    type: ACTIONS.SHOW_INTRO
  }
}

const _hideIntro = () => {
  return {
    type: ACTIONS.HIDE_INTRO
  }
}

export const renewIntro = () => {
  const storageEngine = AppSettings.storageEngine

  storageEngine
  .setItem(CONSTANTS.HAS_NEW_INTRO, JSON.stringify(true))
}

export const exitIntro = () => {
  return (dispatch, getState) => {
    const storageEngine = AppSettings.storageEngine,
      storageType = AppSettings.storageType,
      user = getState().login.user

    switch (storageType) {
      case CONSTANTS.STORAGE_TYPES.ASYNC:
        if (user) {
          storageEngine
          .setItem(CONSTANTS.HAS_NEW_INTRO, JSON.stringify(false))
        }
      break
    }

    dispatch(_hideIntro())
  }
}

export const toggleIntro = () => {
  return (dispatch) => {
    const storageEngine = AppSettings.storageEngine,
      storageType = AppSettings.storageType

    switch (storageType) {
      case CONSTANTS.STORAGE_TYPES.ASYNC:
        storageEngine
        .getItem(CONSTANTS.HAS_NEW_INTRO)
        .then((introIsNew) => {
          if (JSON.parse(introIsNew) === false) {
            dispatch(_hideIntro())
          } else {
            dispatch(_showIntro())
          }
        })
      break
    }
  }
}
