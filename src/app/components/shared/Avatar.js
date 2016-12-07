'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Image,
  StyleSheet
} from 'react-native'

import ImagePath from './ImagePath'

import {
  Graphics
} from '../../settings'

const Avatar = (props) => {
  const sideLength = (props.size) ? Graphics.avatar[props.size] : Graphics.avatar.default,
    backgroundColor = props.backgroundColor || Graphics.avatar.backgroundColor,
    borderColor = props.borderColor || Graphics.avatar.borderColor,
    borderWidth = props.borderWidth || 0,
    styles = StyleSheet.create({
      avatar: {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderRadius: sideLength / 2,
        borderWidth: borderWidth,
        height: sideLength,
        width: sideLength
      }
    }),
    path = (props.user.avatar === 'default.jpg') ? 'users/default.jpg' : 'users/' + props.user._id + '/' + props.user.avatar, 
    url = ImagePath({type: 'avatar', path: path})

  return (props.user) ? (
    <Image
      style={styles.avatar}
      source={{uri: url}}
    />
  ) : null
}

Avatar.propTypes = {
  user: PropTypes.object,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number, 
  height: PropTypes.number,
  width: PropTypes.number,
  size: PropTypes.string
}

export default Avatar