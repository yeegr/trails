'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: AppSettings.color.background,
    flex: 1,
    flexDirection: 'column',
  },
  article: {
    flex: 1,
    backgroundColor: AppSettings.color.background,
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
  h2: {
    color: AppSettings.color.darkGray,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 15,
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
    borderBottomColor: AppSettings.color.midGray,
    borderBottomWidth: 1,
    flex: 1,
  },
  textInput: {
    backgroundColor: AppSettings.color.inputBackground,
    color: AppSettings.color.midGray,
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
    backgroundColor: AppSettings.color.listBackground,
    borderBottomColor: AppSettings.color.lightGray,
    borderBottomWidth: 1,
    borderTopColor: AppSettings.color.lightGray,
    borderTopWidth: 1,
  }
})