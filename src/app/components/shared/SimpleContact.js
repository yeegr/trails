'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Communications from 'react-native-communications'

import TextView from '../shared/TextView'
import {Graphics} from '../../settings'

const SimpleContact = (props) => {
  const phoneNumber = props.number.toString(),
  fontSize = props.fontSize || 'M'

  return (
    <View style={styles.wrapper}>
      <View style={styles.label}>
        <TextView fontSize={fontSize} text={props.label} />
      </View>
      <View style={styles.value}>
        <TouchableOpacity onPress={() => Communications.phonecall(phoneNumber, true)}>
          <TextView fontSize={fontSize} textColor={Graphics.textColors.mobileNumber} text={phoneNumber} />
        </TouchableOpacity>
      </View>
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
  },
  value: {
    flex: 1,
    alignItems: 'flex-end'
  }
})

SimpleContact.propTypes = {
  label: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
}

export default SimpleContact