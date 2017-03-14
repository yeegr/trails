'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import TextView from './TextView'

import {
  Graphics
} from '../../../../common/__'

const NavbarButton = (props) => {
  let label = (
    <TextView
      styles={{fontWeight: '500'}}
      fontSize={'XL'}
      textColor={Graphics.textColors.overlay}
      text={props.label}
    />
  ),
  icon = (props.icon) ? <Image
    style={styles.buttonIcon}
    source={{uri: props.icon, scale: 3}}
  /> : null

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        {icon}
        {(props.icon === undefined || props.showLabel === true) ? label : null}
      </View>
    </TouchableOpacity>
  )
},

styles = StyleSheet.create({
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

NavbarButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  icon: PropTypes.string,
}

export default NavbarButton