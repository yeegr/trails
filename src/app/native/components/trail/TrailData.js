'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View,
  StyleSheet
} from 'react-native'

import Icon from '../shared/Icon'

import {
  LANG,
  UTIL,
  Graphics
} from '../../settings'

const TrailData = (props) => {
  const stack = 'vertical'

  let difficultyLevel = UTIL.showDifficultyLevel(props.difficultyLevel), 
    difficultyLevelTile = (difficultyLevel) ? (
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms[difficultyLevel]}
        showLabel={true}
        stack={stack}
        textColr={Graphics.icon.valueColor}
        label={LANG.t('trail.DifficultyLevel')}
        value={props.difficultyLevel.toFixed(1)}
      />) : null

  return (
    <View style={styles.data}>
      {difficultyLevelTile}
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms.timer}
        showLabel={true}
        stack={stack}
        textColr={Graphics.icon.valueColor}
        label={LANG.t('trail.TotalDuration')}
        value={UTIL.formatDuration(props.totalDuration)}
      />
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms.ruler}
        showLabel={true}
        stack={stack}
        textColr={Graphics.icon.valueColor}
        label={LANG.t('trail.TotalDistance')}
        value={LANG.t('number.length.km', {'length': props.totalDistance.toFixed(1)})}
      />
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms.trendingUp}
        showLabel={true}
        stack={stack}
        textColr={Graphics.icon.valueColor}
        label={LANG.t('trail.TotalElevation')}
        value={LANG.t('number.length.m', {'length': props.totalElevation.toFixed(0)})}
      />
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms.goingUp}
        showLabel={true}
        stack={stack}
        label={LANG.t('trail.MaximumAltitude')}
        value={LANG.t('number.length.m', {'length': props.maximumAltitude.toFixed(0)})}
      />
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms.dashboard}
        showLabel={true}
        stack={stack}
        textColr={Graphics.icon.valueColor}
        label={LANG.t('trail.AverageSpeed')}
        value={LANG.t('number.speed.kmph', {'speed': props.averageSpeed.toString()})}
      />
    </View>
  )
},
styles = StyleSheet.create({
  data: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 2,
    marginBottom: 10
  }
})

TrailData.propTypes = {
  difficultyLevel: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  totalDistance: PropTypes.number.isRequired,
  totalElevation: PropTypes.number.isRequired,
  maximumAltitude: PropTypes.number.isRequired,
  averageSpeed: PropTypes.number.isRequired
}

export default TrailData
