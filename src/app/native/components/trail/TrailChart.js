'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native'

import Chart from 'react-native-chart'

import {
  UTIL,
  Graphics
} from '../../settings'

const TrailChart = (props) => {
  const data = UTIL.formatTrailChartData(props.points)

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
{width} = Dimensions.get('window'),
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