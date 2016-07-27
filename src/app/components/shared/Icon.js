'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Svg, {
  Path,
  Rect,
  Circle
} from 'react-native-svg'

const Icon = (props) => {
  let label = (props.label) ? (<Text style={styles.iconLabel}>{props.label}</Text>) : null,
    value = (props.value) ? (<Text style={styles.iconValue}>{props.value}</Text>) : null,
    backgroundColor = (props.backgroundColor) ? {backgroundColor: props.backgroundColor} : null,
    fill = (props.fillColor) ? props.fillColor : AppSettings.color.iconOverlay,
    path = (props.type || props.type === 0) ? Graphics.glyph[props.type.toString()] : (props.pictogram ? props.pictogram : null),
    length = Graphics.iconSide * Graphics.iconScale

  return (
    <View style={styles.icon}>
      <View style={[styles.iconCircle, backgroundColor]}>
        <Svg width={length} height={length}>
          <Path scale={Graphics.iconScale} fill={fill} d={path} />
        </Svg>
      </View>
      {label}
      {value}
    </View>
  )  
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: AppSettings.color.primary,
    borderRadius: Graphics.iconSide / 2,
    height: Graphics.iconSide,
    justifyContent: 'center',
    overflow: 'hidden',
    width: Graphics.iconSide,
  },
  iconLabel: {
    color: AppSettings.color.darkGray,
    fontSize: 10,
    marginTop: 5,
  },
  iconValue: {
    color: AppSettings.color.foreground,
    fontSize: 10,
    marginTop: 2,
  }
})

export default Icon