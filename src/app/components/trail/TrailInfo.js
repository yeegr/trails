'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import {formatTime} from '../../../common'

import Icon from '../shared/Icon'
import styles from '../../styles/main'

const TrailInfo = (props) => {
  return (
    <View style={styles.list.itemHeader}>
      <Icon type={props.type.toString()} />
      <View style={styles.detail.hgroup}>
        <Text numberOfLines={2} style={styles.global.title}>{(props.title.length < 1) ? Lang.Unnamed : props.title}</Text>
        <Text style={styles.global.subtitle}>{formatTime(props.date)}</Text>
      </View>
    </View>
  )
}

TrailInfo.propTypes = {
  type: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired
}

export default TrailInfo