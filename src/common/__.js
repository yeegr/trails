'use strict'

export const CONSTANTS = require('./constants')
export const UTIL = require('./util')
export const FETCH = require('./fetch').FETCH
export const Defaults = require('./defaults.json')
export const Lang = require('../locales/zh-CN.json')

import i18n from 'i18next'

const zh = require('../locales/zh-CN.1.json')

i18n.init({
  lng: 'zh',
  resources: {
    zh: {
      translation: zh
    }
  }
})

export const LANG = i18n

const env = require('./env.json'),
  //servers = env[process.env.NODE_ENV]
  servers = env['staging'] // for App 

export let AppSettings = require('./settings.json')
AppSettings.mobileRx = new RegExp(/^1+\d{10}$/)
AppSettings.vcodeRx = new RegExp('\\d{' + AppSettings.verificationCodeLength + '}', 'g')
AppSettings.pidRx = new RegExp(/\d{18}/)
AppSettings.trailTypes = [0,1,2,3,4,5,6,7,8,9]

AppSettings.baseUri = servers.WEB_SERVER + '#/'
AppSettings.apiUri = servers.API_SERVER
AppSettings.assetUri = servers.ASSET_SERVER

AppSettings.paymentMethods = LANG.t('order.paymentMethods', {returnObjects: true})

export let Graphics = require('./graphics.json')
Graphics.page = {}
Graphics.page.marginTop = Graphics.statusbar.height + Graphics.titlebar.height
