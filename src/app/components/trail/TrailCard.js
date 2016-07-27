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
  TouchableOpacity,
  View
} from 'react-native'

import styles from '../../styles/main'
import TrailInfo from './TrailInfo'
import TrailData from './TrailData'
import TrailMap from './TrailMap'
import Toolbar from '../shared/Toolbar'
import UserLink from '../user/UserLink'

const TrailCard = (props) => {
  const {trail, navigator} = props,
    gotoDetailPage = () => {
      props.navigator.push({
        id: 'TrailDetail',
        title: Lang.TrailDetail,
        passProps: {
          id: trail.id
        }
      })
    }

  return (
    <View style={[styles.list.item, styles.list.card]}>
      <TouchableOpacity onPress={() => gotoDetailPage()}>
        <TrailInfo type={trail.type} title={trail.title} date={trail.date}/>
      </TouchableOpacity>
      <TrailData difficultyLevel={trail.difficultyLevel}
        totalDuration={trail.totalDuration}
        totalDistance={trail.totalDistance}
        totalElevation={trail.totalElevation}
        maximumAltitude={trail.maximumAltitude}
        averageSpeed={trail.averageSpeed}
      />
      <View style={styles.global.map}>
        <TrailMap points={trail.points} />
      </View>
      <View style={styles.list.itemFooter}>
        <UserLink user={trail.creator} navigator={navigator} />
      </View>
    </View>
  )
}

TrailCard.propTypes = {
  trail: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

export default TrailCard