'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text
} from 'react-native'

import {Graphics} from '../../settings'

const TextView = (props) => {
  const type = (props.class) || 'text',
    fontFamily = {fontFamily: (props.fontFamily || Graphics.fontStyles.default)},
    fontWeight = (props.fontWeight) ? {fontWeight: props.fontWeight} : null,
    fontSize = {fontSize: Graphics.fontSizes[props.fontSize || 'default']},
    textColor = {color: (props.textColor || Graphics.textColors.default)},
    baseStyles = Object.assign({}, props.style, fontFamily, fontSize, textColor),
    styles = StyleSheet.create({
      text: baseStyles,
      title: Object.assign({}, baseStyles, {
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
      })
    }),
    ellipsizeMode = props.ellipsizeMode || 'tail',
    numberOfLines = props.numberOfLines || 0

  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={styles[type]}
    >
      {props.text}
    </Text>
  )
}

TextView.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  textColor: PropTypes.string,
}

export default TextView