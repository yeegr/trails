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
  Circle,
  Path
} from 'react-native-svg'

import TextView from './TextView'
import {Graphics} from '../../settings'

const Icon = (props) => {
  let icon = Graphics.icon,
  labelColor = props.labelColor || icon.textColor,
  valueColor = props.valueColor || icon.textColor,
  path = (props.type || props.type === 0) ? Graphics.glyphs[props.type.toString()] : (props.path || null),
  sideLength = (props.sideLength) ? parseInt(props.sideLength) : icon.sideLength,
  viewBox = props.viewBox || icon.viewBox,
  scale = (props.scale || icon.scale) * (sideLength / viewBox),
  radius = sideLength / 2,
  margin = sideLength * (1 - (props.scale || icon.scale)) / 2,
  backgroundColor = props.backgroundColor || Graphics.colors.primary,
  fillColor = props.fillColor || icon.overlayColor,
  background = <Circle cx={radius} cy={radius} r={radius} fill={backgroundColor} />,
  height = (label || value) ? null : sideLength,

  buttonStyles = (props.stack === 'vertical') ? styles.buttonVertical : styles.buttonHorizontal,
  labelStyles = (props.stack === 'vertical') ? vertical.label: horizontal.label,
  valueStyles = (props.stack === 'vertical') ? vertical.value: horizontal.value,

  label = (props.label && props.showLabel) ? (
    <TextView
      style={labelStyles}
      fontSize='XS'
      fontWeight='bold'
      textColor={labelColor}
      text={props.label}
    />
  ) : null,
  value = (props.value !== undefined) ? (
    <TextView
      style={valueStyles}
      fontSize={(props.stack === 'vertical') ? 'XS' : 'S'}
      textColor={valueColor}
      text={props.value.toString()}
    />
  ) : null

  return (
    <View style={buttonStyles}>
      <View style={{height: sideLength, width: sideLength}}>
        <Svg width={sideLength} height={sideLength}>
          <Circle cx={radius} cy={radius} r={radius} fill={backgroundColor} />
          <Path x={margin} y={margin} scale={scale} fill={fillColor} d={path} />
        </Svg>
      </View>
      {label}
      {value}
    </View>
  )  
},
styles = StyleSheet.create({
  buttonHorizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 5,
    height: Graphics.toolbar.icon.sideLength
  },
  buttonVertical: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  value: {
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
}),
horizontal = {
  label: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  value: {
    fontWeight: '400',
    marginLeft: 5
  }
},
vertical = {
  label: {
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'center',
  },
  value: {
    fontWeight: '400',
    marginTop: 2,
    textAlign: 'center',
  }
}


export default Icon