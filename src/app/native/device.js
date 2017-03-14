'use strict'

import {Dimensions} from 'react-native'
const {height, width} = Dimensions.get('window')

import DeviceInfo from 'react-native-device-info'

export default {
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
