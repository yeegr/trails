'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import TextView from './TextView'
import {Graphics} from '../../settings'

const Icon = (props) => {
  let label = (props.label) ? (
      <TextView 
        fontSize='XS'
        textColor={Graphics.icon.labelColor}
        style={{marginTop: 5}}
        text={props.label}
      />
    ) : null,
    value = (props.value) ? (
      <TextView 
        fontSize='XS'
        textColor={Graphics.icon.valueColor}
        style={{marginTop: 2}}
        text={props.value.toString()}
      />
    ) : null,
    backgroundColor = (props.backgroundColor) ? {backgroundColor: props.backgroundColor} : null,
    fillColor = (props.fillColor) ? props.fillColor : Graphics.icon.overlayColor,
    path = (props.type || props.type === 0) ? Graphics.glyph[props.type.toString()] : (props.pictogram ? props.pictogram : null),
    sideLength = Graphics.icon.sideLength * Graphics.icon.scale

  return (
    <View style={styles.wrapper}>
      <View style={[styles.circle, backgroundColor]}>
        <Svg width={sideLength} height={sideLength}>
          <Path scale={Graphics.icon.scale} fill={fillColor} d={path} />
        </Svg>
      </View>
      {label}
      {value}
    </View>
  )  
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
  },
  circle: {
    alignItems: 'center',
    backgroundColor: Graphics.colors.primary,
    borderRadius: Graphics.icon.sideLength / 2,
    height: Graphics.icon.sideLength,
    justifyContent: 'center',
    overflow: 'hidden',
    width: Graphics.icon.sideLength,
  }
})

export default Icon