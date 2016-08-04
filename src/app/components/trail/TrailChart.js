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
  View,
  StyleSheet
} from 'react-native'

import Chart from 'react-native-chart'

import {formatTrailChartData} from '../../../common'

const chartColor = Graphics.textColors.overlay,

  TrailChart = (props) => {
    const data = formatTrailChartData(props.points)

    return (
      <View style={styles.wrapper}>
        <Chart
          style={styles.chart}
          data={data}
          verticalGridStep={5}
          type="line"
          color={Graphics.colors.primary}
          axisColor={chartColor}
          axisLabelColor={chartColor}
          gridColor={chartColor}
        />
      </View>
    )
  },
  
  {height, width} = Dimensions.get('window'),
  margin = 15,
  styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: margin,
        paddingBottom: 5,
        paddingRight: margin,
        paddingTop: 10,
    },
    chart: {
      flex: 1,
      height: 360,
      width: width - margin * 2 - margin
    },
  })

TrailChart.propTypes = {
  points: PropTypes.array.isRequired
}

export default TrailChart