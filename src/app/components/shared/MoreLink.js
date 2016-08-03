'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import TextView from './TextView'
import Next from './Next'
import {Graphics} from '../../settings'

const MoreLink = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.link}>
        <TextView textColor={Graphics.colors.primary} text={props.text} />
        <Next />
      </View>
    </TouchableOpacity>
  )
},
styles = StyleSheet.create({
  link: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

MoreLink.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default MoreLink