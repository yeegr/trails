'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import Next from './Next'
import TextView from './TextView'

import {
  Graphics
} from '../../../../common/__'

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