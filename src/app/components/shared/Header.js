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
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

import Next from './Next'

const Header = (props) => {
  let link = (props.more === undefined || props.more === null) ? null : <MoreLink text={props.more.text} onPress={props.more.onPress} />

  return (
    <View style={styles.header}>
      <Text style={styles.h1}>{props.text}</Text>
      <View style={styles.misc}>{props.misc}</View>
      {link}
    </View>
  )
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  misc: PropTypes.object,
  more: PropTypes.object
}

const MoreLink = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.link}>
        <Text style={styles.linkText}>{props.text}</Text>
        <Next />
      </View>
    </TouchableOpacity>
  )
}

MoreLink.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  h1: {
    color: AppSettings.color.primary,
    fontSize: 20,
  },
  misc: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  link: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    right: 0
  },
  linkText: {
    color: AppSettings.color.primary
  }
})

export default Header