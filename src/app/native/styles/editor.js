'user strict'

import {
  Graphics
} from '../settings'

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  scroll: {
    flex: 1,
    paddingTop: Graphics.page.marginTop + 20,
  },
  list: {
    flex: 1,
    paddingTop: Graphics.page.marginTop,
  },
  section: {
    marginBottom: 20
  },
  separator: {
    backgroundColor: Graphics.colors.midGray,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  group: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Graphics.colors.border,
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Graphics.colors.border,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },
  icon: {
    marginRight: 2
  },
  link: {
    alignItems: 'center',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Graphics.colors.border,
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 5,
  },
  valueText: {
    color: Graphics.colors.midGray,
    textAlign: 'right',
    width: 120
  },
  more: {
    marginRight: 15,
    alignSelf: 'center',
  },
  textInput: {
    backgroundColor: Graphics.colors.transparent,
    color: Graphics.colors.midGray,
    fontSize: 16,
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textClear: {
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  numberInput: {
    color: Graphics.colors.midGray,
    marginRight: 2,
    textAlign: 'right',
    textAlignVertical: 'bottom',
    height: 18,
    width: 120
  },

  currencyPrefix: {
    paddingBottom: 3
  },
  currencyPostfix: {
    paddingBottom: 3
  },

  numberButton: {
    alignItems: 'center',
    borderColor: Graphics.colors.primary,
    borderWidth: 1,
    flexDirection: 'row',
    height: 20, 
    justifyContent: 'center',
    marginHorizontal: 5,
    width: 20,
  },
  numberButtonLeft: {
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  },
  numberButtonRight: {
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
  },
  numberButtonText: {
    color: Graphics.colors.primary,
    lineHeight: 14
  },

  ring: {
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 3,
    flexDirection: 'column',
    height: 100,
    justifyContent: 'center',
    width: 100, 
  }
})