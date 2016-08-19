'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {StyleSheet} from 'react-native'
import {hex2rgb} from '../../util/common'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: hex2rgb(Graphics.colors.primary, .8),
    height: Graphics.statusbar.height + Graphics.titlebar.height
  },
  toolbar: {
    flexDirection: 'row',
  }
})