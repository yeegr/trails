'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import Avatar from './Avatar'

const AvatarList = (props) => {
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

AvatarList.propTypes = {
  users: PropTypes.array,
  size: PropTypes.string
}

export default AvatarList