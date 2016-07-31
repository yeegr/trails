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

import {showTrailDifficulty, formatDuration} from '../../../common'

import Icon from '../shared/Icon'

const TrailData = (props) => {
  const trail = props.trail

  let difficultyLevel = showTrailDifficulty(props.difficultyLevel), 
    difficultyLevelIcon = (difficultyLevel) ? <Icon backgroundColor="transparent" fillColor={AppSettings.color.primary} pictogram={Graphics.pictogram[difficultyLevel]} label={Lang.DifficultyLevel} value={difficultyLevel} /> : null

  return (
    <View style={styles.data}>
      {difficultyLevelIcon}
      <Icon backgroundColor="transparent" fillColor={AppSettings.color.primary} pictogram={Graphics.pictogram.timer} label={Lang.TotalDuration} value={formatDuration(props.totalDuration)} />
      <Icon backgroundColor="transparent" fillColor={AppSettings.color.primary} pictogram={Graphics.pictogram.ruler} label={Lang.TotalDistance} value={props.totalDistance.toString() + Lang.Kilometre} />
      <Icon backgroundColor="transparent" fillColor={AppSettings.color.primary} pictogram={Graphics.pictogram.trendingUp} label={Lang.TotalElevation} value={props.totalElevation.toString() + Lang.Metre} />
      <Icon backgroundColor="transparent" fillColor={AppSettings.color.primary} pictogram={Graphics.pictogram.goingUp} label={Lang.MaximumAltitude} value={props.maximumAltitude.toString() + Lang.Metre} />
      <Icon backgroundColor="transparent" fillColor={AppSettings.color.primary} pictogram={Graphics.pictogram.dashboard} label={Lang.AverageSpeed} value={props.averageSpeed.toString() + Lang.KilometrePerHour} />
    </View>
  )
}

const styles = StyleSheet.create({
    data: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: 2,
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
