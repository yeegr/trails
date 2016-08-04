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
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

//import MapView from 'react-native-maps'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newTrailActions from '../../containers/actions/newTrailActions'

import CallToAction from '../shared/CallToAction'
import {setRegion} from '../../../common'
import styles from '../../styles/main'

class RecordTrail extends Component {
  constructor(props) {
    super(props)
    this._saveRecording = this._saveRecording.bind(this)
    this._toggleRecording = this._toggleRecording.bind(this)
    this._updateCurrentPosition = this._updateCurrentPosition.bind(this)

    this.state = {
      currentPosition: {
        latitude: 39.916667,
        longitude: 116.383333,
        altitude: 1,
      },
      points: []
    }
  }

  _updateCurrentPosition(coords) {
    this.setState({
      currentPosition: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude
      }
    })
  }
  
  _saveRecording() {
    this.props.newTrailActions.calculateData(this.props.newTrail.points)

    this.props.navigator.push({
      id: 'EditTrail',
      title: Lang.EditTrail,
      props: {
      }
    })
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

      this.watchID = navigator.geolocation.watchPosition((position) => {
        this._updateCurrentPosition(position.coords)
      })
    }
  }

  componentWillMount() {
    this.props.newTrailActions.createTrail(this.props.user)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._updateCurrentPosition(position.coords)
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: 64}}>
        <MapView
          style={{flex: 1}}
          mapType="satellite"
          showsUserLocation={true}
          followUserLocation={true}
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
          region={setRegion(this.state.currentPosition, ASPECT_RATIO)}
        />
        <CallToAction
          onPress={this._toggleRecording}
          label={(this.props.newTrail.isRecording) ? Lang.StopRecording : Lang.StartRecording}
          backgroundColor={(this.props.newTrail.isRecording) ? Graphics.color.warning : Graphics.colors.primary}
        />
      </View>
    )
  }
}

const {height, width} = Dimensions.get('window'),
ASPECT_RATIO = width / height

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
