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
  TouchableOpacity,
  View
} from 'react-native'

import global from '../../styles/global'
import Avatar from '../shared/Avatar'
import Next from '../shared/Next'

const UserLink = (props) => {
  const onPress = () => {
    props.navigator.push({
      id: 'UserDetail',
      title: props.user.handle,
      passProps: {
        id: props.user.id
      }
    })
  },
  next = (props.showArrow) ? (
    <View style={styles.nextArrow}>
      <Next fill={AppSettings.color.darkGray} fill={AppSettings.color.midGray} />
    </View>
  ) : null

  return (
    <TouchableOpacity style={global.flex} onPress={onPress}>
      <View style={styles.userLink}>
        <View style={styles.userAvatar}>
          <Avatar user={props.user} onPress={null} />
        </View>
        <View>
          <Text style={[global.pretitle, {color: AppSettings.color.gold}]}>
            {Lang.userLevelArray[parseInt(props.user.level)]}
          </Text>
          <Text style={global.title}>{props.user.handle}</Text>
        </View>
        <View style={styles.misc}>
        </View>
        {next}
      </View>
    </TouchableOpacity>
  )
}

UserLink.propTypes = {
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  showArrow: PropTypes.bool
}

const styles = StyleSheet.create({
    userLink: {
      alignItems: 'flex-start',
      flex: 1,
      flexDirection: 'row',
    },
    userAvatar: {
      marginRight: 10
    },
    misc: {
      flex: 1,
    },
    nextArrow: {
      marginTop: 18,
      marginLeft: 10
    }
  }
)

export default UserLink