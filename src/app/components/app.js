'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Alert,
  Navigator,
  ScrollView,
  View,
} from 'react-native'

import {connect} from 'react-redux'

import * as loginActions from '../redux/actions/loginActions'
import * as newTrailActions from '../redux/actions/newTrailActions'
import * as newEventActions from '../redux/actions/newEventActions'
import * as navbarActions from '../redux/actions/navbarActions'

import Home from './home'
import Login from './login'
import AreaDetail from './area/AreaDetail'
import TrailList from './trail/TrailList'
import TrailDetail from './trail/TrailDetail'
import RecordTrail from './trail/RecordTrail'
import EditTrail from './trail/EditTrail'
import EditTrailTitle from './trail/EditTrailTitle'
import EditTrailType from './trail/EditTrailType'
import TrailAreaPicker from './trail/TrailAreaPicker'
import EditTrailDifficulty from './trail/EditTrailDifficulty'
import EditTrailDescription from './trail/EditTrailDescription'
import EditTrailGallery from './trail/EditTrailGallery'
import SearchTrails from './trail/SearchTrails'
import EventList from './event/EventList'
import EventDetail from './event/EventDetail'
import EventOrder from './event/EventOrder'
import SelectOrderGroup from './event/SelectOrderGroup'
import EventPayment from './event/EventPayment'
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
import EventSubmitted from './event/EventSubmitted'
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
import EventManager from './mine/EventManager'
import SignUpList from './mine/SignUpList'
import OrderList from './mine/OrderList'
import OrderDetail from './mine/OrderDetail'
import UserDetail from './user/UserDetail'

import Comments from './shared/Comments'
import Gallery from './shared/Gallery'
import Intro from './intro'
import Loading from './shared/Loading'
import NavbarButton from './shared/NavbarButton'
import TextView from './shared/TextView'

import {
  CONSTANTS,
  AppSettings,
  Lang,
  Graphics
} from '../settings'

import styles from '../styles/main'

