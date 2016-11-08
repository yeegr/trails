'use strict'

import {Dimensions} from 'react-native'
import DeviceInfo from 'react-native-device-info'

const {height, width} = Dimensions.get('window')

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

const common = require('../common/__.js')

export const CONSTANTS = common.CONSTANTS
export const UTIL = common.UTIL
export const FETCH = common.FETCH

export const Lang = common.Lang
export const AppSettings = common.AppSettings
export const Graphics = common.Graphics
export const Defaults = common.Defaults
export const WebViewCSS = '<style>img {max-width: 100%} p {text-indent: 2em}</style>'
