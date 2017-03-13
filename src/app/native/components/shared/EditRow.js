'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import TextView from './TextView'

import styles from '../../styles/main'

import {
  Graphics
} from '../../settings'

const EditRow = (props) => {
  const textColor = (props.validated) ? Graphics.colors.primary : (
    (props.required) ? Graphics.textColors.required : Graphics.textColors.foreground
  ) 

  return (
    <View style={styles.editor.link}>
      <View style={styles.editor.label}>
        <TextView
          textColor={textColor}
          text={props.label}
        />
      </View>
      <View style={styles.editor.value}>
        {props.input}
      </View>
    </View>
  )
}

EditRow.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  required: PropTypes.bool,
  validated: PropTypes.bool
}

export default EditRow