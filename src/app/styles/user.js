'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  hero: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 80,
  },
  userHandle: {
    color: Graphics.textColors.overlay,
    fontSize: Graphics.fontSizes.XXXL,
    marginVertical: 20
  }
})