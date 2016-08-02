'user strict'

import {AppSettings} from '../settings'
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  item: {
    /*
    backgroundColor: AppSettings.color.cardBackground,
    borderBottomColor: AppSettings.color.lightGray,
    borderBottomWidth: 1,
    borderTopColor: AppSettings.color.lightGray,
    borderTopWidth: 1,
    flex: 1,
    marginBottom: 20,
    */
    flex: 1,
  },
  card: {
    backgroundColor: AppSettings.color.cardBackground,
    borderRadius: 4,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginBottom: 20,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  itemHeader: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 15,
  },
  itemFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  }
})