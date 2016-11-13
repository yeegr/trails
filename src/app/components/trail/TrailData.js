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
  UTIL,
  Lang,
  Graphics
} from '../../settings'

const TrailData = (props) => {
  const stack = 'vertical'

  let difficultyLevel = UTIL.showTrailDifficulty(props.difficultyLevel), 
    difficultyLevelIcon = (difficultyLevel) ? (
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms[difficultyLevel]}
        showLabel={true}
        stack={stack}
        textColr={Graphics.icon.valueColor}
        label={Lang.DifficultyLevel}
        value={difficultyLevel}
      />) : null

  return (
    <View style={styles.data}>
      {difficultyLevelIcon}
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms.timer}
        showLabel={true}
        stack={stack}
        textColr={Graphics.icon.valueColor}
        label={Lang.TotalDuration}
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
        label={Lang.TotalDistance}
        value={props.totalDistance.toFixed(1) + Lang.Kilometre}
      />
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms.trendingUp}
        showLabel={true}
        stack={stack}
        textColr={Graphics.icon.valueColor}
        label={Lang.TotalElevation}
        value={props.totalElevation.toFixed(0) + Lang.Metre}
      />
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms.goingUp}
        showLabel={true}
        stack={stack}
        label={Lang.MaximumAltitude}
        value={props.maximumAltitude.toFixed(0) + Lang.Metre}
      />
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        labelColor={Graphics.colors.midGray}
        path={Graphics.pictograms.dashboard}
        showLabel={true}
        stack={stack}
        textColr={Graphics.icon.valueColor}
        label={Lang.AverageSpeed}
        value={props.averageSpeed.toString() + Lang.Kilometre}
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
