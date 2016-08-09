'user strict'

import {Graphics} from '../settings'
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.colors.background,
    flex: 1
  },
  main: {
    padding: 10,
  },
  grid: {
    alignItems: 'flex-start',
    borderBottomColor: Graphics.colors.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  button: {
    marginBottom: 10,
    marginHorizontal: 5
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginTop: 20,
    padding: 10,
    textAlign: 'center'
  },
  close: {
    height: Graphics.icon.sideLength,
    right: 15,
    top: 30,
    position: 'absolute',
    width: Graphics.icon.sideLength
  }
})