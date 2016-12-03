'user strict'

import {StyleSheet} from 'react-native'
import {Graphics} from '../settings'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.colors.background,
    flex: 1,
    flexDirection: 'column',
  },
  scroll: {
    flex: 1,
    marginTop: Graphics.page.marginTop
  },
  section: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 15
  },
  expand: {
    paddingRight: 5
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  }
})