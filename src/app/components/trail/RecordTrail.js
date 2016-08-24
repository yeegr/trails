'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Alert,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native'

import MapView from 'react-native-maps'
import CoordTransform from 'coordtransform'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../containers/actions/newTrailActions'

import TextView from '../shared/TextView'
import CallToAction from '../shared/CallToAction'
import {Lang, Graphics} from '../../settings'
import {calculatPointDistance, setRegion, formatTrailPoints} from '../../../util/common'
import styles from '../../styles/main'

class RecordTrail extends Component {
  constructor(props) {
    super(props)
    this._toggleRecording = this._toggleRecording.bind(this)
    this._saveRecording = this._saveRecording.bind(this)
    this._convertCoords = this._convertCoords.bind(this)
    this._formatCoords = this._formatCoords.bind(this)
    this._normalizeCoords = this._normalizeCoords.bind(this)
    this._updateTrail = this._updateTrail.bind(this)

    this.watchID = null

    this.state = {
      ASPECT_RATIO: 9 / 16,
      currentPosition: {
        latitude: 39.900392,
        longitude: 116.397855,
        altitude: 1,
        speed: 0
      },
      path: [],
      points: [],
      errors: []
    }
  }

  _toggleRecording() {
    if (this.props.newTrail.isRecording) {
      this.props.newTrailActions.stopRecording()

      Alert.alert(
        Lang.RecordingIsPaused,
        '',
        [
          {text: Lang.Return},
          {text: Lang.SaveTrail, onPress: this._saveRecording}
        ]
      )
    } else {
      this.props.newTrailActions.startRecording()

      if (this.watchID === null) {
        this.watchID = navigator.geolocation.watchPosition(
          (position) => {
            this._updateTrail(this._convertCoords(position.coords))
          },
          (error) => this.setState({
            errors: this.state.errors.concat([error])
          }),
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        )
      }
    }
  }
  
  _saveRecording() {
    navigator.geolocation.clearWatch(this.watchID);

    this.props.newTrailActions.calculateData(this.state.points)

    this.props.navigator.push({
      id: 'EditTrail',
      title: Lang.EditTrail,
      props: {
      }
    })
  }

  _convertCoords(coords) {
    let gcj = CoordTransform.wgs84togcj02(coords.longitude, coords.latitude)

    return Object.assign({}, coords, {
      latitude: parseFloat(gcj[1].toFixed(7)),
      longitude: parseFloat(gcj[0].toFixed(8))
    })
  }

  _formatCoords(coords) {
    return {
      timestamp: Math.round((new Date()).getTime() / 1000),
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      speed: coords.speed
    }
  }

  _normalizeCoords(coords) {
    return [
      coords.timestamp,
      coords.latitude,
      coords.longitude,
      coords.altitude,
      coords.speed,
      coords.distance
    ]
  }

  _updateTrail(coords) {
    let lastCoords = this.state.currentPosition, 
    currentCoords = this._formatCoords(coords),
    path = this.state.path,
    addDistance = Object.assign({}, currentCoords, {
      distance: (path.length < 1) ? 0 : (
        path[path.length - 1].distance + calculatPointDistance(lastCoords, coords)
      )
    })

    this.setState({
      currentPosition: currentCoords,
      path: path.concat([addDistance]),
      points: this.state.points.concat([this._normalizeCoords(addDistance)])
    })
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
    }, 500)

    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({
        currentPosition: this._formatCoords(this._convertCoords(position.coords))
      }),
      (error) => this.setState({
        currentPosition: {
          timestamp: Math.round((new Date()).getTime() / 1000),
//          latitude: 39.916667,
//          longitude: 116.3833333,
          latitude: this.state.baseCoord.latitude,
          longitude: this.state.baseCoord.longitude,
          altitude: 55,
          speed: 0
        },
        errors: this.state.errors.concat([error])
      }),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  } 

  render() {
    return (
      <View style={{flex: 1, marginTop: 64}}>
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
            region={setRegion(this.state.currentPosition, this.state.ASPECT_RATIO)}
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
        <View style={{height: 60}}>
          <TextView text={this.state.points.length.toString()} />
        </View>
      </View>
    )
  }
}

RecordTrail.propTypes = {
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
