'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as areasActions from '../../redux/actions/areasActions'

import Loading from '../shared/Loading'
import Header from '../shared/Header'
import Icon from '../shared/Icon'
import ImagePath from '../shared/ImagePath'
import Intro from '../shared/Intro'
import UserList from '../user/UserList'
import TrailPreview from '../trail/TrailPreview'
import GalleryPreview from '../shared/GalleryPreview'
//import CommentPreview from '../shared/CommentPreview'

import styles from '../../styles/main'

import {
  CONSTANTS,
  LANG,
  Graphics
} from '../../settings'

class AreaDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      paraHeight: 300
    }
  }

  componentWillMount() {
    this.props.areasActions.getArea(this.props.id)
  }

  render() {
    const {area, navigator} = this.props

    if (!area) {
      return <Loading />
    }

    let tags = []

    if (area.tags.length > 0) {
      area.tags.map(function(n) {
        tags.push(LANG.t('tags.' + n))
      })
    }

    const url = ImagePath({type: 'hero', path: CONSTANTS.ASSET_FOLDERS.AREA + '/' + area.id + '/' + area.hero})

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView
          backgroundSource={{uri: url}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
              align={'bottom'}
              title={LANG.t('cities.byCode.' + area.city) + ' ' + area.name}
              excerpt={area.excerpt}
            />
          )}>
          <View style={[styles.detail.article]}>
            <View style={styles.detail.section}>
              <Header text={LANG.t('Tags')} />
              <View style={styles.detail.grid}>
              {
                area.tags.map(function(n) {
                  return (
                    <View key={n} style={styles.detail.icon}>
                      <Icon
                        sideLength={40}
                        stack={'vertical'} 
                        type={n.toString()}
                        valueColor={Graphics.icon.labelColor}
                        value={LANG.t('tags.' + n)}
                      />
                    </View>
                  )
                })
              }
              </View>
            </View>
            <GalleryPreview
              navigator={navigator}
              type={CONSTANTS.ASSET_FOLDERS.AREA}
              id={area._id}
              photos={area.photos}
            />
            <View style={styles.detail.section}>
              <Header text={LANG.t('area.Leaders')} />
              <View style={styles.detail.content}>
                <UserList navigator={navigator} data={area.leaders} />
              </View>
            </View>
            <TrailPreview
              navigator={navigator}
              trails={area.trails}
              query={'?area=' + area.id}
              title={area.name + LANG.t('trail.trail_plural')}
            />
          </View>
        </ParallaxView>
      </View>
    )
  }
}

AreaDetail.propTypes = {
  navigator: PropTypes.object.isRequired,
  areasActions: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  area: PropTypes.object,
  user: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    area: state.areas.area,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    areasActions: bindActionCreators(areasActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaDetail)
