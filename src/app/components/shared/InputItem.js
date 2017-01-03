'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import TextView from './TextView'

import {
  LANG,
  Graphics
} from '../../settings'

const InputItem = (props) => {
  const inputStyle = (props.inputStyle) ? styles[props.inputStyle] : null

  return (
    <View style={[styles.wrapper, (props.styles && props.styles.wrapper) ? props.styles.wrapper : null]}>
      <View style={styles.label}>
        <TextView
          textColor={(props.required) ? Graphics.textColors.required : Graphics.textColors.foreground}
          text={LANG.t('prompt', {label: props.label})}
        />
      </View>
      <View style={[styles.input, inputStyle]}>
        {props.input}
      </View>
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  label: {
    width: 100
  },
  input: {
    flex: 1,
    height: 30
  },
  underline: {
    borderBottomColor: Graphics.colors.midGray,
    borderBottomWidth: 1
  }
})

InputItem.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  required: PropTypes.bool,
  styles: PropTypes.object,
  inputStyle: PropTypes.string
}

export default InputItem