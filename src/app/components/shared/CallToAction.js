'use strict'

import {
  AppSettings
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {hex2rgb} from '../../../common'

const CallToAction = (props) => {
  let bgColor = {},
    txtColor = {},
    disabledBgColor = {},
    disabledTextColor = {}

  if (props.disabled) {
    disabledBgColor = {backgroundColor: hex2rgb(AppSettings.color.primary, .8)}
    disabledTextColor = {color: AppSettings.color.midGray}
  }

  if (props.backgroundColor && props.backgroundColor.length > 0) {
    bgColor = {backgroundColor: props.backgroundColor}

    if (props.disabled) {
      disabledBgColor = {backgroundColor: hex2rgb(props.backgroundColor, .8)}
    }
  }

  if (props.foregroundColor && props.foregroundColor.length > 0) {
    txtColor = {color: props.foregroundColor}
  }

  let view = (
    <View style={[styles.button, bgColor, disabledBgColor]}>
      <Text style={[styles.label, txtColor, disabledTextColor]}>{props.label}</Text>
    </View>
  )

  if (props.disabled) {
    return view
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
    {view}
    </TouchableOpacity>
  )
}

CallToAction.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  backgrondColor: PropTypes.string,
  foregroundColor: PropTypes.string,
  disabled: PropTypes.bool
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center', 
    backgroundColor: '#f00',
    flex: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
  },
  label: Object.assign({},
    AppSettings.textStyles.extraLarge,
    {
      color: AppSettings.color.textOverlay,
      fontWeight: '500'
    })
})

export default CallToAction