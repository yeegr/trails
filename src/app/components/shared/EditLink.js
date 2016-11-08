'use strict'

import React, {
  PropTypes
} from 'react'

import {
  TouchableOpacity,
  View
} from 'react-native'

import Avatar from './Avatar'
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
  } else if (props.value) {
    value = (
      <TextView
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{textAlign: 'right', width: 120}}
        text={props.value.toString()}
      />
    )
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