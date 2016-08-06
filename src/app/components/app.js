'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Navigator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as homeActions from '../containers/actions/homeActions'
import * as newTrailActions from '../containers/actions/newTrailActions'
import * as newEventActions from '../containers/actions/newEventActions'
import * as eventsActions from '../containers/actions/eventsActions'
import {isLoggedIn} from '../containers/actions/loginActions'
import {
  HOME_TABS,
  ACTION_TARGETS
} from '../../constants'

import Loading from './shared/Loading'
import {NavbarIconButton, NavbarTextButton} from './shared/NavbarButtons'
import Intro from './intro'
import Home from './home'
import Login from './login'
import AreaDetail from './area/AreaDetail'
import TrailList from './trail/TrailList'
import TrailDetail from './trail/TrailDetail'
import RecordTrail from './trail/RecordTrail'
import EditTrail from './trail/EditTrail'
import EditTrailTitle from './trail/EditTrailTitle'
import EditTrailType from './trail/EditTrailType'
import EditTrailDifficulty from './trail/EditTrailDifficulty'
import EditTrailDescription from './trail/EditTrailDescription'
import EditTrailGallery from './trail/EditTrailGallery'
import SearchTrails from './trail/SearchTrails'
import EventList from './event/EventList'
import EventDetail from './event/EventDetail'
import EventOrder from './event/EventOrder'
import SelectOrderGroup from './event/SelectOrderGroup'
import EventPayment from './event/EventPayment'
import OrderDetail from './mine/OrderDetail'
import SearchEvents from './event/SearchEvents'
import EditEvent from './event/EditEvent'
import EditEventHero from './event/EditEventHero'
import EditEventTitle from './event/EditEventTitle'
import EditEventGroups from './event/EditEventGroups'
import EditEventContacts from './event/EditEventContacts'
import EditAttendeeLimits from './event/EditAttendeeLimits'
import AgendaList from './event/AgendaList'
import EditAgenda from './event/EditAgenda'
import EditEventExpenses from './event/EditEventExpenses'
import EditEventGears from './event/EditEventGears'
import EditEventDestination from './event/EditEventDestination'
import EditEventNotes from './event/EditEventNotes'
import EditEventGallery from './event/EditEventGallery'
import PostList from './post/PostList'
import PostDetail from './post/PostDetail'
import SearchPosts from './post/SearchPosts'
import AboutUs from './mine/AboutUs'
import EditAccount from './mine/EditAccount'
import EditUserAvatar from './mine/EditUserAvatar'
import EditUserHandle from './mine/EditUserHandle'
import EditUserMobile from './mine/EditUserMobile'
import EditUserLevel from './mine/EditUserLevel'
import EditUserName from './mine/EditUserName'
import EditUserPID from './mine/EditUserPID'
import UserDetail from './user/UserDetail'
import Gallery from './shared/Gallery'

import TextView from './shared/TextView'

import styles from '../styles/main'

const NavigationBarRouteMapper = (tabId) => ({
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null
    }

    let previousRoute = navState.routeStack[index - 1]

    return (
      <NavbarIconButton
        onPress={() => navigator.pop()}
        icon={Graphics.titlebar.prev}
        label={previousRoute.title}
        showLabel={true}
      />
    )
  },

  RightButton: function(route, navigator, index, navState) {
    let rightTitleBar = null

    switch (route.id) {
      case 'Home':
        switch (tabId) {
          case HOME_TABS.MINE:
            rightTitleBar = <View style={styles.navbar.toolbar}></View>
          break

          case HOME_TABS.POSTS:
            rightTitleBar = (
              <View style={styles.navbar.toolbar}>
                <NavbarIconButton
                  onPress={() => navigator.push(search(tabId))}
                  icon={Graphics.titlebar.search}
                  label={Lang.Search}
                  showLabel={false}
                />
              </View>
            )
          break

          default:
            rightTitleBar = (
              <View style={styles.navbar.toolbar}>
                <NavbarIconButton
                  onPress={() => navigator.push(search(tabId))}
                  icon={Graphics.titlebar.search}
                  label={Lang.Search}
                  showLabel={false}
                />
                <NavbarIconButton
                  onPress={() => navigator.push(add(tabId))}
                  icon={Graphics.titlebar.add}
                  label={Lang.Add}
                  showLabel={false}
                />
              </View>
            )
          break
        }
      break

      case 'Search':
        rightTitleBar = <NavbarTextButton onPress={null} label={Lang.Search} />
      break

      case 'EditTrail':
        rightTitleBar = <NavbarTextButton onPress={() => save(ACTION_TARGETS.TRAIL)} label={Lang.Save} />
      break

      case 'EditEvent':
        rightTitleBar = <NavbarTextButton onPress={() => save(ACTION_TARGETS.EVENT)} label={Lang.Save} />
      break
    }

    return rightTitleBar
  },

  Title: function(route, navigator, index, navState) {
    var title = (index === 0) ? Lang[((tabId === HOME_TABS.AREAS) ? HOME_TABS.TRAILS : tabId)] : route.title

    return (
      <TextView style={{marginVertical: 5, fontWeight: '400'}} fontSize='XXL' textColor={Graphics.textColors.overlay} text={title} />
    )
  }
})

function save(type) {
  switch(type) {
    case ACTION_TARGETS.TRAIL:
      
    break
  }
}

