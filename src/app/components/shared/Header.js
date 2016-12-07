'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import MoreLink from './MoreLink'
import TextView from './TextView'

const Header = (props) => {
  let moreLink = (props.more === undefined || props.more === null) ? null : <MoreLink text={props.more.text} onPress={props.more.onPress} />

  return (
    <View style={styles.wrapper}>
      <TextView class={'h1'} text={props.text} />
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