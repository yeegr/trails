'use strict'

export const CONSTANTS = require('./constants')

export const UTIL = require('./util')

export const FETCH = require('./fetch').FETCH

export let Lang = require('../locales/zh-CN.json')
Lang.dayArray = Lang.dayCount.split(',')
Lang.tagArray = Lang.tagList.split(',')
Lang.gearArray = Lang.gearList.split(',')
Lang.userLevelArray = Lang.userLevels.split(',')
Lang.eventDurationArray = Lang.Insurance.EventDurations.split(',')
Lang.eventGroupSizeArray = Lang.Insurance.EventGroupSizes.split(',')

export let AppSettings = require('./settings.json')
AppSettings.mobileRx = new RegExp(/^1+\d{10}$/)
AppSettings.vcodeRx = new RegExp('\\d{' + AppSettings.verificationCodeLength + '}', 'g')
AppSettings.pidRx = new RegExp(/\d{18}/)
AppSettings.trailTypes = [0,1,2,3,4,5,6,7,8,9]
AppSettings.paymentMethods = Lang.payments

let env = require('./env.json'),
  servers = env['staging']

AppSettings.baseUri = servers.WEB_SERVER + '#/'
AppSettings.apiUri = servers.API_SERVER
AppSettings.assetUri = servers.ASSET_SERVER
AppSettings.imageUri = servers.IMAGE_SERVER

export let Graphics = require('./graphics.json')
Graphics.page = {}
Graphics.page.marginTop = Graphics.statusbar.height + Graphics.titlebar.height

export const Defaults = require('./defaults.json')
