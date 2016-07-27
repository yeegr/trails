'use strict'

import {
  AppSettings,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

const Avatar = (props) => {
  let side = (props.side) ? props.side : Graphics.iconSide,
    styles = StyleSheet.create({
      avatar: {
        backgroundColor: (props.bgColor) ? props.bgColor : AppSettings.color.lightGray,
        borderRadius: (props.side) ? props.side / 2 : Graphics.iconSide / 2,
        height: side,
        width: side,
      }
    }),
    image = (props.user) ? (
      <Image
        style={styles.avatar}
        source={{uri: AppSettings.assetUri + 'users/' + props.user.avatar}}
      />
    ) : null,
    wrapper = (props.onPress || props.navigator) ? (
      <TouchableOpacity style={styles.avatar} onPress={props.onPress}>{image}</TouchableOpacity>
    ) : image

  return wrapper
}

Avatar.propTypes = {
  bgColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  user: PropTypes.object,
  onPress: PropTypes.func
}

export default Avatar