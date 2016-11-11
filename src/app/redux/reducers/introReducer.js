'use strict'

import {AsyncStorage} from 'react-native'
import {CONSTANTS} from '../../settings'
import {
  SHOW_INTRO,
  HIDE_INTRO,
  INTRO_PLAYED
} from '../constants/introConstants'

const introReducer = (state = {
  showIntro: true
}, action) => {
  switch (action.type) {
    case SHOW_INTRO:
      return AsyncStorage
        .multiGet([CONSTANTS.ACCESS_TOKEN, INTRO_PLAYED])
        .then((store) => {
          // not logged in or not played
          return {
            showIntro: (store[0] || store[1][1])
          }
        })
        .catch((err) => {
          console.log(err)
        })

    case HIDE_INTRO:
      return AsyncStorage
        .getItem(CONSTANTS.ACCESS_TOKEN)
        .then(() => {
          AsyncStorage.setItem(INTRO_PLAYED, true)
        })
        .catch((err) => {
          console.log(err)
          Object.assign({}, state, {
            showIntro: false
          })
        })

    default:
      return state
  }
}

export default introReducer