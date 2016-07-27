'use strict'

import {
  AppSettings
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

export const NavbarIconButton = (props) => {
  let label = null

  if (props.showLabel === true) {
    label = <Text style={styles.buttonText}>{props.label}</Text>
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Image style={styles.buttonIcon} source={{uri: props.icon, scale: 3}} />
        {label}
      </View>
    </TouchableOpacity>
  )
}

NavbarIconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool.isRequired
}

export const NavbarTextButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  )
}

NavbarTextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 10,
  },
  buttonIcon: {
    height: 20,
    width: 20,
    tintColor: AppSettings.color.textOverlay,
  },
  buttonText: {
    color: AppSettings.color.textOverlay,
    fontSize: 17,
    marginVertical: 1
  },
})