function search(type) {
  let id = '', title = ''

  switch (type) {
    case HOME_TABS.AREAS:
      id = 'SearchTrails'
      title = Lang[HOME_TABS.TRAILS]
    break

    case HOME_TABS.EVENTS:
      id = 'SearchEvents'
      title = Lang[HOME_TABS.EVENTS]
    break

    case HOME_TABS.POSTS:
      id = 'SearchPosts'
      title = Lang[HOME_TABS.POSTS]
    break
  }

  return {
    id,
    title: Lang.Search + title
  }
}

function add(type) {
  var id = null,
    title = ''

  switch (type) {
    case HOME_TABS.AREAS:
    case HOME_TABS.TRAILS:
      id = 'RecordTrail',
      title = Lang.AddTrail
    break

    case HOME_TABS.EVENTS:
      id = 'EditEvent',
      title = Lang.AddEvent
    break
  }

  return {
    id: id,
    title: title
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showIntro: true
    }
  }

  fetchSettings() {
    fetch(AppSettings.apiUri + 'settings/latest')
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData)
    })
    .catch((error) => {
      console.warn(error)
    })
  }

  componentDidMount() {
    this.props.isLoggedIn()
    //this.fetchSettings()
    //this.fetchUser(token)
  }

  render() {
    /*
    if (this.props.showIntro) {
      return <Intro />
    }
    */

    return (
      <View style={{flex: 1}}>
        <Navigator
          debugOverlay={false}
          style={{flex: 1}}
          initialRoute={{
            id: 'Home',
            type: 'Home',
            title: Lang.Home
          }}
          renderScene={(route, navigator) => {
            switch (route.id) {
              case 'Home':
                return (<Home
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'UserDetail':
                return (<UserDetail
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'SearchTrails':
                return (<SearchTrails
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'SearchEvents':
                return (<SearchEvents
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'SearchPosts':
                return (<SearchPosts
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'AreaDetail':
                return (<AreaDetail
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'Gallery':
                return (
                  <ScrollView style={styles.global.main}>
                    <Gallery navigator={navigator} route={route} {...route.passProps} />
                  </ScrollView>
                )

              case 'TrailList':
                return (
                  <ScrollView style={styles.global.main}>
                    <TrailList 
                      navigator={navigator} 
                      route={route} {...route.passProps}
                    />
                  </ScrollView>
                )

              case 'TrailDetail':
                return (<TrailDetail
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'RecordTrail':
                return (<RecordTrail
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditTrail':
                return (<EditTrail
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditTrailTitle':
                return (<EditTrailTitle
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditTrailType':
                return (<EditTrailType
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditTrailDifficulty':
                return (<EditTrailDifficulty
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditTrailDescription':
                return (<EditTrailDescription
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditTrailGallery':
                return (<EditTrailGallery
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EventList':
                return (
                  <ScrollView style={[styles.global.main, {paddingTop: 80}]}>
                    <EventList 
                      navigator={navigator} 
                      route={route} {...route.passProps}
                    />
                  </ScrollView>
                )

              case 'EventDetail':
                return (<EventDetail
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EventOrder':
                return (<EventOrder
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'SelectOrderGroup':
                return (<SelectOrderGroup
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EventPayment':
                return (<EventPayment
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'OrderDetail':
                return (<OrderDetail
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditEvent':
                return (<EditEvent
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditEventHero':
                return (<EditEventHero
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditEventTitle':
                return (<EditEventTitle
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditEventGroups':
                return (<EditEventGroups
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditEventContacts':
                return (<EditEventContacts
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditAttendeeLimits':
                return (<EditAttendeeLimits
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'AgendaList':
                return (<AgendaList
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditAgenda':
                return (<EditAgenda
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditEventExpenses':
                return (<EditEventExpenses
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditEventGears':
                return (<EditEventGears
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditEventDestination':
                return (<EditEventDestination
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditEventNotes':
                return (<EditEventNotes
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditEventGallery':
                return (<EditEventGallery
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'PostList':
                return (
                  <ScrollView style={styles.global.main}>
                    <PostList 
                      navigator={navigator} 
                      route={route} {...route.passProps}
                    />
                  </ScrollView>
                )

              case 'PostDetail':
                return (<PostDetail
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'AboutUs':
                return (<AboutUs
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditAccount':
                return (<EditAccount
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditUserAvatar':
                return (<EditUserAvatar
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditUserHandle':
                return (<EditUserHandle
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditUserMobile':
                return (<EditUserMobile
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditUserPersonalId':
                return (<EditUserPersonalId
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditUserLevel':
                return (<EditUserLevel
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditUserName':
                return (<EditUserName
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)

              case 'EditUserPID':
                return (<EditUserPID
                  navigator={navigator}
                  route={route} {...route.passProps}
                />)
            }
          }}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={NavigationBarRouteMapper(this.props.selectedTab)}
              style={styles.navbar.wrapper}
            />
          }
        />
        <Login showLogin={this.props.showLogin} />
      </View>
    )
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    selectedTab: state.home.selectedTab,
    showLogin: state.login.showLogin,
    showIntro: state.intro.showIntro
  }
}

function mapDispatchToProps(dispatch) {
  return {
    isLoggedIn: () => dispatch(isLoggedIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)