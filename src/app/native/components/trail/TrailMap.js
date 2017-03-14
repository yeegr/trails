'use strict'

import React, {
  PropTypes
} from 'react'

import {
  TouchableOpacity
} from 'react-native'

import MapView from 'react-native-maps'

import {
  LANG,
  UTIL,
  Graphics
} from '../../../../common/__'

const TrailMap = (props) => {
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
    },
    onPress = () => {
      props.navigator.push({
        id: 'TrailMapFull',
        title: LANG.t('trail.TrailMap'),
        passProps: {
          points: props.points
        }
      })
    }

  return (
    <TouchableOpacity onPress={onPress} style={{flex:1}}>
      <MapView
        style={{flex: 1}}
        mapType="satellite"
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
    </TouchableOpacity>
  )
}

TrailMap.propTypes = {
  navigator: PropTypes.object.isRequired,
  points: PropTypes.array.isRequired
}

export default TrailMap