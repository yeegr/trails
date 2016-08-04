'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.colors.background,
    flex: 1,
    flexDirection: 'column',
  },
  article: {
    flex: 1,
    backgroundColor: Graphics.colors.background,
  },
  section: {
    marginVertical: 15,
  },
  content: {
    flex: 1,
    marginBottom: 15,
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


  label: {
    width: 100
  },
  value: {
    flex: 1
  },
  input: {
    borderBottomColor: Graphics.colors.midGray,
    borderBottomWidth: 1,
    flex: 1,
  },
  textInput: {
    backgroundColor: Graphics.textInput.backgroundColor,
    color: Graphics.colors.midGray,
    flex: 1,
    height: 30,
    padding : 5
  },
  infoRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  textRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  infoList: {
    backgroundColor: Graphics.list.backgroundColor,
    borderBottomColor: Graphics.colors.border,
    borderBottomWidth: 1,
    borderTopColor: Graphics.colors.border,
    borderTopWidth: 1,
  }
})