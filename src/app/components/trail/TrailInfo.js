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
  StyleSheet,
  View
} from 'react-native'

import Icon from '../shared/Icon'
import TextView from '../shared/TextView'
import {formatTime} from '../../../util/common'

const TrailInfo = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.icon}>
        <Icon type={props.type.toString()} />
      </View>
      <View style={styles.content}>
        <TextView fontSize='L' text={(props.title.length < 1) ? Lang.Unnamed : props.title} />
        <TextView class='h5' text={formatTime(props.date)} />
      </View>
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  icon: {
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5
  }
})

TrailInfo.propTypes = {
  type: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired
}

export default TrailInfo