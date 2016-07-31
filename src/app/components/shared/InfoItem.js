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
  View
} from 'react-native'

import styles from '../../styles/main'

const InfoItem = (props) => {
  return (
    <View style={styles.detail.textRow}>
      <Text style={styles.detail.label}>{props.label + '：'}</Text>
      <Text style={styles.detail.value}>{props.value}</Text>
    </View>
  )
}

export default InfoItem