'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  UTIL,
  Graphics
} from '../../settings'

class TrailMap extends Component {
  constructor(props) {
    super(props)

    this._mapTrail = this._mapTrail.bind(this)
    this.remapTrailPoints = this._remapTrailPoints.bind(this)
  }
  
  componentDidMount() {
    this._mapTrail(this.props.id, this.props.points)
  }

  _remapTrailPoints(points) {
    let path = points.map((arr, index) => {
      return [arr[2], arr[1]]
    })
    return path
  }

  _mapTrail(mapId, points) {
    var mapping = Graphics.mapping,
      path = this._remapTrailPoints(points),
      map = new AMap.Map(mapId, {
        dragEnable: false,
        keyboardEnable: false,
        scrollWheel: false,
        zoomEnable: false
      }),
      satelliteLayer = new AMap.TileLayer.Satellite(),
      polyline = new AMap.Polyline({
        path: path,
        strokeColor: mapping.strokeColor,
        strokeOpacity: mapping.strokeOpacity,
        strokeWeight: mapping.strokeWeight,
        strokeStyle: mapping.strokeStyle,
        strokeDasharray: mapping.strokeDasharray
      }),
      startMarker = new AMap.Marker({
        map: map,
        position: path[0],
        draggable: false,
        content: '<marker data-glyph="start"></marker>'
      }),
      endMarker = new AMap.Marker({
        map: map,
        position: path[path.length - 1],
        draggable: false,
        content: '<marker data-glyph="end"></marker>'
      })
    
    satelliteLayer.setMap(map)
    polyline.setMap(map)
    map.setFitView()
  }
  
  render() {
    return (
      <map id={this.props.id} />
    )
  }
}

TrailMap.propTypes = {
  points: PropTypes.array.isRequired,
  id: PropTypes.string
}

export default TrailMap