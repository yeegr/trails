'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.colors.background,
    flex: 1
  },
  article: {
    backgroundColor: Graphics.colors.background,
    flex: 1
  },
  section: {
    marginVertical: 15
  },
  content: {
    flex: 1,
    marginBottom: 15
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 5
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  group: {
    backgroundColor: Graphics.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Graphics.colors.border,
    borderTopWidth: 1,
    borderTopColor: Graphics.colors.border,
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: Graphics.colors.tranparent,
    color: Graphics.colors.midGray,
    flex: 1,
    height: 30,
    padding: 5
  }
})