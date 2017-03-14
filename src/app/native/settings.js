'use strict'

import {Dimensions} from 'react-native'
import DeviceInfo from 'react-native-device-info'

/*
import i18n from 'react-native-i18n'

let zh = require('../../locales/zh-CN.1.json')

i18n.defaultLocale = 'zh-CN'
i18n.locale = 'zh-CN'
i18n.fallbacks = true
i18n.translations = {
  zh
}

export const LANG = i18n

*/
const {height, width} = Dimensions.get('window')

export const Device = {
  uniqueId: DeviceInfo.getUniqueID(),
  manufacturer: DeviceInfo.getManufacturer(),
  model: DeviceInfo.getModel(),
  deviceId: DeviceInfo.getDeviceId(),
  deviceName: DeviceInfo.getDeviceName(),
  systemName: DeviceInfo.getSystemName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  bundleId: DeviceInfo.getBundleId(),
  buildNumber: DeviceInfo.getBuildNumber(),
  appVersion: DeviceInfo.getVersion(),
  appVersionReadable: DeviceInfo.getReadableVersion(),
  userAgent: DeviceInfo.getUserAgent(),
  locale: DeviceInfo.getDeviceLocale(),
  country: DeviceInfo.getDeviceCountry(),
  height,
  width
}

const common = require('../../common/__.js')

export const CONSTANTS = common.CONSTANTS
export const UTIL = common.UTIL
export const FETCH = common.FETCH

export const Lang = common.Lang
export const AppSettings = common.AppSettings
export const Graphics = common.Graphics
export const Defaults = common.Defaults
export const WebViewCSS = '<style>img {max-width: 100%} p {text-indent: 2em}</style>'
