'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import {phonecall} from 'react-native-communications'

import TextView from '../shared/TextView'

import {
  Graphics
} from '../../settings'

const SimpleContact = (props) => {
  const phoneNumber = props.number.toString(),
    fontSize = props.fontSize || 'M'

  let alt = null

  if (props.alt && props.alt.length > 0) {
    alt = (
      <View style={styles.alt}>
        <TextView
          fontSize={fontSize}
          text={props.alt}
        />
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.label}>
        <TextView
          fontSize={fontSize}
          text={props.label}
        />
      </View>
      {alt}
      <View style={styles.value}>
        <TouchableOpacity onPress={() => phonecall(phoneNumber, true)}>
          <TextView
            fontSize={fontSize}
            textColor={Graphics.textColors.mobileNumber}
            text={phoneNumber}
          />
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
    width: 120
  },
  alt: {
    marginHorizontal: 15
  },
  value: {
    flex: 1,
    alignItems: 'flex-end'
  }
})

SimpleContact.propTypes = {
  label: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  alt: PropTypes.string,
  fontSize: PropTypes.string
}

export default SimpleContact