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
  View
} from 'react-native'

import TextView from './TextView'
import styles from '../../styles/main'

const InfoItem = (props) => {
  let align = (props.align) ? {textAlign: props.align} : null,
    colon = (props.noColon) ? '' : '：'

  return (
    <View style={styles.detail.infoRow}>
      <View style={styles.detail.label}>
        <TextView text={props.label + colon} />
      </View>
      <View style={styles.detail.value}>
        <TextView style={align} text={props.value} />
      </View>
    </View>
  )
}

export default InfoItem