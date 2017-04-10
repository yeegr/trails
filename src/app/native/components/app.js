'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Alert,
  AsyncStorage,
  Navigator,
  ScrollView,
  View,
} from 'react-native'

import {connect} from 'react-redux'
import * as loginActions from '../../redux/actions/loginActions'
import * as introActions from '../../redux/actions/introActions'
import * as newTrailActions from '../../redux/actions/newTrailActions'
import * as newEventActions from '../../redux/actions/newEventActions'

import Home from './home'
import Login from './login'
import AreaDetail from './area/AreaDetail'
import TrailList from './trail/TrailList'
import TrailDetail from './trail/TrailDetail'
import TrailMapFull from './trail/TrailMapFull'
import RecordTrail from './trail/RecordTrail'
import EditTrail from './trail/EditTrail'
import EditTrailTitle from './trail/EditTrailTitle'
import EditTrailType from './trail/EditTrailType'
import SelectTrailAreas from './trail/SelectTrailAreas'
import EditTrailDifficulty from './trail/EditTrailDifficulty'
import EditTrailDescription from './trail/EditTrailDescription'
import EditTrailGallery from './trail/EditTrailGallery'
import SearchTrails from './trail/SearchTrails'
import EventList from './event/EventList'
import EventDetail from './event/EventDetail'

import SearchEvents from './event/SearchEvents'
import EditEvent from './event/EditEvent'
import EditEventBase from './event/EditEventBase'
import EditEventHero from './event/EditEventHero'
import EditEventTitle from './event/EditEventTitle'
import EditEventDifficulty from './event/EditEventDifficulty'
import EditEventDates from './event/EditEventDates'
import EditEventContacts from './event/EditEventContacts'
import EditAttendeeLimits from './event/EditAttendeeLimits'
import SelectTrail from './event/SelectTrail'
import EditAgenda from './event/EditAgenda'
import EditExpenses from './event/EditExpenses'
import EditExpensesDetails from './event/EditExpensesDetails'
import EditExpensesIncludes from './event/EditExpensesIncludes'
import EditExpensesExcludes from './event/EditExpensesExcludes'
import EditGears from './event/EditGears'
import EditGearImages from './event/EditGearImages'
import EditGearTags from './event/EditGearTags'
import EditGearNotes from './event/EditGearNotes'
import EditEventInfo from './event/EditEventInfo'
import EditEventDescription from './event/EditEventDescription'
import EditEventExcerpt from './event/EditEventExcerpt'
import EditEventTags from './event/EditEventTags'
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
import EditUserIntro from './mine/EditUserIntro'
import MyEvents from './mine/MyEvents'
import EventManager from './mine/EventManager'
import SignUpList from './mine/SignUpList'
import WebStore from './mine/WebStore'

import OrderEvent from './order/OrderEvent'
import SelectOrderGroup from './order/SelectOrderGroup'
import OrderPayment from './order/OrderPayment'
import OrderSummary from './order/OrderSummary'
import OrderSuccess from './order/OrderSuccess'

import MyTrails from './mine/MyTrails'
import MyOrders from './mine/MyOrders'
import OrderDetail from './order/OrderDetail'
import UserDetail from './user/UserDetail'

import Comments from './shared/Comments'
import Gallery from './shared/Gallery'
import ImagePicker from './shared/ImagePicker'

import Intro from './intro'
import NavbarButton from './shared/NavbarButton'
import TextView from './shared/TextView'

import Upcoming from './shared/Upcoming'

import {
  CONSTANTS,
  LANG,
  UTIL,
  AppSettings,
  Graphics
} from '../../../common/__'

import Device from '../device'

import styles from '../styles/main'

