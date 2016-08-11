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
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import ParallaxView from 'react-native-parallax-view'
import Chart from 'react-native-chart'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as trailsActions from '../../containers/actions/trailsActions'
import {ACTION_TARGETS} from '../../../constants'

import Loading from '../shared/Loading'
import Toolbar from '../shared/Toolbar'
import TrailInfo from './TrailInfo'
import TrailData from './TrailData'
import TrailMap from './TrailMap'
import TrailChart from './TrailChart'
import Header from '../shared/Header'
import TextView from '../shared/TextView'
import UserLink from '../user/UserLink'
import {GalleryPreview} from '../shared/Gallery'
import {CommentsPreview} from '../shared/Comments'
import styles from '../../styles/main'

class TrailDetail extends Component {
  constructor(props) {
    super(props)

    console.log(this.props.newTrail)
  }

  componentWillMount() {
    if (!this.props.preview) {
      this.props.trailsActions.getTrail(this.props.id)
    }
  }

  render() {
    const trail = (this.props.preview) ? this.props.newTrail : this.props.trail,
    {navigator} = this.props

    if (!trail) {
      return <Loading />
    }

    let creator = this.props.user,
      commentsPreview = null,
      toolbar = null

    if (!this.props.preview) {
      creator = trail.creator,
      commentsPreview = <CommentsPreview comments={trail.comments} average={trail.ratingAverage}  />,
      toolbar = (
        <View style={styles.detail.toolbar}>
          <Toolbar
            navigator={navigator}
            type={ACTION_TARGETS.TRAIL}
            data={trail}
          />
        </View>
      )
    }

    let galleryPreview = (trail.photos.length > 0) ? (
      <GalleryPreview navigator={navigator} gallery={trail.photos} />
    ) : null

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={{paddingTop: 44}}>
          <View style={styles.detail.article}>
            <View style={styles.detail.section}>
              <TrailInfo type={trail.type} title={trail.title} date={trail.date}/>
              <TrailData difficultyLevel={trail.difficultyLevel}
                totalDuration={trail.totalDuration}
                totalDistance={trail.totalDistance}
                totalElevation={trail.totalElevation}
                maximumAltitude={trail.maximumAltitude}
                averageSpeed={trail.averageSpeed}
              />
              <View style={[styles.global.map, {marginHorizontal: 15}]}>
                <TrailMap points={trail.points} />
              </View>
              <TrailChart points={trail.points} />
            </View>
            <View style={[styles.detail.section, {marginHorizontal: 15}]}>
              <UserLink user={creator} navigator={navigator} showArrow={true} />
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
  id: PropTypes.string,
  trail: PropTypes.object,
  newTrail: PropTypes.object,
  user: PropTypes.object.isRequired,
  preview: PropTypes.bool
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

