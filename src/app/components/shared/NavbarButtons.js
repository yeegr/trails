'use strict'

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

import TextView from './TextView'
import {Graphics} from '../../settings'

export const NavbarIconButton = (props) => {
  let label = null

  if (props.showLabel === true) {
    label = <TextView styles={{fontWeight: '500'}} fontSize='XL' textColor={Graphics.textColors.overlay} text={props.label} />
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

export const NavbarTextButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <TextView styles={{fontWeight: '500'}} fontSize='XL' textColor={Graphics.textColors.overlay} text={props.label} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 9,
    paddingTop: 7,
  },
  buttonIcon: {
    height: 20,
    width: 20,
    tintColor: Graphics.textColors.overlay,
  },
  buttonText: {
    color: Graphics.textColors.overlay,
    fontSize: 17,
    marginVertical: 1
  },
})


NavbarIconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool.isRequired
}
NavbarTextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}