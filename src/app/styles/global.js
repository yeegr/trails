'user strict'

import {Graphics} from '../settings'
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.app.backgroundColor,
    flex: 1
  },
  main: {
    flex: 1,
    paddingTop: Graphics.titleBar.height
  },
  map: {
    backgroundColor: Graphics.colors.lightGray,
    height: 360,
  },
  corner: {
    padding: 15
  },
  form: {
    backgroundColor: Graphics.form.backgroundColor,
    borderBottomColor: Graphics.form.borderColor,
    borderBottomWidth: 1,
    borderTopColor: Graphics.form.borderColor,
    borderTopWidth: 1,
    marginBottom: 20
  }
})