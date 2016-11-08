'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import {
  Graphics
} from '../../settings'

const Rating = (props) => {
  const format = (n) => {
    let m = Math.round(n * 2) / 2 * 10
    return (m < 10) ? '0' + m.toString() : m.toString()
  }

  let type = props.type || 'default', 
    graphics = Graphics.ratings[type],
    fillColor = props.fillColor || graphics.color,
    value = props.value || 0,

  styles = StyleSheet.create({
    wrapper: {
      height: graphics.height,
      width: graphics.width
    },
    layer: {
      position: 'absolute',
      height: graphics.height,
      width: graphics.width
    },
    button: {
      height: graphics.height,
      width: graphics.height
    }
  }),

  stars = (
    <Svg width={graphics.width} height={graphics.height}>
      <Path scale={graphics.scale} fill={fillColor} d={Graphics.ratings[format(value)]} />
    </Svg>
  )

  if (props.onValueChange && props.disabled != false) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.layer}>
          {stars}
        </View>
        <View style={[styles.layer, {flexDirection: 'row'}]}>
          {
            [1,2,3,4,5].map((value) => {
              return (
                <TouchableOpacity
                  key={value}
                  style={styles.button}
                  onPress={() => props.onValueChange(value)}
                />
              )
            })
          }
        </View>
      </View>
    )
  }

  return stars
}

Rating.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string,
  fillColor: PropTypes.string,
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func
}

export default Rating