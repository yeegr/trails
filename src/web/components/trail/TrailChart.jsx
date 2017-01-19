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
} from '../../settings'

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
      height="300"
      width="290"
      data={chartData}
    />
  )
}

TrailChart.propTypes = {
  points: PropTypes.array.isRequired
}

export default TrailChart