'use strict'

import React, {
  PropTypes
} from 'react'

import {
  TouchableOpacity,
  View
} from 'react-native'

import Avatar from './Avatar'
import Icon from './Icon'
import Next from './Next'
import TextView from './TextView'

import styles from '../../styles/main'

import {
  Graphics
} from '../../settings'

const EditLink = (props) => {
  let value = null

  if (props.user) {
    value = <Avatar user={props.user} />
  } else if (props.value !== undefined) {
    if (props.value === true) {
      value = (
        <Icon 
          backgroundColor={Graphics.colors.transparent} 
          fillColor={Graphics.colors.primary} 
          sideLength={24}
          type={'checkmark'}
        />
      )
    } else if (props.value === false) {
      value = (
        <Icon 
          backgroundColor={Graphics.colors.transparent} 
          fillColor={Graphics.colors.primary} 
          sideLength={24}
          type={'close'}
        />
      )
    } else if (props.value !== null) {
      value = (
        <TextView
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{textAlign: 'right', width: 120}}
          text={props.value.toString()}
        />
      )
    }
  }

  const textColor = (props.validated) ? Graphics.colors.primary : (
    (props.required) ? Graphics.textColors.required : Graphics.textColors.foreground
  ) 

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.editor.link}>
        <View style={styles.editor.label}>
          <TextView
            textColor={textColor}
            text={props.label}
          />
        </View>
        <View style={styles.editor.value}>
          {value}
        </View>
        <Next path={Graphics.arrow.next} fill={Graphics.arrow.fill} />
      </View>
    </TouchableOpacity>
  )
}

EditLink.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  required: PropTypes.bool,
  user: PropTypes.object,
  validated: PropTypes.bool
}

export default EditLink