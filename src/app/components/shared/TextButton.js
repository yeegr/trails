'use strict'

import {
  AppSettings,
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
  View
} from 'react-native'

const TextButton = (props) => {
  let buttonStyle = styles.button,
    buttonTextStyle = styles.buttonText, 
    buttonDisabledStyle = null,
    buttonTextDisabledStyle = null

  if (props.styles && props.styles.button) {
    buttonStyle = Object.assign({}, styles.button, props.styles.button)
  }  

  if (props.styles && props.styles.buttonText) {
    buttonStyle = Object.assign({}, styles.buttonText, props.styles.buttonText)
  }

  if (props.disabled) {
    buttonDisabledStyle = styles.buttonDisabled,
    buttonTextDisabledStyle = styles.buttonTextDisabled
  }

  if (props.styles && props.styles.buttonDisabled) {
    buttonDisabledStyle = Object.assign({}, styles.buttonDisabled, props.styles.buttonDisabled)
  }  

  if (props.styles && props.styles.buttonTextDisabled) {
    buttonTextDisabledStyle = Object.assign({}, styles.buttonTextDisabled, props.styles.buttonTextDisabled)
  }  

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <View style={[buttonStyle, buttonDisabledStyle]}>
        <Text style={[buttonTextStyle, buttonTextDisabledStyle]}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
},
styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: Graphics.colors.primary,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginVertical: 20,
    width: 200,
  },
  buttonDisabled: {
    backgroundColor: Graphics.colors.midGray, 
    borderColor: Graphics.colors.midGray,
  },
  buttonText: {
    color: Graphics.colors.primary,
    textAlign: 'center'
  },
  buttonTextDisabled: {
    color: '#eeeeee'
  },
})

TextButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default TextButton