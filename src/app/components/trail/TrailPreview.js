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
  View
} from 'react-native'

import Header from '../shared/Header'
import TrailList from './TrailList'
import styles from '../../styles/main'

const TrailPreview = (props) => {
  const navigator = props.navigator,
    more = {
      text: Lang.MoreTrails,
      data: null,
      onPress: () => {
        navigator.push({
          id: 'TrailList',
          title: props.title,
          passProps: {
            query: props.query
          }
        })
      }
    }

  return (
    <View style={styles.detail.main}>
      <View style={styles.detail.section}>
        <Header text={Lang.Trails} more={more} />
        <View style={styles.detail.content}>
          <TrailList navigator={navigator} trails={props.trails} />
        </View>
      </View>
    </View>
  )
}

TrailPreview.propTypes = {
  trails: PropTypes.array.isRequired,
  navigator: PropTypes.object.isRequired
}

export default TrailPreview