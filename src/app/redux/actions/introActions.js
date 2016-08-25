'use strict'


import {
  SHOW_INTRO,
  HIDE_INTRO,
  INTRO_PLAYED
} from '../constants/introConstants'

export const showIntro = () => {
  return {
    type: SHOW_INTRO
  }
}

export const hideIntro = () => {
  return {
    type: HIDE_INTRO
  }
}
