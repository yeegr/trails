'use strict'

import i18n from 'i18next'

let zh = require('../locales/zh-CN.1.json')

i18n.init({
  lng: 'zh',
  resources: {
    zh: {
      translation: zh
    }
  }
})

export const LANG = i18n

const common = require('../common/__.js')

export const CONSTANTS = common.CONSTANTS
export const UTIL = common.UTIL
export const FETCH = common.FETCH

//export const Lang = common.Lang
export const AppSettings = common.AppSettings
export const Graphics = common.Graphics
export const Defaults = common.Defaults
