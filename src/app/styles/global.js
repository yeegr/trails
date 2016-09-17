'user strict'

import {Graphics} from '../settings'
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.colors.background,
    flex: 1,
  },
  home: {
    flex: 1,
    paddingTop: Graphics.page.marginTop
  },
  main: {
    backgroundColor: Graphics.colors.background,
    flex: 1,
    paddingTop: Graphics.page.marginTop
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