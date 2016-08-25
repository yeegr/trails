'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  TabBarIOS,
  View,
  StyleSheet
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as homeActions from '../redux/actions/homeActions'

import {changeTab} from '../redux/actions/homeActions'
import {showLogin} from '../redux/actions/loginActions'
import {HOME_TABS} from '../../util/constants'

import AreaList from './area/AreaList'
import EventList from './event/EventList'
import PostList from './post/PostList'
import UserInfo from './mine/UserInfo'
import {Lang, Graphics} from '../settings'
import styles from '../styles/main'

class Home extends Component {
  constructor(props) {
    super(props)
    this.onTabPressed = this.onTabPressed.bind(this)
  }

  onTabPressed(tabId) {
    if (tabId === HOME_TABS.MINE && !this.props.user) {
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
          title={Lang.Trails}
          icon={{uri: Graphics.tabbar.trail, scale: 3}}
          selected={selectedTab === HOME_TABS.AREAS}
          onPress={() => this.onTabPressed(HOME_TABS.AREAS)}
        >
          <AreaList
            key={'area-list'}
            navigator={navigator}
            params=""
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={Lang.Events}
          icon={{uri: Graphics.tabbar.event, scale: 3}}
          selected={selectedTab === HOME_TABS.EVENTS}
          onPress={() => this.onTabPressed(HOME_TABS.EVENTS)}
        >
          <EventList 
            key={'event-list'}
            navigator={navigator} 
            params=""
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={Lang.Posts}
          icon={{uri: Graphics.tabbar.post, scale: 3}}
          selected={selectedTab === HOME_TABS.POSTS}
          onPress={() => this.onTabPressed(HOME_TABS.POSTS)}
        >
          <PostList
            key={'post-list'}
            navigator={navigator}
            params=""
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={Lang.Mine}
          icon={{uri: Graphics.tabbar.mine, scale: 3}}
          selected={selectedTab === HOME_TABS.MINE}
          onPress={() => this.onTabPressed(HOME_TABS.MINE)}
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

function mapStateToProps(state, ownProps) {
  return {
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