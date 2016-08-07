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
  StyleSheet,
  View
} from 'react-native'

import TextView from './TextView'

const InfoItem = (props) => {
  let align = (props.align) ? {textAlign: props.align} : null,
  colon = (props.noColon) ? '' : Lang.colon,
  value = (typeof(props.value) === 'string') ? (
    <TextView style={align} text={props.value} />
  ) : props.value

  const customStyles = props.styles || null,
  customWrapperStyles = (customStyles) ? (customStyles.wrapper || null) : null

  return (
    <View style={[styles.wrapper, customWrapperStyles]}>
      <View style={styles.label}>
        <TextView text={props.label + colon} />
      </View>
      <View style={styles.value}>
        {value}
      </View>
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  label: {
    width: 100
  },
  value: {
    flex: 1
  }
})

export default InfoItem