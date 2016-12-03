'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import TrailInfo from './TrailInfo'
import TrailData from './TrailData'
import TrailMap from './TrailMap'
import UserLink from '../user/UserLink'

import global from '../../styles/global'

import {
  Lang,
  Graphics
} from '../../settings'

const TrailCard = (props) => {
  const {trail, navigator} = props,
    gotoDetailPage = () => {
      navigator.push({
        id: 'TrailDetail',
        title: Lang.TrailDetail,
        passProps: {
          id: trail.id
        }
      })
    }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => gotoDetailPage()}>
        <TrailInfo
          type={trail.type}
          title={trail.title}
          date={trail.date}
        />
      </TouchableOpacity>
      <View style={{marginHorizontal: 5}}>
        <TrailData
          difficultyLevel={trail.difficultyLevel}
          totalDuration={trail.totalDuration}
          totalDistance={trail.totalDistance}
          totalElevation={trail.totalElevation}
          maximumAltitude={trail.maximumAltitude}
          averageSpeed={trail.averageSpeed}
        />
      </View>
      <View style={global.map}>
        <TrailMap points={trail.points} />
      </View>
      <View style={styles.footer}>
        <UserLink user={trail.creator} navigator={navigator} />
      </View>
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.card.backgroundColor,
    borderRadius: 4,
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  footer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10
  }
})

TrailCard.propTypes = {
  navigator: PropTypes.object.isRequired,
  trail: PropTypes.object.isRequired
}

export default TrailCard