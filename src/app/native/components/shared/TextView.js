'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text
} from 'react-native'

import {
  Graphics
} from '../../settings'

const TextView = (props) => {
  const type = (props.class) || 'text',
    fontFamily = {fontFamily: (props.fontFamily || Graphics.fontStyles.default)},
    fontWeight = (props.fontWeight) ? {fontWeight: props.fontWeight} : null,
    fontSize = {fontSize: Graphics.fontSizes[props.fontSize || 'default']},
    textColor = {color: (props.textColor || Graphics.textColors.default)},
    backgroundColor = {backgroundColor: Graphics.colors.transparent},
    baseStyles = Object.assign({}, backgroundColor, props.style, fontFamily, fontSize, fontWeight, textColor),
    styles = StyleSheet.create({
      text: baseStyles,
      title: Object.assign({}, baseStyles, fontWeight, {
        fontSize: Graphics.fontSizes.L
      }),
      h1: Object.assign({}, baseStyles, {
        color: Graphics.colors.primary,
        fontSize: Graphics.fontSizes.XXL,
        fontWeight: '400'
      }),
      h2: Object.assign({}, baseStyles, {
        color: Graphics.textColors.h2,
        fontSize: Graphics.fontSizes.L,
        fontWeight: '400',
        marginBottom: 10,
        marginHorizontal: 15
      }),
      h3: Object.assign({}, baseStyles, {
        color: Graphics.textColors.h3,
        fontSize: Graphics.fontSizes.M,
        fontWeight: '400',
        marginBottom: 10,
        marginHorizontal: 15
      }),
      h4: Object.assign({}, baseStyles, {
        color: Graphics.textColors.h4,
        fontSize: Graphics.fontSizes.SML,
        fontWeight: '400',
        marginRight: 10
      }),
      h5: Object.assign({}, baseStyles, {
        color: Graphics.textColors.h5,
        fontSize: Graphics.fontSizes.SML,
        fontWeight: '400',
      }),
      h6: Object.assign({}, baseStyles, {
        color: Graphics.textColors.h6,
        fontSize: Graphics.fontSizes.XS,
        fontWeight: '400',
      })
    }),
    ellipsizeMode = props.ellipsizeMode || 'tail',
    numberOfLines = props.numberOfLines || 1

  let view = (props.multiLine === true) ? (
    <Text style={styles[type]}>
      {props.text}
    </Text>
  ) : (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={styles[type]}
    >
      {props.text}
    </Text>
  )

  return view
}

TextView.propTypes = {
  text: PropTypes.string.isRequired,
  class: PropTypes.string,
  ellipsizeMode: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  numberOfLines: PropTypes.number,
  multiLine: PropTypes.bool,
  textColor: PropTypes.string,
  style: PropTypes.object
}

export default TextView