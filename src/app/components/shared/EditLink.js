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
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Avatar from './Avatar'
import TextView from './TextView'
import Next from './Next'
import styles from '../../styles/main'

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

  let required = (props.required) ? {color: 'red'} : null,
    arrow = (props.hideArrow) ? null : (
      <Next path={Graphics.arrow.next} fill={Graphics.arrow.fill} />
    )

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.editor.link}>
        <View style={styles.editor.label}>
          <TextView
            style={required}
            text={props.label}
          />
        </View>
        <View style={styles.editor.value}>
          {value}
        </View>
        {arrow}
      </View>
    </TouchableOpacity>
  )
}

EditLink.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  required: PropTypes.bool,
  hideArrow: PropTypes.bool
}

export default EditLink