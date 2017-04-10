'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  AsyncStorage,
  Text,
  Alert,
  AppState,
  DeviceEventEmitter,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import {
  RNLocation as Location
} from 'NativeModules'

import Modal from 'react-native-modal'
import MapView from 'react-native-maps'
import CoordTransform from 'coordtransform'
import Permissions from 'react-native-permissions'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../../redux/actions/loginActions'
import * as newTrailActions from '../../../redux/actions/newTrailActions'

import Icon from '../shared/Icon'
import NavbarButton from '../shared/NavbarButton'
import TextView from '../shared/TextView'

import {
  LANG,
  UTIL,
  Lang,
  AppSettings,
  Graphics
} from '../../../../common/__'

class RecordTrail extends Component {
  constructor(props) {
    super(props)

    this._hideRecorder = this._hideRecorder.bind(this)
    this._onModalShow = this._onModalShow.bind(this)
    this._onModalHide = this._onModalHide.bind(this)
    this._reset = this._reset.bind(this)
    this._resetTrail = this._resetTrail.bind(this)
    this._discardRecording = this._discardRecording.bind(this)
    this._editTrail = this._editTrail.bind(this)

    this._handleAppStateChange = this._handleAppStateChange.bind(this)
    this._initLocation = this._initLocation.bind(this)

    this._toggleRecording = this._toggleRecording.bind(this)
    this._startCounter = this._startCounter.bind(this)
    this._pauseCounter = this._pauseCounter.bind(this)
    this._validatePoints = this._validatePoints.bind(this)
    this._normalizeCoords = this._normalizeCoords.bind(this)
    this._formatCoords = this._formatCoords.bind(this)
    this._finalizePath = this._finalizePath.bind(this)
    this._saveRecording = this._saveRecording.bind(this)
    this._stopTracking = this._stopTracking.bind(this)

    this.ASPECT_RATIO = 9 / 16

    this.initState = {
      currentPosition: {
        latitude: 39.900392,
        longitude: 116.397855,
        altitude: 1,
        speed: 0,
        distance: 0
      },
      counter: 0,
      coords: [],
      points: []
    }

    this._reset()
  }

  componentWillMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  _hideRecorder() {
    this.props.newTrailActions.hideRecorder()
  }

  _onModalShow() {
    this.refs.map.measure((fx, fy, width, height, px, py) => {
      this.ASPECT_RATIO = width / height
    })

    Location.getAuthorizationStatus((authorization) => {
      if (authorization === 'authorizedAlways') {
        if (this.props.newTrail.isNew) {
          this._initLocation()
          this.props.newTrailActions.newTrail(this.props.user)
        }
      } else {
        Alert.alert(
          LANG.t('trail.record.LocationAlert.title'),
          LANG.t('trail.record.LocationAlert.description'),
          [
            {
              text: LANG.t('trail.record.LocationAlert.Cancel'),
              onPress: this._hideRecorder
            },
            {
              text: LANG.t('trail.record.LocationAlert.Okay'),
              onPress: Permissions.openSettings
            }
          ]
        )
      }
    })
  }

  _onModalHide() {
    if (this.state.points.length < 1) {
      this.props.newTrailActions.resetTrail()
    }
  }

  _initLocation() {
    Location.setDesiredAccuracy(10)
    Location.setDistanceFilter(5.0)
    Location.setAllowsBackgroundLocationUpdates(true)
    Location.startUpdatingLocation()
    this.LocationListener = DeviceEventEmitter.addListener('locationUpdated', (location) => {
      let path = this.state.coords.slice(0),
        points = this.state.points.slice(0),
        currentPosition = this._formatCoords(location.coords)

      if (path.length > 0) {
        let lastCoords = path[path.length - 1]
        currentPosition.distance = parseFloat((lastCoords.distance + UTIL.calculatPointDistance(lastCoords, currentPosition)).toFixed(4))
      }

      if (this.props.newTrail.isRecording) {
        let coords = path.concat([currentPosition])
        points.push(this._normalizeCoords(currentPosition))

        this.setState({
          currentPosition,
          coords,
          points
        })

        if (coords.length > 0 && coords.length % AppSettings.minTrailPathPoints === 0) {
          this.props.newTrailActions.storeTrailPath(this._finalizePath(), false)
        }
      } else {
        this.setState({
          currentPosition
        })
      }
    })
  }

