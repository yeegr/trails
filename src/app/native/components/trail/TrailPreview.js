'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import Header from '../shared/Header'
import TrailList from './TrailList'

import styles from '../../styles/main'

import {
  LANG
} from '../../../../common/__'

const TrailPreview = (props) => {
  const navigator = props.navigator,
    more = {
      text: LANG.t('area.MoreTrails'),
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
    <View>
      <View style={styles.detail.section}>
        <Header
          text={LANG.t('area.RecommandedTrails')}
          more={more}
        />
        <View style={styles.detail.content}>
          <TrailList
            navigator={navigator}
            trails={props.trails}
            query={props.query}
          />
        </View>
      </View>
    </View>
  )
}

TrailPreview.propTypes = {
  navigator: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  trails: PropTypes.array.isRequired
}

export default TrailPreview