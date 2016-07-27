'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  scroll: {
    flex: 1,
    paddingTop: 80,
  },
  group: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: AppSettings.color.lightGray,
    marginBottom: 15,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },
  link: {
    alignItems: 'center',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: AppSettings.color.lightGray,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  label: {
    flex: 1,
    alignSelf: 'center',
  },
  value: {
    alignItems: 'center',
    flex: 0,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 5,
  },
  valueText: {
    color: AppSettings.color.midGray,
    textAlign: 'right',
    width: 200
  },
  more: {
    marginRight: 15,
    alignSelf: 'center',
  },
  textInput: {
    backgroundColor: AppSettings.color.inputBackground,
    color: AppSettings.color.midGray,
    fontSize: 16,
    height: 44.5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  numberInput: {
    color: AppSettings.color.midGray,
    marginRight: 2,
    textAlign: 'right',
    textAlignVertical: 'bottom',
    height: 18,
    width: 120
  },
  endnote: {
    color: AppSettings.color.darkGray,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },

  currencyPrefix: {
    paddingBottom: 3
  },
  currencyPostfix: {
    paddingBottom: 3
  },


  mainButton: {
    alignItems: 'center', 
    backgroundColor: '#f00',
    flex: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
  },
  mainButtonText: Object.assign({},
    AppSettings.textStyles.extraLarge,
    {
      color: AppSettings.color.textOverlay,
      fontWeight: '500'
    }),
})