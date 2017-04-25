'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import Svg, {
  Circle,
  Rect,
  Path
} from 'react-native-svg'

import TextView from './TextView'

import {
  Graphics
} from '../../../../common/__'

const Icon = (props) => {
  let icon = Graphics.icon,
    fontSize = props.fontSize || 'XS',
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
    //background = <Circle cx={radius} cy={radius} r={radius} fill={backgroundColor} />,
    //height = (label || value) ? null : sideLength,

    buttonStyles = (props.stack === 'vertical') ? styles.buttonVertical : styles.buttonHorizontal,
    labelStyles = (props.stack === 'vertical') ? vertical.label: horizontal.label,
    valueStyles = (props.stack === 'vertical') ? vertical.value: horizontal.value,

    label = (props.label && props.showLabel) ? (
      <TextView
        style={labelStyles}
        fontSize={fontSize}
        fontWeight={'bold'}
        textColor={labelColor}
        text={props.label}
      />
    ) : null,
    value = (props.value !== undefined) ? (
      <TextView
        style={valueStyles}
        fontSize={(props.stack === 'vertical') ? fontSize : 'S'}
        textColor={valueColor}
        text={props.value.toString()}
      />
    ) : null,
    shape = null

    switch (props.backgroundShape) {
      case 'square':
        shape = (
          <Rect x="3" y="3" width={sideLength - 6} height={sideLength - 6} fill={backgroundColor} />
        )
      break

      case 'rsquare':
        shape = (
          <Rect x="3" y="3" width={sideLength - 6} height={sideLength - 6} fill={backgroundColor} rx={2} ry={2} />
        )
      break

      default:
        shape = (
          <Circle cx={radius} cy={radius} r={radius} fill={backgroundColor} />
        )
      break
    }

  return (
    <View style={buttonStyles}>
      <View style={{borderRadius: 5, height: sideLength, width: sideLength}}>
        <Svg width={sideLength} height={sideLength}>
          {shape}
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

Icon.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  sideLength: PropTypes.number,
  viewBox: PropTypes.number,
  scale: PropTypes.number,
  path: PropTypes.string,
  backgroundShape: PropTypes.string,
  backgroundColor: PropTypes.string,
  fillColor: PropTypes.string,
  labelColor: PropTypes.string,
  valueColor: PropTypes.string,
  stack: PropTypes.string
}

export default Icon