const NavigationBarRouteMapper = (tabId, state, dispatch) => ({
  login: state.login,
  user: state.login.user,
  newTrail: state.newTrail,

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
    let rightTitleBar = null,
      passProps = UTIL.getPassProps(navigator)

    switch (route.id) {
      case 'Home':
        switch (tabId) {
          case CONSTANTS.HOME_TABS.MINE:
            rightTitleBar = null
          break

          case CONSTANTS.HOME_TABS.POSTS:
            rightTitleBar = (
              <View style={styles.navbar.toolbar}>
                <NavbarButton
                  onPress={() => navigator.push(this.search(tabId))}
                  icon={Graphics.titlebar.search}
                  label={LANG.t('navbar.Search')}
                  showLabel={false}
                />
              </View>
            )
          break

          case CONSTANTS.HOME_TABS.AREAS:
            rightTitleBar = (
              <View style={styles.navbar.toolbar}>
                <NavbarButton
                  onPress={() => navigator.push(this.search(tabId))}
                  icon={Graphics.titlebar.search}
                  label={LANG.t('navbar.Search')}
                  showLabel={false}
                />
                <NavbarButton
                  onPress={() => this.add(navigator, tabId)}
                  icon={this.newTrail.isNew ? Graphics.titlebar.add : Graphics.titlebar.hiking}
                  label={LANG.t('navbar.Add')}
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
                  label={LANG.t('navbar.Search')}
                  showLabel={false}
                />
                <NavbarButton
                  onPress={() => this.add(navigator, tabId)}
                  icon={Graphics.titlebar.add}
                  label={LANG.t('navbar.Add')}
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
            label={LANG.t('glossary.Search')}
          />
        )
      break

      case 'TrailDetail':
        if (!passProps.isPreview && !passProps.isReview) {
          rightTitleBar = (
            <NavbarButton
              onPress={() => this.trackTrail(navigator)}
              label={LANG.t('trail.TrackTrail')}
              showLabel={true}
            />
          )
        }
      break

      case 'EventDetail':
        if (passProps.isPreview) {
          rightTitleBar = (
            <NavbarButton
              onPress={() => this.save(CONSTANTS.ACTION_TARGETS.EVENT)}
              label={LANG.t('glossary.Save')}
            />
          )
        } else if (passProps.isReview) {
          rightTitleBar = (
            <NavbarButton
              onPress={() => this.editEvent(navigator)}
              label={LANG.t('glossary.Edit')}
            />
          )
        } else {
          rightTitleBar = (
            <NavbarButton
              onPress={() => this.signUp(navigator)}
              label={LANG.t('order.SignUpNow')}
            />
          )
        }
      break

      case 'OrderEvent':
        rightTitleBar = (
          <NavbarButton
            onPress={navigator.__addSignUp}
            icon={Graphics.titlebar.add}
            label={LANG.t('order.AddSignUp')}
            showLabel={false}
          />
        )
      break

      case 'EditAgenda':
        rightTitleBar = (
          <NavbarButton
            onPress={() => this.save(CONSTANTS.ACTION_TARGETS.AGENDA, navigator)}
            label={LANG.t('agenda.Save')}
          />
        )
      break

      case 'EditEventDates':
        rightTitleBar = (
          <NavbarButton
            onPress={navigator.__addDate}
            icon={Graphics.titlebar.add}
            label={LANG.t('event.edit.AddDate')}
            showLabel={false}
          />
        )
      break

      case 'RecordTrail':
        rightTitleBar = (
          <NavbarButton
            onPress={navigator.__editTrail}
            label={LANG.t('glossary.Save')}
          />
        )
      break

      case 'EditTrail':
        rightTitleBar = (
          <NavbarButton
            onPress={() => this.save(CONSTANTS.ACTION_TARGETS.TRAIL)}
            label={LANG.t('glossary.Save')}
          />
        )
      break

      case 'EditEvent':
        rightTitleBar = (
          <NavbarButton
            onPress={() => this.save(CONSTANTS.ACTION_TARGETS.EVENT)}
            label={LANG.t('glossary.Save')}
          />
        )
      break

      case 'EditUserAvatar':
        rightTitleBar = (
          <NavbarButton
            onPress={() => this.save(CONSTANTS.ACCOUNT_ACTIONS.SAVE_AVATAR)}
            label={LANG.t('glossary.Save')}
          />
        )
      break
    }

    return rightTitleBar
  },

  Title: (route, navigator, index, navState) => {
    let title = (index === 0) ? ((tabId === CONSTANTS.HOME_TABS.AREAS) ? LANG.t('home.' + CONSTANTS.HOME_TABS.TRAILS) : LANG.t('home.' + tabId)) : route.title

    return (
      <TextView
        style={{marginVertical: 5, fontWeight: '400'}}
        fontSize={'XXL'}
        textColor={Graphics.textColors.overlay}
        text={title}
      />
    )
  },

  editEvent: function(navigator) {
    if (this.user) {
      navigator.__editEvent()
    } else {
      dispatch(loginActions.showLogin())      
    }
  },

  trackTrail: function(navigator) {
    if (this.user) {
      navigator.__trackTrail()
    } else {
      dispatch(loginActions.showLogin())      
    }
  },

  signUp: function(navigator) {
    if (this.user) {
      let {event} = state.events,
        id = 'OrderEvent',
        title = LANG.t('order.SignUpNow')

      if (event.groups.length > 1) {
        id = 'SelectOrderGroup',
        title = LANG.t('order.SelectOrderGroup')
      } 

      navigator.push({
        id,
        title,
        passProps: {
          event
        }
      })
    } else {
      dispatch(loginActions.showLogin())      
    }
  },

  search: (type) => {
    let id = '', title = ''

    switch (type) {
      case CONSTANTS.HOME_TABS.AREAS:
        id = 'SearchTrails'
        title = LANG.t('trail.search.SearchTrail')
      break

      case CONSTANTS.HOME_TABS.EVENTS:
        id = 'SearchEvents'
        title = LANG.t('event.search.SearchEvent')
      break

      case CONSTANTS.HOME_TABS.POSTS:
        id = 'SearchPosts'
        title = LANG.t('post.search.SearchPost')
      break
    }

    return {
      id,
      title,
      type
    }
  },

  back: (navigator, routeId) => {
    switch (routeId) {
      case 'EditTrail':
        if (state.newTrail.isSaved === false) {
          Alert.alert(
            LANG.t('trail.edit.BackAlert.title'),
            LANG.t('trail.edit.BackAlert.description'),
            [
              {text: LANG.t('trail.edit.BackAlert.cancel')},
              {text: LANG.t('trail.edit.BackAlert.confirm'), onPress: () => navigator.pop()}
            ]
          )
        }
      break
      
      case 'EditEvent':
        Alert.alert(
          LANG.t('event.edit.BackAlert.title'),
          LANG.t('event.edit.BackAlert.description'),
          [
            {text: LANG.t('event.edit.BackAlert.cancel')},
            {text: LANG.t('event.edit.BackAlert.confirm'), onPress: () => navigator.pop()}
          ]
        )
      break
      
      default:
        navigator.pop()
      break
    }
  },

  add: function(navigator, type) {
    if (this.user) {
      switch (type) {
        case CONSTANTS.HOME_TABS.AREAS:
        case CONSTANTS.HOME_TABS.TRAILS:
          dispatch(newTrailActions.showRecorder())
        break

        case CONSTANTS.HOME_TABS.EVENTS:
          let id = 'EditEvent',
            title = LANG.t('add.AddEvent')

          navigator.push({
            id: id,
            title: title
          })
        break
      }
    } else {
      dispatch(loginActions.showLogin())
    }
  },

  save: function(type) {
    if (this.user) {
      switch (type) {
        case CONSTANTS.ACTION_TARGETS.TRAIL:
          dispatch(newTrailActions.saveTrail())
        break

        case CONSTANTS.ACTION_TARGETS.EVENT:
          dispatch(newEventActions.saveEvent())
        break

        case CONSTANTS.ACCOUNT_ACTIONS.SAVE_AVATAR:
          dispatch(loginActions.updateUserAvatar(this.user._id, this.login.tmpAvatarUri))
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

  componentWillMount() {
    AppSettings.device = Device
    AppSettings.storageEngine = AsyncStorage
    AppSettings.storageType = CONSTANTS.STORAGE_TYPES.ASYNC
    AppSettings.currentCity = '010'
  }

  componentDidMount() {
    this.props.dispatch(introActions.toggleIntro())
    this.props.dispatch(loginActions.isLoggedIn())
    //this.fetchSettings()
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
    let {state} = this.props,
      {login, intro} = state,
      appIntro = (intro.showIntro) ? (
        null //<Intro />
      ) : null

    return (
      <View style={{flex: 1}}>
        {appIntro}
        <Navigator
          debugOverlay={false}
          style={{flex: 1}}
          initialRoute={{
            id: 'Home',
            type: 'Home',
            title: LANG.t('home.Home')
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

              case 'TrailMapFull':
                return (
                  <TrailMapFull
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

              case 'SelectTrailAreas':
                return (
                  <SelectTrailAreas
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

              case 'OrderEvent':
                return (
                  <OrderEvent
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

              case 'OrderPayment':
                return (
                  <OrderPayment
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'OrderSummary':
                return (
                  <OrderSummary
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'OrderSuccess':
                return (
                  <OrderSuccess
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

              case 'EditEventBase':
                return (
                  <EditEventBase
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

              case 'EditEventDifficulty':
                return (
                  <EditEventDifficulty
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventDates':
                return (
                  <EditEventDates
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

              case 'SelectTrail':
                return (
                  <SelectTrail
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

              case 'EditExpenses':
                return (
                  <EditExpenses
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditExpensesDetails':
                return (
                  <EditExpensesDetails
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditExpensesIncludes':
                return (
                  <EditExpensesIncludes
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditExpensesExcludes':
                return (
                  <EditExpensesExcludes
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditGears':
                return (
                  <EditGears
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditGearImages':
                return (
                  <EditGearImages
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditGearTags':
                return (
                  <EditGearTags
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditGearNotes':
                return (
                  <EditGearNotes
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventInfo':
                return (
                  <EditEventInfo
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventDescription':
                return (
                  <EditEventDescription
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventExcerpt':
                return (
                  <EditEventExcerpt
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EditEventTags':
                return (
                  <EditEventTags
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

              case 'EditUserIntro':
                return (
                  <EditUserIntro
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'MyEvents':
                return (
                  <MyEvents
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'EventManager':
                return (
                  <EventManager
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'SignUpList':
                return (
                  <SignUpList
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'WebStore':
                return (
                  <WebStore
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'MyTrails':
                return (
                  <MyTrails
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'MyOrders':
                return (
                  <MyOrders
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
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

              case 'ImagePicker':
                return (
                  <ImagePicker
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )

              case 'Upcoming':
                return (
                  <Upcoming 
                    navigator={navigator}
                    route={route} {...route.passProps}
                  />
                )
            }
          }}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={NavigationBarRouteMapper(this.props.selectedTab, state, this.props.dispatch)}
              style={styles.navbar.wrapper}
            />
          }
        />
        <Login
          showLogin={login.showLogin}
        />
        <RecordTrail
          isVisible={state.newTrail.showRecorder}
        />
      </View>
    )
  }
}

App.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    selectedTab: state.home.selectedTab,
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
