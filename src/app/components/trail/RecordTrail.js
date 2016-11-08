'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Alert,
  DeviceEventEmitter,
  View
} from 'react-native'

import MapView from 'react-native-maps'
import CoordTransform from 'coordtransform'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import { RNLocation as Location } from 'NativeModules'

import CallToAction from '../shared/CallToAction'

import {
  UTIL,
  Lang,
  Graphics
} from '../../settings'

class RecordTrail extends Component {
  constructor(props) {
    super(props)
    this._toggleRecording = this._toggleRecording.bind(this)
    this._saveRecording = this._saveRecording.bind(this)
    this._stopTracking = this._stopTracking.bind(this)
    this._normalizeCoords = this._normalizeCoords.bind(this)
    this._finalizePath = this._finalizePath.bind(this)
    this._formatCoords = this._formatCoords.bind(this)

    this.state = {
      ASPECT_RATIO: 9 / 16,
      currentPosition: {
        latitude: 39.900392,
        longitude: 116.397855,
        altitude: 1,
        speed: 0
      },
      path: [],
      errors: [],
      log: ''
    }
  }

  componentWillMount() {
    this.props.newTrailActions.createTrail(this.props.user)
  }

  componentDidMount() {
    setTimeout(() => {
      this.refs.map.measure((fx, fy, width, height, px, py) => {
        this.setState({
          ASPECT_RATIO: width / height
        })
      })
    }, 0)

    Location.requestAlwaysAuthorization()
    Location.getAuthorizationStatus((authorization) => {
      if (authorization === 'authorizedAlways') {
        Location.setDesiredAccuracy(10)
        Location.setDistanceFilter(5.0)
        Location.setAllowsBackgroundLocationUpdates(true)
        Location.startUpdatingLocation()
        this.LocationListener = DeviceEventEmitter.addListener('locationUpdated', (location) => {
          let path = this.state.path,
          currentPosition = this._formatCoords(location.coords)

          if (path.length > 0) {
            let lastCoords = path[path.length - 1]
            currentPosition.distance = parseFloat((lastCoords.distance + UTIL.calculatPointDistance(lastCoords, currentPosition)).toFixed(4))
          }

          if (this.props.newTrail.isRecording) {
            this.setState({
              currentPosition,
              path: path.concat([currentPosition]),
              //log: JSON.stringify(this._finalizePath())
            })
          } else {
            this.setState({
              currentPosition
            })
          }
        })
      }
    })
  }

  componentWillUnmount() {
    this._stopTracking()
  }

  _toggleRecording() {
    if (this.props.newTrail.isRecording) {
      this.props.newTrailActions.stopRecording()

      let buttons = (this.state.path.length > 1) ? [
        {text: Lang.Pause},
        {text: Lang.SaveTrail, onPress: this._saveRecording}
      ] : [
        {text: Lang.Pause}
      ]

      Alert.alert(
        Lang.RecordingIsPaused,
        '',
        buttons
      )
    } else {
      this.props.newTrailActions.startRecording()
    }
  }
  
  _saveRecording() {
    this.props.newTrailActions.calculateData(this._finalizePath())

    this.props.navigator.replace({
      id: 'EditTrail',
      title: Lang.EditTrail
    })
  }

  _normalizeCoords(coords) {
    return [
      coords.timestamp,
      coords.latitude,
      coords.longitude,
      coords.altitude,
      coords.speed,
      coords.distance,
      coords.heading,
      coords.accuracy
    ]
  }

  _finalizePath() {
    let points = []

    this.state.path.map((coords) => {
      points.push(this._normalizeCoords(coords))
    })

    return points
  }

  _formatCoords(coords) {
    const gcj = CoordTransform.wgs84togcj02(coords.longitude, coords.latitude)

    return {
      timestamp: coords.timestamp || UTIL.getTimestamp(),
      latitude: parseFloat((gcj[1]).toFixed(7)),
      longitude: parseFloat((gcj[0]).toFixed(6)),
      altitude: parseFloat(coords.altitude.toFixed(1)),
      speed: parseFloat(coords.speed.toFixed(2)) || 0,
      distance: coords.distance || 0,
      heading: parseFloat(coords.course.toFixed(2)),
      accuracy: coords.accuracy
    }
  }
  _stopTracking() {
    Location.stopUpdatingLocation()
    this.LocationListener.remove()
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: Graphics.page.marginTop}}>
        <View ref="map" style={{flex: 1}}>
          <MapView
            style={{flex: 1}}
            mapType="satellite"
            pitchEnabled={true}
            rotateEnabled={true}
            scrollEnabled={true}
            showsCompass={true}
            showsBuildings={false}
            showsIndoors={false}
            showsPointsOfInterest={false}
            showsScale={true}
            showsTraffic={false}
            zoomEnabled={true}
            showsUserLocation={true}
            followUserLocation={true}
            region={UTIL.setRegion(this.state.currentPosition, this.state.ASPECT_RATIO, 0.2)}
          >
            <MapView.Polyline
              coordinates={this.state.path}
              strokeColor={Graphics.mapping.strokeColor}
              strokeWidth={Graphics.mapping.strokeWeight}
            />
          </MapView>
        </View>
        <CallToAction
          onPress={this._toggleRecording}
          label={(this.props.newTrail.isRecording) ? Lang.StopRecording : Lang.StartRecording}
          backgroundColor={(this.props.newTrail.isRecording) ? Graphics.colors.warning : Graphics.colors.primary}
        />
      </View>
    )
  }
}

RecordTrail.propTypes = {
  user: PropTypes.object.isRequired,
  newTrail: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    newTrail: state.newTrail,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordTrail)
