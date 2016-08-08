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
    height: 100,
    marginRight: 10,
    width: 150,
    resizeMode: 'cover'
  },
  content: {
    flex: 1
  },
  title: {
    marginVertical: 5
  },
  header: {
    backgroundColor: Graphics.colors.primary,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  row: {
    marginHorizontal: 15,
    marginBottom: 10
  }
})