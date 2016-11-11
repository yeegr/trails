'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
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
  Lang
} from '../../settings'

class TrailDetail extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!this.props.isPreview) {
      this.props.trailsActions.getTrail(this.props.id)
    }
  }

  render() {
    const trail = (this.props.isPreview) ? this.props.newTrail : this.props.trail

    if (!trail) {
      return <Loading />
    }

    let creator = this.props.user,
      toolbar = null

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
        type={'preview'}
        gallery={trail.photos}
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
              <TrailInfo type={trail.type} title={trail.title} date={trail.date}/>
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
                <TrailMap points={trail.points} />
              </View>
              <TrailChart points={trail.points} />
            </View>
            <View style={[styles.detail.section, {marginHorizontal: 15}]}>
              <UserLink user={creator} navigator={navigator} />
            </View>
            <View style={styles.detail.section}>
              <Header text={Lang.Description} />
              <TextView style={{marginHorizontal: 15}} text={(trail.description.length < 1) ? Lang.NoDescription : trail.description} />
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
  newTrail: PropTypes.object,
  user: PropTypes.object,
  isPreview: PropTypes.bool
}

function mapStateToProps(state, ownProps) {
  return {
    trail: state.trails.trail,
    newTrail: state.newTrail,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    trailsActions: bindActionCreators(trailsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailDetail)

