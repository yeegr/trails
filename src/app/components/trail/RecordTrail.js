'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  Alert,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native'

import MapView from 'react-native-maps'
import CoordTransform from 'coordtransform'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import TextView from '../shared/TextView'
import CallToAction from '../shared/CallToAction'
import {AppSettings, Lang, Graphics} from '../../settings'
import {calculatPointDistance, setRegion, formatTrailPoints, getTimestamp} from '../../../util/common'
import styles from '../../styles/main'

class RecordTrail extends Component {
  constructor(props) {
    super(props)
    this._toggleRecording = this._toggleRecording.bind(this)
    this._saveRecording = this._saveRecording.bind(this)
    this._normalizeCoords = this._normalizeCoords.bind(this)
    this._finalizePath = this._finalizePath.bind(this)
    this._formatCoords = this._formatCoords.bind(this)
    this._getCurrentPosition = this._getCurrentPosition.bind(this)

    this.wathId = null

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

  _toggleRecording() {
    if (this.props.newTrail.isRecording) {
      this.props.newTrailActions.stopRecording()

      let buttons = (this.state.path.length > 1) ? [
        {text: Lang.Return},
        {text: Lang.SaveTrail, onPress: this._saveRecording}
      ] : [
        {text: Lang.Return}
      ]

      Alert.alert(
        Lang.RecordingIsPaused,
        '',
        buttons
      )
    } else {
      this.props.newTrailActions.startRecording()
      this._getCurrentPosition()
    }
  }
  
  _saveRecording() {
    this.watchId = null
    this.props.newTrailActions.calculateData(this._finalizePath())

    this.props.navigator.push({
      id: 'EditTrail',
      title: Lang.EditTrail,
      props: {
      }
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
      coords.heading
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
      timestamp: coords.timestamp || getTimestamp(),
      latitude: parseFloat((gcj[1]).toFixed(7)),
      longitude: parseFloat((gcj[0]).toFixed(6)),
      altitude: parseFloat(coords.altitude.toFixed(1)),
      speed: parseFloat(coords.speed.toFixed(2)) || 0,
      distance: coords.distance || 0,
      heading: parseFloat(coords.heading.toFixed(2))
    }
  }

  _getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let thisCoords = this._formatCoords(position.coords),
        path = this.state.path

        if (this.props.newTrail.isRecording) {
          if (path.length > 0) {
            let lastCoords = path[path.length - 1]
            thisCoords.distance = parseFloat((lastCoords.distance + calculatPointDistance(lastCoords, thisCoords)).toFixed(4))
          } 

          this.setState({
            currentPosition: thisCoords,
            path: path.concat([thisCoords])
          })

          this.setState({
            log: JSON.stringify(this._finalizePath())
          })

          this.wathId = setTimeout(this._getCurrentPosition, AppSettings.locationFollowInterval)
        } else {
          this.setState({
            currentPosition: thisCoords
          })

          this.wathId = null
        }

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

    this._getCurrentPosition()
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
        <ScrollView style={{height: 60}}>
          <TextView fontSize="XS" text={this.state.log} />
        </ScrollView>
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
