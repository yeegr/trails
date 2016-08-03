'use strict'

import {
  AppSettings,
  Graphics,
  Lang
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import Avatar from '../shared/Avatar'
import TextView from '../shared/TextView'

const TinyUser = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.avatar}>
        <Avatar user={props.user} size='SML' />
      </View>
      <View>
        <Text style={styles.handle}>{props.user.handle}</Text>
      </View>
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  avatar: {
    marginRight: 5
  },
  handle: {
    color: AppSettings.color.textOverlay
  }
})

TinyUser.propTypes = {
  user: PropTypes.object.isRequired
}

export default TinyUser