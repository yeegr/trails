'use strict'

import {Graphics} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import TextView from './TextView'
import {hex2rgb} from '../../../common'

const CallToAction = (props) => {
  let bgColor = props.backgroundColor || Graphics.colors.primary,
    textColor = props.textColor || Graphics.textColors.overlay,
    backgroundColor = (props.disabled) ? Graphics.colors.disabled : bgColor,
    foregroundColor = (props.disabled) ? Graphics.textColors.disabled : textColor

  let view = (
    <View style={[styles.wrapper, {backgroundColor}]}>
      <TextView
        fontSize='L'
        textColor={foregroundColor} 
        text={props.label}
      />
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
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Graphics.actionBar.height,
    justifyContent: 'center'
  }
})

CallToAction.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  backgrondColor: PropTypes.string,
  textColor: PropTypes.string,
  disabled: PropTypes.bool
}

export default CallToAction