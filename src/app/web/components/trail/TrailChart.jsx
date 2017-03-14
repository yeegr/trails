'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Line as Chart
 } from 'react-chartjs'

import {
  UTIL,
  Graphics
} from '../../../../common/__'

const TrailChart = (props) => {
  const tmp = UTIL.formatTrailChartDataWeb(props.points),
    labels = tmp.x,
    data = tmp.y

  let chartData = {
    labels,
    datasets: [{
      data
    }]
  }

  return (
    <Chart
      height="270"
      width="360"
      data={chartData}
    />
  )
}

TrailChart.propTypes = {
  points: PropTypes.array.isRequired
}

export default TrailChart