'user strict'

import {StyleSheet} from 'react-native'
import {UTIL, Graphics} from '../settings'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: UTIL.hex2rgb(Graphics.colors.primary, .8),
    height: Graphics.page.marginTop
  },
  toolbar: {
    flexDirection: 'row',
  }
})