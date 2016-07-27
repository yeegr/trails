'use strict'

import {
  AppSettings,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {View} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

const Next = (props) => {
  let width = 9,
    height = 12,
    scale = 0.75,
    fill = AppSettings.color.primary,
    path = "M12,8l-8,8l-0.9-0.9L10.3,8l-7-7.1L4.1,0L12,8z"

  if (props.path === Graphics.arrow.next) {
    scale = 1,
    width = Graphics.arrow.width,
    height = Graphics.arrow.height,
    path = Graphics.arrow.next
  }

  if (props.fill) {
    fill = props.fill
  }

  return (
    <View>
      <Svg width={width} height={height}>
        <Path scale={scale} fill={fill} d={path} />
      </Svg>
    </View>
  )
}

Next.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  scale: PropTypes.number,
  fill: PropTypes.string
}

export default Next