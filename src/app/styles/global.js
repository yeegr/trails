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
    backgroundColor: AppSettings.color.background,
  },
  main: {
    flex: 1,
    paddingTop: 64,
  },
  pretitle: {
    color: AppSettings.color.midGray,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
  title: {
    color: AppSettings.color.foreground,
    fontSize: 16,
    marginTop: 6,
  },
  subtitle: {
    color: AppSettings.color.midGray,
    fontSize: 12,
    marginTop: 4,
  },



  flex: {
    flex: 1,
    flexDirection: 'row'
  },
  grid: {
    marginRight: 10
  },
  map: {
    backgroundColor: AppSettings.color.lightGray,
    height: 360,
  },
})