const NavigationBarRouteMapper = (tabId, login, dispatch) => ({
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null
    }

    let previousRoute = navState.routeStack[index - 1]

    return (
      <NavbarButton
        onPress={() => this.back(navigator, route.id)}
        icon={Graphics.titlebar.prev}
        label={previousRoute.title}
        showLabel={false}
      />
    )
  },

  RightButton: function(route, navigator, index, navState) {
    let rightTitleBar = null

    switch (route.id) {
      case 'Home':
        switch (tabId) {
          case CONSTANTS.HOME_TABS.MINE:
            rightTitleBar = (
              <View style={styles.navbar.toolbar}>
              </View>
            )
          break

          case CONSTANTS.HOME_TABS.POSTS:
            rightTitleBar = (
              <View style={styles.navbar.toolbar}>
                <NavbarButton
                  onPress={() => navigator.push(this.search(tabId))}
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
                <NavbarButton
                  onPress={() => navigator.push(this.search(tabId))}
                  icon={Graphics.titlebar.search}
                  label={Lang.Search}
                  showLabel={false}
                />
                <NavbarButton
                  onPress={() => this.add(navigator, tabId)}
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
        rightTitleBar = (
          <NavbarButton
            onPress={null}
            label={Lang.Search}
          />
        )
      break

      case 'EventOrder':
        rightTitleBar = (
          <NavbarButton
            onPress={() => dispatch(navbarActions.addEventSignUp())}
            icon={Graphics.titlebar.add}
            label={Lang.Add}
            showLabel={false}
          />
        )
      break

      case 'AgendaList':
        rightTitleBar = <NavbarButton
          onPress={() => {
            navigator.push({
              id: 'EditAgenda',
              title: Lang.Add + Lang.Agenda,
              passProps: {
                mode: 'new'
              }
            })
          }}
          icon={Graphics.titlebar.add}
          label={Lang.Add}
          showLabel={false}
        />
      break

      case 'EditAgenda':
        rightTitleBar = (
          <NavbarButton
            onPress={() => this.save(CONSTANTS.ACTION_TARGETS.AGENDA)}
            label={Lang.Save}
          />
        )
      break

      case 'EditTrail':
        rightTitleBar = (
          <NavbarButton
            onPress={() => this.save(CONSTANTS.ACTION_TARGETS.TRAIL)}
            label={Lang.Save}
          />
        )
      break

      case 'EditEvent':
        rightTitleBar = (
          <NavbarButton
            onPress={() => this.save(CONSTANTS.ACTION_TARGETS.EVENT)}
            label={Lang.Save}
          />
        )
      break

      case 'EditUserAvatar':
        rightTitleBar = (
          <NavbarButton
            onPress={() => this.save(CONSTANTS.ACCOUNT_ACTIONS.SAVE_AVATAR)}
            label={Lang.Save}
          />
        )
      break
    }

    return rightTitleBar
  },

  Title: function(route, navigator, index, navState) {
    var title = (index === 0) ? Lang[((tabId === CONSTANTS.HOME_TABS.AREAS) ? CONSTANTS.HOME_TABS.TRAILS : tabId)] : route.title

    return (
      <TextView style={{marginVertical: 5, fontWeight: '400'}} fontSize='XXL' textColor={Graphics.textColors.overlay} text={title} />
    )
  },

  search: function(type) {
    let id = '', title = ''

    switch (type) {
      case CONSTANTS.HOME_TABS.AREAS:
        id = 'SearchTrails'
        title = Lang[CONSTANTS.HOME_TABS.TRAILS]
      break

      case CONSTANTS.HOME_TABS.EVENTS:
        id = 'SearchEvents'
        title = Lang[CONSTANTS.HOME_TABS.EVENTS]
      break

      case CONSTANTS.HOME_TABS.POSTS:
        id = 'SearchPosts'
        title = Lang[CONSTANTS.HOME_TABS.POSTS]
      break
    }

    return {
      id,
      title: Lang.Search + title
    }
  },

  back: function(navigator, routeId) {
    switch (routeId) {
      case 'EditEvent':
        Alert.alert(
          Lang.AreYouSure,
          Lang.ExitAlert,
          [
            {text: Lang.Cancel},
            {text: Lang.Confirm, onPress: () => navigator.pop()}
          ]
        )
      break
      
      default:
        navigator.pop()
      break
    }
  },

  add: function(navigator, type) {
    if (login.user) {
      var id = null,
        title = ''

      switch (type) {
        case CONSTANTS.HOME_TABS.AREAS:
        case CONSTANTS.HOME_TABS.TRAILS:
          id = 'RecordTrail',
          title = Lang.AddTrail
        break

        case CONSTANTS.HOME_TABS.EVENTS:
          id = 'EditEvent',
          title = Lang.AddEvent
        break
      }

      navigator.push({
        id: id,
        title: title
      })
    } else {
      dispatch(loginActions.showLogin())      
    }
  },

  save: function(type) {
    if (login.user) {
      switch (type) {
        case CONSTANTS.ACTION_TARGETS.TRAIL:
          dispatch(newTrailActions.saveTrail())
        break

        case CONSTANTS.ACTION_TARGETS.EVENT:
          dispatch(newEventActions.saveEvent())
        break

        case CONSTANTS.ACTION_TARGETS.AGENDA:
          dispatch(navbarActions.saveAgenda())
        break

        case CONSTANTS.ACCOUNT_ACTIONS.SAVE_AVATAR:
          dispatch(loginActions.updateUserAvatar(login.user._id, login.tmpAvatarUri))
        break
      }
    } else {
      dispatch(loginActions.showLogin())      
    }
  }
})

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(loginActions.isLoggedIn())
    //this.fetchSettings()
    //this.fetchUser(token)
  }

  fetchSettings() {
    fetch(AppSettings.apiUri + 'settings/latest')
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.warn(error)
    })
  }

  render() {
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
                return (
                  <Home
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'UserDetail':
                return (
                  <UserDetail
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'SearchTrails':
                return (
                  <SearchTrails
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'SearchEvents':
                return (
                  <SearchEvents
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'SearchPosts':
                return (
                  <SearchPosts
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'AreaDetail':
                return (
                  <AreaDetail
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
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
                return (
                  <TrailDetail
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'RecordTrail':
                return (
                  <RecordTrail
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditTrail':
                return (
                  <EditTrail
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditTrailTitle':
                return (
                  <EditTrailTitle
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'TrailAreaPicker':
                return (
                  <TrailAreaPicker
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditTrailType':
                return (
                  <EditTrailType
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditTrailDifficulty':
                return (
                  <EditTrailDifficulty
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditTrailDescription':
                return (
                  <EditTrailDescription
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditTrailGallery':
                return (
                  <EditTrailGallery
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EventList':
                return (
                  <ScrollView style={styles.global.main}>
                    <EventList 
                      navigator={navigator} 
                      route={route} {...route.passProps}
                    />
                  </ScrollView>
                )

              case 'EventDetail':
                return (
                  <EventDetail
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EventOrder':
                return (
                  <EventOrder
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'SelectOrderGroup':
                return (
                  <SelectOrderGroup
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EventPayment':
                return (
                  <EventPayment
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEvent':
                return (
                  <EditEvent
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventHero':
                return (
                  <EditEventHero
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventTitle':
                return (
                  <EditEventTitle
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventGroups':
                return (
                  <EditEventGroups
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventContacts':
                return (
                  <EditEventContacts
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditAttendeeLimits':
                return (
                  <EditAttendeeLimits
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'AgendaList':
                return (
                  <AgendaList
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditAgenda':
                return (
                  <EditAgenda
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventExpenses':
                return (
                  <EditEventExpenses
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventGears':
                return (
                  <EditEventGears
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventDestination':
                return (
                  <EditEventDestination
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventNotes':
                return (
                  <EditEventNotes
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventGallery':
                return (
                  <EditEventGallery
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EventSubmitted':
                return (
                  <EventSubmitted
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

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
                return (
                  <PostDetail
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'AboutUs':
                return (
                  <AboutUs
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditAccount':
                return (
                  <EditAccount
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditUserAvatar':
                return (
                  <EditUserAvatar
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditUserHandle':
                return (
                  <EditUserHandle
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditUserMobile':
                return (
                  <EditUserMobile
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditUserLevel':
                return (
                  <EditUserLevel
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditUserName':
                return (
                  <EditUserName
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditUserPID':
                return (
                  <EditUserPID
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EventManager':
                return (
                  <ScrollView style={styles.global.main}>
                    <EventManager
                      navigator={navigator}
                      route={route} {...route.passProps}
                    />
                  </ScrollView>
                )

              case 'SignUpList':
                return (
                  <SignUpList
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'OrderList':
                return (
                  <ScrollView style={styles.global.main}>
                    <OrderList
                      navigator={navigator}
                      route={route} {...route.passProps}
                    />
                  </ScrollView>
                )

              case 'OrderDetail':
                return (
                  <OrderDetail
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'Comments':
                return (
                  <Comments 
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'Gallery':
                return (
                  <ScrollView style={styles.global.main}>
                    <Gallery 
                      navigator={navigator}
                      route={route} {...route.passProps}
                    />
                  </ScrollView>
                )
            }
          }}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={NavigationBarRouteMapper(this.props.selectedTab, this.props.login, this.props.dispatch)}
              style={styles.navbar.wrapper}
            />
          }
        />
        <Login showLogin={this.props.login.showLogin} />
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectedTab: state.home.selectedTab,
    showIntro: state.intro.showIntro,
    login: state.login
  }
}

/*
function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}
*/

export default connect(mapStateToProps)(App)