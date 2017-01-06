'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import MapView from 'react-native-maps'

import {
  UTIL,
  Graphics
} from '../../settings'

const TrailMapFull = (props) => {
  let points = props.points,
    path = UTIL.formatTrailPoints(points),
    region = UTIL.getMapCenter(points),
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
    <View style={{flex: 1, marginTop: Graphics.page.marginTop}}>
      <MapView
        style={{flex: 1}}
        mapType="satellite"
        showsPointsOfInterest={false}
        showsCompass={true}
        showsScale={true}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        zoomEnabled={true}
        rotateEnabled={true}
        pitchEnabled={true}
        scrollEnabled={true}
        region={region}
      >
        <MapView.Polyline
          coordinates={path}
          strokeColor={Graphics.mapping.strokeColor}
          strokeWidth={Graphics.mapping.strokeWeight}
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
    </View>
  )
}

TrailMapFull.propTypes = {
  points: PropTypes.array.isRequired
}

export default TrailMapFull