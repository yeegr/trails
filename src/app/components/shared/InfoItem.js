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
  let align = (props.align) ? {textAlign: props.align} : null,
    colon = (props.noColon) ? '' : '：'

  return (
    <View style={styles.detail.textRow}>
      <Text style={styles.detail.label}>{props.label + colon}</Text>
      <Text style={[styles.detail.value, align]}>{props.value}</Text>
    </View>
  )
}

export default InfoItem