  _handleAppStateChange(appState) {
    if (appState === 'active') {
      Location.getAuthorizationStatus((authorization) => {
        if (authorization === 'authorizedAlways') {
          this._initLocation()
        }
      })
    }
  }

  _reset() {
    this.startTime = null
    this.stopTime = null
    this.trailTime = null
    this.pauseTime = null
    this.state = Object.assign({}, this.initState)
  }

  _resetTrail() {
    this._reset()
    clearInterval(this.counterInterval)
    this.props.newTrailActions.newTrail(this.props.user)
  }

  _discardRecording() {
    this._reset()
    clearInterval(this.counterInterval)
    this.props.newTrailActions.deleteLocalTrail(this.props.newTrail.storeKey)
    this.props.newTrailActions.resetTrail()
    this._hideRecorder()
  }

  _editTrail() {
    let {newTrail} = this.props

    if (this._validatePoints() === true) {
      if (newTrail.isRecording === true) {
        Alert.alert(
          LANG.t('trail.record.SaveAlert.title'),
          '',
          [
            {
              text: LANG.t('trail.record.SaveAlert.discard'),
              onPress: this._discardRecording
            },
            {
              text: LANG.t('trail.record.SaveAlert.cancel')
            },
            {
              text: LANG.t('trail.record.SaveAlert.confirm'),
              onPress: this._saveRecording
            }
          ]
        )
      } else {
        this._saveRecording()
      }
    } else {
      Alert.alert(
        LANG.t('trail.record.NextAlert.title'),
        '',
        [{text: LANG.t('glossary.Okay')}]
      )
    }
  }

  _validatePoints() {
    return (this.state.coords.length >= AppSettings.minTrailPathPoints)
  }

