'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

import TextView from './TextView'
import MoreLink from './MoreLink'

const Header = (props) => {
  let moreLink = (props.more === undefined || props.more === null) ? null : <MoreLink text={props.more.text} onPress={props.more.onPress} />

  return (
    <View style={styles.wrapper}>
      <TextView class='h1' text={props.text} />
      <View style={styles.misc}>
        {props.misc}
      </View>
      {moreLink}
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  misc: {
    alignItems: 'flex-start',
    flex: 1,
    marginHorizontal: 10,
  }
})

Header.propTypes = {
  text: PropTypes.string.isRequired,
  misc: PropTypes.object,
  more: PropTypes.object
}

export default Header