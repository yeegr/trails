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
  View
} from 'react-native'

import Avatar from '../shared/Avatar'

const TinyUser = (props) => {
  return (
    <View style={styles.userLink}>
      <Avatar user={props.user} onPress={null} />
      <View>
        <Text style={[global.pretitle, {color: AppSettings.color.gold}]}>
          {Lang.userLevelArray[parseInt(props.user.level)]}
        </Text>
        <Text style={global.title}>{props.user.handle}</Text>
      </View>
      <View style={styles.misc}>
      </View>
    </View>
  )
},
styles = StyleSheet.create({
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
})

TinyUser.propTypes = {
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  showArrow: PropTypes.bool
}

export default TinyUser