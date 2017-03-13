'user strict'

import {StyleSheet} from 'react-native'
import {Graphics} from '../settings'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.colors.background,
    flex: 1
  },
  main: {
    flex: 1,
    padding: 10,
  },
  close: {
    height: Graphics.icon.sideLength,
    right: 15,
    top: 30,
    position: 'absolute',
    width: Graphics.icon.sideLength
  }
})