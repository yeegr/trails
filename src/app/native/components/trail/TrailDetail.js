'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  AsyncStorage,
  ScrollView,
  View,
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as trailsActions from '../../../redux/actions/trailsActions'
import * as newTrailActions from '../../../redux/actions/newTrailActions'
import * as homeActions from '../../../redux/actions/homeActions'

import CallToAction from '../shared/CallToAction'
import Loading from '../shared/Loading'
import Header from '../shared/Header'
import TextView from '../shared/TextView'
import Toolbar from '../shared/Toolbar'
import TrailInfo from './TrailInfo'
import TrailData from './TrailData'
import TrailMap from './TrailMap'
import TrailChart from './TrailChart'
import UserLink from '../user/UserLink'
import GalleryPreview from '../shared/GalleryPreview'
import CommentPreview from '../shared/CommentPreview'

import styles from '../../styles/main'

import {
  CONSTANTS,
  LANG,
  UTIL
} from '../../../../common/__'

class TrailDetail extends Component {
  constructor(props) {
    super(props)
    this._trackTrail = this._trackTrail.bind(this)
  }

  componentWillMount() {
   /* let {id, storeKey} = this.props

    console.log(id)
    console.log(storeKey)

    if (id) {
      this.props.trailsActions.getTrail(id)
      console.log(id)
    } else {
      AsyncStorage
      .getItem(CONSTANTS.STORAGE_KEYS.TRAILS)
      .then((str) => {
        return (UTIL.isNullOrUndefined(str)) ? {} : JSON.parse(str)
      })
      .then((tmp) => {
        if (tmp.hasOwnProperty(storeKey)) {
          this.setState({
            trail: tmp[storeKey]
          })
        }
      })
    }

    /*if (this.props.isPreview) {
      this.setState({
        trail: this.props.newTrail
      })
    } else {
      switch (this.props.storeType) {
        case CONSTANTS.STORE_TYPES.REMOTE:
          this.props.trailsActions.getTrail(this.props.id)
        break

        case CONSTANTS.STORE_TYPES.LOCAL:
          AsyncStorage
          .getItem(this.props.user._id)
          .then((str) => {
            return (UTIL.isNullOrUndefined(str)) ? {} : JSON.parse(str)
          })
          .then((tmp) => {
            let key = this.props.storeKey

            if (tmp.hasOwnProperty(key)) {
              this.setState({
                trail: tmp[key]
              })
            }
          })
        break
      }
    }*/
  }

  componentWillReceiveProps(nextProps) {
    /*switch (this.props.storeType) {
      case CONSTANTS.STORE_TYPES.REMOTE:
        this.setState({
          trail: nextProps.trail
        })
      break
    }*/
  }

  componentWillUnmount() {
    /*switch (this.props.storeType) {
      case CONSTANTS.STORE_TYPES.REMOTE:
        this.props.trailsActions.resetTrail()
      break
    }*/
  }

  _trackTrail() {
    this.props.navigator.immediatelyResetRouteStack([
      {
        id: 'Home',
        title: LANG.t('home.Home')
      }
    ])
    this.props.homeActions.changeTab('Areas')
    this.props.newTrailActions.showRecorder([this.props.trail])
  }

  render() {
    const {navigator, user, trail, isPreview, isReview} = this.props

    if (!trail) {
      return <Loading />
    }

    let creator = (typeof(trail.creator) === 'string' && trail.creator === user._id) ? user : trail.creator, 
      galleryPreview = (trail.photos.length > 0) ? (
        <GalleryPreview
          navigator={navigator}
          type={CONSTANTS.ASSET_FOLDERS.TRAIL}
          id={trail.id}
          photos={trail.photos}
        />
      ) : null,
      commentPreview = (isPreview || isReview) ? null : (
        <CommentPreview 
          navigator={navigator}
          type={CONSTANTS.ACTION_TARGETS.TRAIL}
          data={trail}
        />
      )
 
    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={{paddingTop: 44}}>
          <View style={styles.detail.article}>
            <View style={styles.detail.section}>
              <TrailInfo
                type={trail.type}
                title={trail.title}
                date={trail.date}
              />
              <View style={{marginHorizontal: 10}}>
                <TrailData
                  difficultyLevel={trail.difficultyLevel}
                  totalDuration={trail.totalDuration}
                  totalDistance={trail.totalDistance}
                  totalElevation={trail.totalElevation}
                  maximumAltitude={trail.maximumAltitude}
                  averageSpeed={trail.averageSpeed}
                />
              </View>
              <View style={[styles.global.map, {marginHorizontal: 15}]}>
                <TrailMap
                  navigator={navigator}
                  points={trail.points}
                />
              </View>
              <TrailChart
                points={trail.points}
              />
            </View>
            <View style={[styles.detail.section, {marginHorizontal: 15}]}>
              <UserLink
                navigator={navigator}
                title={LANG.t('trail.Creator')}
                user={creator}
              />
            </View>
            <View style={styles.detail.section}>
              <Header text={LANG.t('trail.TrailDescription')} />
              <TextView
                multiLine={true}
                style={{marginHorizontal: 15}}
                text={(trail.description.length < 1) ? LANG.t('trail.NoDescription') : trail.description}
              />
            </View>
            {galleryPreview}
            {commentPreview}
          </View>
        </ScrollView>
        <View style={styles.detail.actionbar}>
          <View style={styles.detail.toolbar}>
            <Toolbar
              navigator={navigator}
              type={CONSTANTS.ACTION_TARGETS.TRAIL}
              data={trail}
            />
          </View>
          <View style={styles.detail.submit}>
            <CallToAction
              label={LANG.t('trail.TrackTrail')}
              onPress={this._trackTrail}
            />
          </View>
        </View>
      </View>
    )
  }
}

TrailDetail.propTypes = {
  navigator: PropTypes.object.isRequired,
  trailsActions: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
  homeActions: PropTypes.object.isRequired,
  trail: PropTypes.object,
  user: PropTypes.object,
  isPreview: PropTypes.bool,
  isReview: PropTypes.bool
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    trailsActions: bindActionCreators(trailsActions, dispatch),
    newTrailActions: bindActionCreators(newTrailActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailDetail)
