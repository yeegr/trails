'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Alert,
  DeviceEventEmitter,
  StyleSheet,
  View
} from 'react-native'

import MapView from 'react-native-maps'
import CoordTransform from 'coordtransform'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../redux/actions/newTrailActions'
import * as navbarActions from '../../redux/actions/navbarActions'

import {
  RNLocation as Location
} from 'NativeModules'

import CallToAction from '../shared/CallToAction'
import Icon from '../shared/Icon'

import {
  UTIL,
  Lang,
  AppSettings,
  Graphics
} from '../../settings'

class RecordTrail extends Component {
  constructor(props) {
    super(props)

    this._toggleRecording = this._toggleRecording.bind(this)
    this._closeAlert = this._closeAlert.bind(this)
    this._startCounter = this._startCounter.bind(this)
    this._pauseCounter = this._pauseCounter.bind(this)
    this._validatePoints = this._validatePoints.bind(this)
    this._normalizeCoords = this._normalizeCoords.bind(this)
    this._formatCoords = this._formatCoords.bind(this)
    this._finalizePath = this._finalizePath.bind(this)
    this._saveRecording = this._saveRecording.bind(this)
    this._stopTracking = this._stopTracking.bind(this)

    this.state = {
      ASPECT_RATIO: 9 / 16,
      currentPosition: {
        latitude: 39.900392,
        longitude: 116.397855,
        altitude: 1,
        speed: 0,
        distance: 0
      },
      counter: 0,
      id: null,
      points: [],
      errors: [],
      log: ''
    }
  }

  componentWillMount() {
    this.props.newTrailActions.newTrail(this.props.user)
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
          let path = this.state.points.slice(0),
            currentPosition = this._formatCoords(location.coords)

          if (path.length > 0) {
            let lastCoords = path[path.length - 1]
            currentPosition.distance = parseFloat((lastCoords.distance + UTIL.calculatPointDistance(lastCoords, currentPosition)).toFixed(4))
          }

          if (this.props.newTrail.isRecording) {
            let tmp = path.concat([currentPosition])

            if (tmp.length % AppSettings.minTrailPathPoints === 0) {
              //this.props.newTrailActions.setTrailData(this._finalizePath())
            }

            this.setState({
              currentPosition,
              points: tmp
              //log: JSON.stringify(this._finalizePath())
            })

/*            console.log('record')
            console.log(tmp)
            this.props.newTrailActions.storeTrailPoints(tmp)*/
          } else {
            this.setState({
              currentPosition
            })
          }
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.navbar.nav_to_edit_trail === false && nextProps.navbar.nav_to_edit_trail === true) {
      let newTrail = nextProps.newTrail

      if (this._validatePoints() === true) {
        if (newTrail.isRecording === true) {
          Alert.alert(
            Lang.IsRecording,
            '',
            [
              {text: Lang.ContinueRecording, onPress: this._closeAlert},
              {text: Lang.SaveTrail, onPress: this._saveRecording}
            ]
          )
        } else {
          this._saveRecording()
        }
      } else {
        Alert.alert(
          Lang.PathIsTooShort,
          '',
          [{text: Lang.Okay, onPress: this._closeAlert}]
        )
      }
    }
  }

  componentWillUnmount() {
    this._stopTracking()
  }

  _closeAlert() {
    this.props.navbarActions.backToRecordTrail()
  }

  _validatePoints() {
    return (this.state.points.length > AppSettings.minTrailPathPoints)
  }

  _stopTracking() {
    Location.stopUpdatingLocation()
    this.LocationListener.remove()
    this._pauseCounter()
    this.props.newTrailActions.stopRecording()
  }

  _toggleRecording() {
    if (this.props.newTrail.isRecording) {
      this._pauseCounter()
    } else {
      if (this.state.id === null) {
        this.setState({
          id: UTIL.generateRandomString(16)
        })
      }

      this.props.newTrailActions.startRecording()
      this._startCounter()
    }
  }
  
  _saveRecording() {
    this.props.newTrailActions.storeTrailData(this._finalizePath())

    this.props.navigator.replace({
      id: 'EditTrail',
      title: Lang.EditTrail,
      passProps: {
        trail: this.props.newTrail
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
      coords.heading,
      coords.accuracy
    ]
  }

  _finalizePath() {
    let points = []

    this.state.points.map((coords) => {
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

  _startCounter() {
    let that = this

    this.counterInterval = setInterval(() => {
      let counter = that.state.counter + 1
      that.setState({counter})
    }, 1000)
  }

  _pauseCounter() {
    clearInterval(this.counterInterval)
    this.props.newTrailActions.stopRecording()
  }

  render() {
    const stack = 'vertical',
      {currentPosition} = this.state

    return (
      <View style={{flex: 1, marginTop: Graphics.page.marginTop}}>
        <View style={styles.data}>
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={Graphics.colors.primary}
            labelColor={Graphics.colors.midGray}
            path={Graphics.pictograms.timer}
            showLabel={true}
            stack={stack}
            textColr={Graphics.icon.valueColor}
            label={Lang.TotalDuration}
            value={UTIL.formatSeconds(this.state.counter)}
          />
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={Graphics.colors.primary}
            labelColor={Graphics.colors.midGray}
            path={Graphics.pictograms.ruler}
            showLabel={true}
            stack={stack}
            textColr={Graphics.icon.valueColor}
            label={Lang.TotalDistance}
            value={currentPosition.distance.toString() + Lang.Kilometre}
          />
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={Graphics.colors.primary}
            labelColor={Graphics.colors.midGray}
            path={Graphics.pictograms.trendingUp}
            showLabel={true}
            stack={stack}
            textColr={Graphics.icon.valueColor}
            label={Lang.CurrentAltitude}
            value={currentPosition.altitude.toString() + Lang.Metre}
          />
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={Graphics.colors.primary}
            labelColor={Graphics.colors.midGray}
            path={Graphics.pictograms.dashboard}
            showLabel={true}
            stack={stack}
            textColr={Graphics.icon.valueColor}
            label={Lang.CurrentSpeed}
            value={currentPosition.speed.toString() + Lang.Kilometre}
          />
        </View>
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
              coordinates={this.state.points}
              strokeColor={Graphics.mapping.strokeColor}
              strokeWidth={Graphics.mapping.strokeWeight}
            />
          </MapView>
        </View>
        <CallToAction
          onPress={this._toggleRecording}
          label={(this.props.newTrail.isRecording) ? Lang.PauseRecording : Lang.StartRecording}
          backgroundColor={(this.props.newTrail.isRecording) ? Graphics.colors.warning : Graphics.colors.primary}
        />
      </View>
    )
  }
}

RecordTrail.propTypes = {
  navigator: PropTypes.object.isRequired,
  navbar: PropTypes.object.isRequired,
  navbarActions: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
  newTrail: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  data: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 5,
    marginBottom: 10
  }
})

function mapStateToProps(state, ownProps) {
  return {
    navbar: state.navbar,
    newTrail: state.newTrail,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navbarActions: bindActionCreators(navbarActions, dispatch),
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordTrail)
