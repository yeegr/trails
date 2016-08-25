'use strict'

import {Dimensions} from 'react-native'
import DeviceInfo from 'react-native-device-info'

const settings = require('../util/settings.json'),
  {height, width} = Dimensions.get('window')

export const device = {
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
  location: DeviceInfo.getDeviceLocale(),
  country: DeviceInfo.getDeviceCountry(),
  height,
  width
}

export let Lang = settings.lang
Lang.dayArray = Lang.dayCount.split(',')
Lang.tagArray = Lang.tagList.split(',')
Lang.gearArray = Lang.gearList.split(',')
Lang.userLevelArray = Lang.userLevels.split(',')

export let AppSettings = settings.app
AppSettings.mobileNumberPattern = new RegExp(/1+\d{10}/)
AppSettings.trailTypes = [0,1,2,3,4,5,6,7,8,9]
AppSettings.paymentMethods = Lang.payments

export const Graphics = settings.graphics
Graphics.page = {}
Graphics.page.marginTop = Graphics.statusbar.height + Graphics.titlebar.height
export const WebViewCSS = '<style>img {max-width: 100%} p {text-indent: 2em}</style>'
