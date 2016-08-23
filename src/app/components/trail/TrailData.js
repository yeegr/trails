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
  StyleSheet
} from 'react-native'

import {showTrailDifficulty, formatDuration} from '../../../util/common'

import Icon from '../shared/Icon'

const TrailData = (props) => {
  const trail = props.trail,
  stack = 'vertical'

  let difficultyLevel = showTrailDifficulty(props.difficultyLevel), 
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
        value={formatDuration(props.totalDuration)}
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
        value={props.averageSpeed.toString() + Lang.KilometrePerHour}
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
