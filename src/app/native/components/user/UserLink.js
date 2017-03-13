'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Avatar from '../shared/Avatar'
import TextView from '../shared/TextView'

import {
  LANG
} from '../../settings'

const UserLink = (props) => {
  const onPress = () => {
    props.navigator.push({
      id: 'UserDetail',
      title: props.user.handle,
      passProps: {
        id: props.user.id
      }
    })
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Avatar user={props.user} />
        <View style={styles.content}>
          <TextView class={'h4'} text={LANG.t('user.levels.' + parseInt(props.user.level).toString())} />
          <TextView fontSize={'L'} text={props.user.handle} />
        </View>
      </View>
    </TouchableOpacity>
  )
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5
  }
})

UserLink.propTypes = {
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

export default UserLink