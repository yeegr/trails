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
  Text,
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as areasActions from '../../containers/actions/areasActions'

import Loading from '../shared/Loading'
import ImagePath from '../shared/ImagePath'
import Header from '../shared/Header'
import Intro from '../shared/Intro'
import Icon from '../shared/Icon'
import UserList from '../user/UserList'
import TrailPreview from '../trail/TrailPreview'
import {GalleryPreview} from '../shared/Gallery'
import {CommentPreview} from '../shared/Comments'
import {ASSET_FOLDERS} from '../../../util/constants'
import styles from '../../styles/main'

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
        tags.push(Lang.tagArray[n])
      })
    }

    const url = ImagePath({type: 'hero', path: ASSET_FOLDERS.Area + '/' + area.id + '/' + area.hero})
    //console.log(url)

    setTimeout(() => {
      let paraContent = this.refs.paraContent
    }, 1000)

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView
          backgroundSource={{uri: url}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
              align="bottom"
              title={Lang.cities[area.city] + ' ' + area.name}
              excerpt={area.excerpt}
            />
          )}>
          <View ref="paraContent" style={[styles.detail.article]}>
            <View style={styles.detail.section}>
              <Header text={Lang.Tags} />
              <View style={[styles.detail.grid, {marginTop: 10}]}>
              {
                area.tags.map(function(val, index) {
                  return (
                    <View key={index} style={{marginRight: 10, marginBottom: 10}}>
                      <Icon sideLength={40} type={val} label={Lang.tagList.split(',')[val]} />
                    </View>
                  )
                })
              }
              </View>
            </View>
            <GalleryPreview
              navigator={navigator}
              type={ASSET_FOLDERS.Area}
              id={area._id}
              photos={area.photos}
            />
            <View style={styles.detail.section}>
              <Header text={Lang.Leaders} />
              <View style={styles.detail.content}>
                <UserList navigator={navigator} data={area.leaders} />
              </View>
            </View>
            <TrailPreview navigator={navigator} trails={area.trails} query={`area=` + area.id} title={area.name + Lang.Trails} />
          </View>
        </ParallaxView>
      </View>
    )
  }
}

AreaDetail.propTypes = {
  area: PropTypes.object,
  navigator: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    area: state.areas.area
  }
}

function mapDispatchToProps(dispatch) {
  return {
    areasActions: bindActionCreators(areasActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaDetail)
