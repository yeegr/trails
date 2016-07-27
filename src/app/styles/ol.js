'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  listNumber: {
    flex: 0,
    marginRight: 10,
    textAlign: 'right',
    width: 30,
  },
  listContent: {
    flex: 1
  }
})