  _stopTracking() {
    Location.stopUpdatingLocation()
    if (this.LocationListener) {
      this.LocationListener.remove()
    }

    this._pauseCounter()
    if (this.counterInterval) {
      clearInterval(this.counterInterval)
    }
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

  _formatCoords(coords) {
    const gcj = CoordTransform.wgs84togcj02(coords.longitude, coords.latitude)

    return {
      timestamp: coords.timestamp || UTIL.getTimestamp(),
      latitude: parseFloat((gcj[1]).toFixed(7)),
      longitude: parseFloat((gcj[0]).toFixed(6)),
      altitude: parseFloat(coords.altitude.toFixed(1)),
      speed: parseFloat(Math.abs((coords.speed * 3.6).toFixed(2))) || 0,
      distance: coords.distance || 0,
      heading: parseFloat(coords.course.toFixed(2)),
      accuracy: coords.accuracy
    }
  }
  
  _finalizePath() {
    if (this._validatePoints()) {
      let {
        date,
        totalDuration,
        totalDistance,
        totalElevation,
        maximumAltitude,
        averageSpeed
      } = UTIL.calculateTrailData(this.state.points)

      return {
        date,
        totalDuration: Math.round(this.trailTime / 1000),
        totalDistance,
        totalElevation,
        maximumAltitude,
        averageSpeed,
        points: this.state.points
      }
    }
  }

  _saveRecording() {
    this.props.newTrailActions.storeTrailPath(this._finalizePath(), true)
    this._stopTracking()
  }

  _startCounter() {
    if (!this.startTime) {
      this.startTime = Date.now()
    }

    this.props.newTrailActions.startRecording()
  }

  _pauseCounter() {
    this.stopTime = Date.now()
    this.props.newTrailActions.stopRecording()
  }

  _toggleRecording() {
    if (this.props.newTrail.isRecording) {
      this._pauseCounter()
    } else {
      this._startCounter()
    }

    this.counterInterval = setInterval(() => {
      let current = Date.now()

      if (this.props.newTrail.isRecording) {
        this.trailTime = current - this.startTime - this.pauseTime
        this.setState({counter: Math.round(this.trailTime / 1000)})
      } else {
        this.pauseTime += current - this.stopTime
        this.stopTime = current
      }
    }, 1000)
  }

  render() {
    const screenWidth = AppSettings.device.width,
      iconSide = 64,
      styles = StyleSheet.create({
        modal: {
          backgroundColor: Graphics.colors.primary,
          margin: 0,
          paddingTop: Graphics.statusbar.height
        },
        navbar: {
          backgroundColor: Graphics.colors.primary,
          flexDirection: 'row',
          height: Graphics.titlebar.height
        },
        title: {
          flex: 1,
          alignItems: 'center'
        },
        data: {
          alignItems: 'flex-start',
          backgroundColor: Graphics.colors.background,
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 5,
          paddingBottom: 10
        },
        controlBar: {
          position: 'absolute',
          bottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginHorizontal: 50,
          width: screenWidth - 100
        }
      }),
      stack = 'vertical',
      {currentPosition} = this.state,
      {newTrail} = this.props

    return (
      <Modal
        animationIn="fadeInDown"
        animationOut="fadeOutUp"
        hideOnBack={true}
        isVisible={this.props.isVisible}
        onModalShow={this._onModalShow}
        onModalHide={this._onModalHide}
        style={styles.modal}
      >
        <View style={styles.navbar}>
          <View style={{width: 50}} />
          <View style={styles.title}>
            <TextView
              style={{marginVertical: 5, fontWeight: '400'}}
              fontSize={'XXL'}
              textColor={Graphics.textColors.overlay}
              text={this.props.title || LANG.t('trail.RecordTrail')}
            />
          </View>
          <NavbarButton
            onPress={this._hideRecorder}
            label={LANG.t('glossary.Hide')}
            showLabel={true}
          />
        </View>
        <View style={styles.data}>
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={Graphics.colors.primary}
            labelColor={Graphics.colors.midGray}
            path={Graphics.pictograms.timer}
            showLabel={true}
            stack={stack}
            textColor={Graphics.icon.valueColor}
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
            textColor={Graphics.icon.valueColor}
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
            textColor={Graphics.icon.valueColor}
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
            textColor={Graphics.icon.valueColor}
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
            region={UTIL.setRegion(this.state.currentPosition, this.ASPECT_RATIO, 0.2)}
          >
            <MapView.Polyline
              coordinates={this.state.coords}
              strokeColor={Graphics.mapping.strokeColor}
              strokeWidth={Graphics.mapping.strokeWeight}
            />
          <View style={styles.controlBar}>
            <TouchableOpacity onPress={this._resetTrail}>
              <Icon
                labelColor={Graphics.textColors.overlay}
                showLabel={true}
                sideLength={iconSide}
                stack={stack}
                type="reset"
                label={LANG.t('glossary.Reset')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._toggleRecording}>
              <Icon
                backgroundColor={(newTrail.isRecording) ? Graphics.colors.warning : Graphics.colors.primary}
                labelColor={Graphics.textColors.overlay}
                showLabel={true}
                sideLength={iconSide}
                stack={stack}
                type={(newTrail.isRecording) ? "pause" : "play"}
                label={(newTrail.isRecording) ? LANG.t('trail.record.PauseRecording') : LANG.t('trail.record.StartRecording')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._editTrail}>
              <Icon
                backgroundColor={Graphics.colors[this._validatePoints() ? 'primary' : 'disabled']}
                labelColor={Graphics.textColors.overlay}
                showLabel={true}
                sideLength={iconSide}
                stack={stack}
                type="arrow-right"
                label={LANG.t('glossary.NextStep')}
              />
            </TouchableOpacity>
          </View>
          </MapView>
        </View>
      </Modal>
    )
  }
}

RecordTrail.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  user: PropTypes.object,
  loginActions: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
  newTrail: PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    newTrail: state.newTrail,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordTrail)
