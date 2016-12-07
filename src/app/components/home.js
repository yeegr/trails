'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  TabBarIOS,
  View
} from 'react-native'

import {connect} from 'react-redux'

import {showLogin} from '../redux/actions/loginActions'
import {changeTab} from '../redux/actions/homeActions'

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
} from '../settings'

class Home extends Component {
  constructor(props) {
    super(props)
    this.onTabPressed = this.onTabPressed.bind(this)
  }

  onTabPressed(tabId) {
    if (tabId === CONSTANTS.HOME_TABS.MINE && !this.props.user) {
      this.props.showLogin()
      return false
    }

    this.props.changeTab(tabId)
  }

  render() {
    const {selectedTab, navigator} = this.props

    return (
      <TabBarIOS
        tintColor={Graphics.colors.primary}
      >
        <TabBarIOS.Item
          title={LANG.t('home.Trails')}
          icon={{uri: Graphics.tabbar.trail, scale: 3}}
          selected={selectedTab === CONSTANTS.HOME_TABS.AREAS}
          onPress={() => this.onTabPressed(CONSTANTS.HOME_TABS.AREAS)}
        >
          <View style={styles.global.home}>
            <AreaList
              key={'area-list'}
              navigator={navigator}
              query=""
            />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={LANG.t('home.Events')}
          icon={{uri: Graphics.tabbar.event, scale: 3}}
          selected={selectedTab === CONSTANTS.HOME_TABS.EVENTS}
          onPress={() => this.onTabPressed(CONSTANTS.HOME_TABS.EVENTS)}
        >
          <View style={styles.global.home}>
            <EventList
              key={'event-list'}
              navigator={navigator} 
              query={AppSettings.home.events + this.props.selectedCity}
            />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={LANG.t('home.Posts')}
          icon={{uri: Graphics.tabbar.post, scale: 3}}
          selected={selectedTab === CONSTANTS.HOME_TABS.POSTS}
          onPress={() => this.onTabPressed(CONSTANTS.HOME_TABS.POSTS)}
        >
          <View style={styles.global.home}>
            <PostList
              key={'post-list'}
              navigator={navigator}
              query=""
            />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={LANG.t('home.Mine')}
          icon={{uri: Graphics.tabbar.mine, scale: 3}}
          selected={selectedTab === CONSTANTS.HOME_TABS.MINE}
          onPress={() => this.onTabPressed(CONSTANTS.HOME_TABS.MINE)}
        >
          <UserInfo
            key={'user-info'}
            navigator={navigator}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

Home.propTypes = {
  navigator: PropTypes.object.isRequired,
  showLogin: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    selectedCity: state.navbar.selectedCity,
    selectedTab: state.home.selectedTab,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeTab: (tabId) => dispatch(changeTab(tabId)),
    showLogin: () => dispatch(showLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)