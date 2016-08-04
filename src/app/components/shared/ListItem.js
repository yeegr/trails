'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from './Icon'
import TextView from './TextView'
import {Graphics} from '../../settings'

const ListItem = (props) => {
  const value = (typeof(props.value) === 'string') ? (
    <TextView class='title' text={props.value} />
  ) : props.value,

  view = (
    <View style={styles.wrapper}>
      <Icon type={props.icon} />
      <View style={styles.content}>
        <TextView class='h4' text={props.label} />
        {value}
      </View>
    </View>
  )

  if (props.onPress) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        {view}
      </TouchableOpacity>
    )
  }

  return view
},
styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 20
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5
  },
  label: {
    marginBottom: 5
  }
})

export default ListItem