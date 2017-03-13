'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import Avatar from '../shared/Avatar'
import TextView from '../shared/TextView'

import {
  Graphics
} from '../../settings'

const TinyUser = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.avatar}>
        <Avatar user={props.user} size={'SML'} />
      </View>
      <View>
        <TextView
          style={{fontWeight: '400'}}
          textColor={Graphics.textColors.overlay} 
          text={props.user.handle}
        />
      </View>
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  avatar: {
    marginRight: 5
  }
})

TinyUser.propTypes = {
  user: PropTypes.object.isRequired
}

export default TinyUser