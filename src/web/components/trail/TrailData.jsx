'use strict'

import React, {
  PropTypes
} from 'react'

import {
  LANG,
  UTIL
} from '../../settings'

const TrailData = (props) => {
  let difficultyLevel = UTIL.showDifficultyLevel(props.difficultyLevel), 
    difficultyLevelTile = (difficultyLevel) ? (
      <tile>
        <pictogram
          type="glyph"
          data-glyph={difficultyLevel}
        />
        <tile-caption>
          {LANG.t('trail.DifficultyLevel')}
        </tile-caption>
        <tile-data>
          {UTIL.showDifficultyLevel(props.difficultyLevel)}
        </tile-data>
      </tile>
    ) : null

  return (
    <grid>
      {difficultyLevelTile}
      <tile>
        <pictogram
          type="glyph"
          data-glyph="timer"
        />
        <tile-caption>
          {props.totalDuration}
        </tile-caption>
        <tile-data>
          {UTIL.formatDuration(props.totalDuration)}
        </tile-data>
      </tile>
      <tile>
        <pictogram
          type="glyph"
          data-glyph="ruler"
        />
        <tile-caption>
          {LANG.t('trail.TotalDistance')}
        </tile-caption>
        <tile-data>
          {LANG.t('number.length.km', {'length': props.totalDistance.toFixed(1)})}
        </tile-data>
      </tile>
      <tile>
        <pictogram
          type="glyph"
          data-glyph="trending-up"
        />
        <tile-caption>
          {LANG.t('trail.TotalElevation')}
        </tile-caption>
        <tile-data>
          {LANG.t('number.length.m', {'length': props.totalElevation.toFixed(0)})}
        </tile-data>
      </tile>
      <tile>
        <pictogram
          type="glyph"
          data-glyph="going-up"
        />
        <tile-caption>
          {LANG.t('trail.MaximumAltitude')}
        </tile-caption>
        <tile-data>
          {LANG.t('number.length.m', {'length': props.maximumAltitude.toFixed(0)})}
        </tile-data>
      </tile>
      <tile>
        <pictogram
          type="glyph"
          data-glyph="dashboard"
        />
        <tile-caption>
          {LANG.t('trail.AverageSpeed')}
        </tile-caption>
        <tile-data>
          {LANG.t('number.speed.kmph', {'speed': props.averageSpeed.toString()})}
        </tile-data>
      </tile>
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
