'use strict'


import React, {PropTypes} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {Graphics} from '../../settings'
import TextView from './TextView'

const TextButton = (props) => {
  let buttonStyle = styles.button

  if (props.styles && props.styles.button) {
    buttonStyle = Object.assign({}, styles.button, props.styles.button)
  }  

  if (props.styles && props.styles.buttonText) {
    buttonStyle = Object.assign({}, styles.buttonText, props.styles.buttonText)
  }

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <View style={[buttonStyle, {
        backgroundColor: props.disabled ? Graphics.colors.midGray : (Graphics.colors.primary || props.backgroundColor)
      }]}>
        <TextView
          style={{textAlign: 'center'}}
          fontWeight={'400'}
          textColor={props.disabled ? Graphics.textColors.disabled : (Graphics.textColors.overlay || props.textColor)}
          text={props.text}
        />
      </View>
    </TouchableOpacity>
  )
},
styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginVertical: 10,
    width: 200,
  }
})

TextButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  style: PropTypes.object
}

export default TextButton