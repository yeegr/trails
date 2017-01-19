'use strict'

import React, {
  PropTypes
} from 'react'

import ImagePath from './ImagePath'

import {
  AppSettings,
  Graphics
} from '../../settings'

const Avatar = (props) => {
  const sideLength = (props.size) ? Graphics.avatar[props.size] : Graphics.avatar.default,
    backgroundColor = props.backgroundColor || Graphics.avatar.backgroundColor,
    borderColor = props.borderColor || Graphics.avatar.borderColor,
    borderWidth = props.borderWidth || '0',
    path = (props.user.avatar === AppSettings.defaultUserAvatar) ? 'users/' + AppSettings.defaultUserAvatar : 'users/' + props.user._id + '/' + props.user.avatar, 
    url = 'url(' + ImagePath({type: 'avatar', path: path}) + ')',
    style = {
      backgroundColor,
      borderColor,
      borderWidth,
      backgroundImage: url,
      height: sideLength,
      width: sideLength
    }

  return (props.user) ? (
    <avatar style={style} />
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