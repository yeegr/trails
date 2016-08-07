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
    backgroundColor: Graphics.colors.background,
    flex: 1,
    flexDirection: 'column',
  },
  scroll: {
    flex: 1,
    marginTop: 64,
  },
  section: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  expand: {
    marginRight: 0
  },
  label: {
    color: 'gray',
    fontSize: 12,
  },
  textInput: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 40,
  },
  grid: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  icon: {
    backgroundColor: Graphics.colors.primary,
    borderRadius: 4,
    height: 48,
    marginRight: 9,
    marginBottom: 9,
    width: 48
  },
  slider: {
    height: 50,
    width: 270
  },
  value: {
    fontSize: 16,
    marginHorizontal: 5,
    textAlign: 'center',
    width: 30,
  }
})