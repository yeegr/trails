'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Image,
  StyleSheet,
  View
} from 'react-native'

import {
  AppSettings,
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
    })

  return (props.user) ? (
    <Image
      style={styles.avatar}
      source={{uri: AppSettings.assetUri + 'users/' + props.user.avatar}}
    />
  ) : null
}

Avatar.propTypes = {
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  user: PropTypes.object
}

export const AvatarList = (props) => {
  let margin = 10

  if (props.size) {
    switch (props.size) {
      case 'SML':
        margin = 5
      break

      case 'L':
        margin = 10
      break

      case 'XL':
        margin = 15
      break
    }
  }

  const styles = StyleSheet.create({
      avatar: {
        marginRight: margin
      }
    })

  return (props.users) ? (
    <View style={{flexDirection: 'row'}}>
      {
        props.users.map((user, index) => {
          return (
            <View key={index} style={styles.avatar}>
              <Avatar size={props.size} user={user} />
            </View>
          )
        })
      }
    </View>
  ) : null
}


export default Avatar