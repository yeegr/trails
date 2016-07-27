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
  MapView,
  View
} from 'react-native'

//import MapView from 'react-native-maps'

import {
  formatTrailPoints,
  getMapCenter
} from '../../../common'

const TrailMap = (props) => {
  var points = props.points,
    path = formatTrailPoints(points),
    region = getMapCenter(points),
    startMarker = {
      coord: {
        latitude: points[0][1],
        longitude: points[0][2]
      },
      color: 'green'
    },
    finishMarker = {
      coord: {
        latitude: points[points.length - 1][1],
        longitude: points[points.length - 1][2]
      },
      color: 'red'
    }

  return (
    <MapView
      style={{flex: 1}}
      mapType="satellite"
      region={region}
      showsPointsOfInterest={false}
      showsCompass={false}
      showsScale={false}
      showsBuildings={false}
      showsTraffic={false}
      showsIndoors={false}
      zoomEnabled={false}
      rotateEnabled={false}
      pitchEnabled={false}
      scrollEnabled={false}
    >
      <MapView.Polyline
        coordinates={path}
        strokeColor={AppSettings.mapping.strokeColor}
        strokeWidth={AppSettings.mapping.strokeWeight}
      />
      <MapView.Marker
        coordinate={startMarker.coord}
        pinColor={startMarker.color}
      />
      <MapView.Marker
        coordinate={finishMarker.coord}
        pinColor={finishMarker.color}
      />
    </MapView>
  )
}

TrailMap.propTypes = {
  points: PropTypes.array.isRequired
}

export default TrailMap