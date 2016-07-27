'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  tab: {
    backgroundColor: 'transparent',
    borderLeftWidth: 4,
    borderColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 80,
    width: 80,
  },
  icon: {
    marginTop: 15,
    marginBottom: 10
  },
  label: {
    fontSize: 12,
  }
})