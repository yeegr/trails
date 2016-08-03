'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {StyleSheet} from 'react-native'
import {hex2rgb} from '../../common'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: hex2rgb(Graphics.colors.primary, .8)
  },
  toolbar: {
    flexDirection: 'row',
  }
})