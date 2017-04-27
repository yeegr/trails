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
  CONSTANTS,
  LANG,
  Graphics
} from '../../../../common/__'

const TrailCard = (props) => {
  const {navigator, user, trail} = props,
    creator = (typeof(trail.creator) === 'string' && trail.creator === user._id) ? user : trail.creator,

    _nextPage = () => {
      navigator.push({
        id: 'TrailDetail',
        title: LANG.t('trail.TrailDetail'),
        passProps: {
          trail
        }
      })
      
/*      let id = 'EditTrail',
        title = LANG.t('trail.EditTrail'),
        passProps = (trail._id && trail.status !== 'approved' && props.user && trail.creator === props.user.id) ? {
          storeType: CONSTANTS.STORE_TYPES.REMOTE,
          trail
        } : {
          storeType: CONSTANTS.STORE_TYPES.LOCAL,
          trail
        }

      if (trail._id && trail.status === 'approved') {
        id = 'TrailDetail',
        title = LANG.t('trail.TrailDetail'),
        passProps = {
          storeType: CONSTANTS.STORE_TYPES.REMOTE,
          id: trail._id,
          isPreview: false
        }
      }
 
      navigator.push({
        id,
        title,
        passProps
      })*/
    }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={_nextPage}>
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
        <TrailMap
          navigator={navigator}
          points={trail.points}
        />
      </View>
      <View style={styles.footer}>
        <UserLink
          navigator={navigator}
          title={LANG.t('trail.Creator')}
          user={creator}
        />
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
  trail: PropTypes.object.isRequired,
  user: PropTypes.object
}

export default TrailCard