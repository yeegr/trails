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

import Svg, {
  Path
} from 'react-native-svg'

import Avatar from './Avatar'
import Next from './Next'
import styles from '../../styles/main'

const EditLink = (props) => {
  let value = null

  if (props.user) {
    value = <Avatar user={props.user} />
  } else if (props.value) {
    value = (
      <Text numberOfLines={1} lineBreakMode="tail" style={styles.editor.valueText}>
        {props.value}
      </Text>
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
          <Text style={required}>
            {props.label}
          </Text>
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