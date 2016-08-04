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
    path = (props.type || props.type === 0) ? Graphics.glyphs[props.type.toString()] : (props.pictogram ? props.pictogram : null),
    sideLength = props.sideLength ? parseInt(props.sideLength) : Graphics.icon.sideLength,
    scale = sideLength / Graphics.icon.sideLength * Graphics.icon.scale,
    margin = sideLength * (1 - Graphics.icon.scale) / 2,
    styles = StyleSheet.create({
      wrapper: {
        alignItems: 'center',
        flexDirection: 'column'
      },
      circle: {
        alignItems: 'center',
        backgroundColor: Graphics.colors.primary,
        borderRadius: sideLength / 2,
        flexDirection: 'row',
        height: sideLength,
        justifyContent: 'center',
        overflow: 'hidden',
        width: sideLength
      },
      svg: {
        left: margin,
        top: margin 
      }
    })

  return (
    <View style={styles.wrapper}>
      <View style={[styles.circle, backgroundColor]}>
        <Svg width={sideLength} height={sideLength} style={styles.svg}>
          <Path scale={scale} fill={fillColor} d={path} />
        </Svg>
      </View>
      {label}
      {value}
    </View>
  )  
}

export default Icon