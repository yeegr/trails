'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  TabBarIOS,
  View
} from 'react-native'

import {
  RNLocation as Location
} from 'NativeModules'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showLogin} from '../../redux/actions/userActions'
import {changeTab} from '../../redux/actions/homeActions'

import Discover from './discover'
import AreaList from './area/AreaList'
import EventList from './event/EventList'
import PostList from './post/PostList'
import UserInfo from './mine/UserInfo'

import styles from '../styles/main'

import {
  CONSTANTS,
  LANG,
  AppSettings,
  Graphics
} from '../../../common/__'

class Home extends Component {
  constructor(props) {
    super(props)
    this._onTabPressed = this._onTabPressed.bind(this)
  }

  componentDidMount() {
    Location.requestAlwaysAuthorization()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.newTrail.isFinal && nextProps.newTrail.isFinal) {
      this.props.navigator.push({
        id: 'EditTrail',
        title: LANG.t('trail.EditTrail')
      })
    }
  }

  _onTabPressed(tabId) {
    if (tabId === CONSTANTS.HOME_TABS.MINE && !this.props.user) {
      this.props.showLogin()
      return false
    }

    this.props.changeTab(tabId)
  }

  render() {
    const {navigator, selectedTab} = this.props

    return (
      <TabBarIOS tintColor={Graphics.colors.primary}>
        <TabBarIOS.Item
          title={LANG.t('home.Trails')}
          icon={{uri: Graphics.tabbar.trail, scale: 3}}
          selected={selectedTab === CONSTANTS.HOME_TABS.AREAS}
          onPress={() => this._onTabPressed(CONSTANTS.HOME_TABS.AREAS)}
        >
          <View style={styles.global.home}>
            <AreaList
              key={CONSTANTS.HOME_TABS.AREAS}
              navigator={navigator}
              scrollEnabled={true}
              query={AppSettings.home.areas + AppSettings.currentCity}
            />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={LANG.t('home.Events')}
          icon={{uri: Graphics.tabbar.calendar, scale: 3}}
          selected={selectedTab === CONSTANTS.HOME_TABS.EVENTS}
          onPress={() => this._onTabPressed(CONSTANTS.HOME_TABS.EVENTS)}
        >
          <View style={styles.global.home}>
            <EventList
              key={CONSTANTS.HOME_TABS.EVENTS}
              navigator={navigator}
              scrollEnabled={true}
              query={AppSettings.home.events + AppSettings.currentCity}
            />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={LANG.t('home.Discover')}
          icon={{uri: Graphics.tabbar.compass, scale: 3}}
          selected={selectedTab === CONSTANTS.HOME_TABS.DISCOVER}
          onPress={() => this._onTabPressed(CONSTANTS.HOME_TABS.DISCOVER)}
        >
          <View style={styles.global.home}>
            <Discover
              key={CONSTANTS.HOME_TABS.DISCOVER}
              navigator={navigator}
            />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={LANG.t('home.Mine')}
          icon={{uri: Graphics.tabbar.profile, scale: 3}}
          selected={selectedTab === CONSTANTS.HOME_TABS.MINE}
          onPress={() => this._onTabPressed(CONSTANTS.HOME_TABS.MINE)}
        >
          <UserInfo
            key={CONSTANTS.HOME_TABS.MINE}
            navigator={navigator}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}
/*
            <PostList
              key={'post-list'}
              navigator={navigator}
              scrollEnabled={true}
              query={''}
            />
*/

Home.propTypes = {
  navigator: PropTypes.object.isRequired,
  user: PropTypes.object,
  newTrail: PropTypes.object.isRequired,
  selectedTab: PropTypes.string.isRequired,
  showLogin: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.login.user,
    newTrail: state.newTrail,
    selectedTab: state.home.selectedTab
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeTab: (tabId) => dispatch(changeTab(tabId)),
    showLogin: bindActionCreators(showLogin, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)