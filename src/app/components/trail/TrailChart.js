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
  Dimensions,
  StyleSheet,
  View
} from 'react-native'

import Chart from 'react-native-chart'
import {formatTrailChartData} from '../../../util/common'

const TrailChart = (props) => {
  const data = formatTrailChartData(props.points)

console.log(data)

  return (
    <View style={styles.wrapper}>
      <Chart
        type="line"
        color={Graphics.colors.primary}
        axisColor={Graphics.chart.axisColor}
        axisLabelColor={Graphics.chart.labelColor}
        dataPointColor={Graphics.colors.primary}
        dataPointFillColor={Graphics.chart.pointColor}
        dataPointRadius={2}
        gridColor={Graphics.chart.gridColor}
        hideHorizontalGridLines={true}
        hideVerticalGridLines={true}
        style={styles.chart}
        showDataPoint={true}
        data={data}
      />
    </View>
  )
},
{height, width} = Dimensions.get('window'),
margin = 15,
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: Graphics.chart.backgroundColor,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: margin,
    paddingBottom: 5,
    paddingTop: 10,
  },
  chart: {
    height: 320,
    width: width - margin * 2 - 10
  },
})

TrailChart.propTypes = {
  points: PropTypes.array.isRequired
}

export default TrailChart