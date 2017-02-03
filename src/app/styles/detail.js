'user strict'

import {Graphics} from '../settings'
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  article: {
    backgroundColor: Graphics.colors.background,
    paddingTop: 20
  },
  toolbar: {
    backgroundColor: Graphics.colors.white,
    borderTopColor: Graphics.colors.lightGray,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  section: {
    marginBottom: 30
  },
  content: {
    marginBottom: 15
  },
  grid: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 0
  },
  icon: {
    marginBottom: 10,
    marginRight: 10
  },
  list: {
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