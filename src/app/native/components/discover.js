'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import Header from './shared/Header'
import ImageIcon from './shared/ImageIcon'
import ImagePath from './shared/ImagePath'
import Inset from './shared/Inset'
import Loading from './shared/Loading'
import TextView from './shared/TextView'

import styles from '../styles/main'

import CAMPING from '../../../../assets/Categories/camping.png'
import CLIMBING from '../../../../assets/Categories/climbing.png'
import CYCLING from '../../../../assets/Categories/cycling.png'
import GEAR from '../../../../assets/Categories/gear.png'
import HIKING from '../../../../assets/Categories/hiking.png'
import INTERVIEWS from '../../../../assets/Categories/interviews.png'
import KIDS from '../../../../assets/Categories/kids.png'
import SUMMIT from '../../../../assets/Categories/summit.png'

import {
  CONSTANTS,
  LANG,
  AppSettings,
  Graphics
} from '../../../common/__'

class Discover extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)
    this._fetch = this._fetch.bind(this)

    this.state = {
      main: null
    }
  }

  componentWillMount() {
    this._fetch()
  }

  _fetch() {
    fetch(AppSettings.apiUri + 'settings/latest')
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        main: res.main
      })
    })
    .catch((error) => {
      console.warn(error)
    })
  }

  _nextPage(type) {
    let id = 'PostList',
      title = '',
      query = ''

    switch(type) {
      case 'exp':
        title = LANG.t('discover.Experience')
        query = ''
      break

      case 'new':
        title = LANG.t('discover.New')
        query = ''
      break

      case 'gears':
        title = LANG.t('discover.Gears')
        query = ''
      break

      case 'trails':
        title = LANG.t('discover.Trails')
        query = ''
      break

      case 'interviews':
        title = LANG.t('discover.Interviews')
        query = ''
      break

      case 'sports':
        title = LANG.t('discover.OutdoorSports')
        query = ''
      break

      case 'cycling':
        title = LANG.t('discover.OutdoorCycling')
        query = ''
      break

      case 'leaders':
        id = 'UserList'
        title = LANG.t('discover.MoreLeaders')
        query = ''
      break
    }

    this.props.navigator.push({
      id,
      title,
      passProps: {
        query
      }
    })
  }

  render() {
    const {main} = this.state

    if (!main) {
      return <Loading />
    }

    const url = ImagePath({type: 'hero', path: CONSTANTS.ASSET_FOLDERS.POST + '/' + main._id + '/' + main.hero})

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView
          style={{flex: 1}}
          backgroundSource={{uri: url}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Inset
              align={'bottom'}
              title={main.title}
              excerpt={main.excerpt}
              tags={main.tags}
              topLeft={(
                <TextView
                  style={{marginLeft: 15}}
                  textColor={Graphics.textColors.overlay}
                  text={LANG.t('discover.InterviewThisWeek')}
                />
              )}
            />
          )}>
          <View style={styles.global.article}>
            <View style={[styles.detail.section, {marginTop: 15}]}>
              <Header
                text={LANG.t('discover.LeaderBoard')}
                more={{
                  text: LANG.t('discover.MoreLeaders'),
                  onPress: () => {
                    this._nextPage('leaders')
                  }
                }}
              />
              <View style={styles.detail.grid}>
              </View>
            </View>
            <View style={styles.detail.section}>
              <Header
                text={LANG.t('discover.OutdoorKnowledge')}
              />
              <View style={styles.detail.grid}>
                <ImageIcon
                  onPress={() => this._nextPage('exp')}
                  source={SUMMIT}
                  text={LANG.t('discover.Experience')}
                />
                <ImageIcon
                  onPress={() => this._nextPage('new')}
                  source={KIDS}
                  text={LANG.t('discover.New')}
                />
                <ImageIcon
                  onPress={() => this._nextPage('gears')}
                  source={GEAR}
                  text={LANG.t('discover.Gears')}
                />
                <ImageIcon
                  onPress={() => this._nextPage('trails')}
                  source={HIKING}
                  text={LANG.t('discover.Trails')}
                />
                <ImageIcon
                  onPress={() => this._nextPage('interviews')}
                  source={INTERVIEWS}
                  text={LANG.t('discover.Interviews')}
                />
                <ImageIcon
                  onPress={() => this._nextPage('sports')}
                  source={CLIMBING}
                  text={LANG.t('discover.OutdoorSports')}
                />
                <ImageIcon
                  onPress={() => this._nextPage('cycling')}
                  source={CYCLING}
                  text={LANG.t('discover.OutdoorCycling')}
                />
              </View>
            </View>
          </View>
        </ParallaxView>
      </View>
    )
  }
}

Discover.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default Discover
