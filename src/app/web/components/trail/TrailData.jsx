'use strict'

import React, {
  PropTypes
} from 'react'

import Icon from '../shared/Icon'

import {
  LANG,
  UTIL
} from '../../../../common/__'

const TrailData = (props) => {
  let difficultyLevel = UTIL.showDifficultyLevel(props.difficultyLevel), 
    difficultyLevelTile = (difficultyLevel) ? (
      <Icon
        glyph={difficultyLevel}
        caption={LANG.t('trail.DifficultyLevel')}
        value={UTIL.showDifficultyLevel(props.difficultyLevel)}
      />
    ) : null

  return (
    <grid>
      {difficultyLevelTile}
      <Icon
        glyph="timer"
        caption={LANG.t('trail.TotalDuration')}
        value={UTIL.formatDuration(props.totalDuration)}
      />
      <Icon
        glyph="ruler"
        caption={LANG.t('trail.TotalDistance')}
        value={LANG.t('number.length.km', {'length': props.totalDistance.toFixed(1)})}
      />
      <Icon
        glyph="trending-up"
        caption={LANG.t('trail.TotalElevation')}
        value={LANG.t('number.length.m', {'length': props.totalElevation.toFixed(0)})}
      />
      <Icon
        glyph="going-up"
        caption={LANG.t('trail.MaximumAltitude')}
        value={LANG.t('number.length.m', {'length': props.maximumAltitude.toFixed(0)})}
      />
      <Icon
        glyph="dashboard"
        caption={LANG.t('trail.AverageSpeed')}
        value={LANG.t('number.speed.kmph', {'speed': props.averageSpeed.toString()})}
      />
    </grid>
  )
}

TrailData.propTypes = {
  difficultyLevel: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  totalDistance: PropTypes.number.isRequired,
  totalElevation: PropTypes.number.isRequired,
  maximumAltitude: PropTypes.number.isRequired,
  averageSpeed: PropTypes.number.isRequired
}

export default TrailData
