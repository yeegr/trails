'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {StyleSheet} from 'react-native'

import {hex2rgb} from '../../common'

export default StyleSheet.create({
  appearance: {
    backgroundColor: hex2rgb(AppSettings.color.primary, .8)
  },
  toolbar: {
    flexDirection: 'row',
  },
  title: Object.assign({},
    AppSettings.textStyles.extraLarge,
    {
      color: AppSettings.color.textOverlay,
      fontWeight: '500',
      marginVertical: 10,
    })
})