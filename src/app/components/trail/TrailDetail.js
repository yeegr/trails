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
import * as trailsActions from '../../redux/actions/trailsActions'

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
  UTIL,
  Lang
} from '../../settings'

class TrailDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trail: null
    }
  }

  componentWillMount() {
    if (this.props.isPreview) {
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
          .getItem(CONSTANTS.ACTION_TARGETS.TEMP)
          .then((tmp) => {
            return (UTIL.isNullOrUndefined(tmp)) ? {} : JSON.parse(tmp)
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
    }
  }

  componentWillReceiveProps(nextProps) {
    switch (this.props.storeType) {
      case CONSTANTS.STORE_TYPES.REMOTE:
        this.setState({
          trail: nextProps.trail
        })
      break
    }
  }

  componentWillUnmount() {
    switch (this.props.storeType) {
      case CONSTANTS.STORE_TYPES.REMOTE:
        this.props.trailsActions.resetTrail()
      break
    }
  }

  render() {
    const navigator = this.props.navigator,
      trail = this.state.trail

    if (!trail) {
      return <Loading />
    }

    let passProps = UTIL.getPassProps(this.props.navigator),
      creator = this.props.user,
      toolbar = null

    passProps.trail = trail

    if (!this.props.isPreview) {
      creator = trail.creator,
      toolbar = (
        <View style={styles.detail.toolbar}>
          <Toolbar
            navigator={navigator}
            type={CONSTANTS.ACTION_TARGETS.TRAIL}
            data={trail}
          />
        </View>
      )
    }

    let galleryPreview = (trail.photos.length > 0) ? (
      <GalleryPreview
        navigator={navigator}
        type={CONSTANTS.ASSET_FOLDERS.TRAIL}
        id={trail.id}
        photos={trail.photos}
      />
    ) : null,
    commentsPreview = (trail.comments.length > 0) ? (
      <CommentPreview 
        navigator={navigator}
        type={CONSTANTS.ACTION_TARGETS.TRAIL}
        data={trail}
      />
    ) : null

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
              <UserLink user={creator} navigator={navigator} />
            </View>
            <View style={styles.detail.section}>
              <Header text={Lang.Description} />
              <TextView
                multiLine={true}
                style={{marginHorizontal: 15}}
                text={(trail.description.length < 1) ? Lang.NoDescription : trail.description}
              />
            </View>
            {galleryPreview}
            {commentsPreview}
          </View>
        </ScrollView>
        {toolbar}
      </View>
    )
  }
}

TrailDetail.propTypes = {
  navigator: PropTypes.object.isRequired,
  trailsActions: PropTypes.object.isRequired,
  id: PropTypes.string,
  trail: PropTypes.object,
  user: PropTypes.object,
  isPreview: PropTypes.bool
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    trail: state.trails.trail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    trailsActions: bindActionCreators(trailsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailDetail)
