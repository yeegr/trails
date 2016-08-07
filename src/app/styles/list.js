'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10
  },
  thumb: {
    height: 80,
    marginRight: 10,
    width: 120
  },
  content: {
    flex: 1
  },
  title: {
    marginBottom: 5
  }
})