'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  AsyncStorage,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginActions from '../../redux/actions/loginActions'

import Avatar from '../shared/Avatar'
import EditLink from '../shared/EditLink'
import ImagePath from '../shared/ImagePath'
import Loading from '../shared/Loading'
import TagList from '../shared/TagList'

import styles from '../../styles/main'

import {
  CONSTANTS,
  UTIL,
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)

    this.state = {
      localTrailCount: 0
    }
  }

  componentWillMount() {
    this.props.loginActions.reloadUser(this.props.user.id)

    AsyncStorage
    .getItem(CONSTANTS.ACTION_TARGETS.TEMP)
    .then((tmp) => {
      return (UTIL.isNullOrUndefined(tmp)) ? {} : JSON.parse(tmp)
    })
    .then((tmp) => {
      let count = 0
      for (let key in tmp) {
        if (tmp.hasOwnProperty(key)) {
          count++
        }
      }

      this.setState({
        localTrailCount: count
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.user)
  }

  _nextPage(type) {
    let {user} = this.props, 
      id = null,
      title = null,
      query = null

    switch (type) {
      case 'orders':
        id = 'MyOrders',
        title = Lang.MyOrders,
        query = "?creator=" + user.id
      break;

      case 'trails':
        id = 'MyTrails',
        title = Lang.MyTrails,
        query = "?creator=" + user.id
      break;

      case 'events':
        id = 'EventManager',
        title = Lang.MyEvents
      break;

      case 'posts':
        id = 'PostList',
        title = Lang.MyPosts,
        query = "?creator=" + user.id
      break;

      case 'savedTrails':
        id = 'TrailList',
        title = Lang.SavedTrails,
        query = "?in=" + JSON.stringify(user.saves.trails).replace(/\"/g, '')
      break;

      case 'savedEvents':
        id = 'EventList',
        title = Lang.SavedEvents,
        query = "?in=" + JSON.stringify(user.saves.events).replace(/\"/g, '')
      break;

      case 'savedPosts':
        id = 'PostList',
        title = Lang.SavedPosts,
        query = "?in=" + JSON.stringify(user.saves.posts).replace(/\"/g, '')
      break;

      case 'edit':
        id = 'EditAccount',
        title = Lang.EditAccount
      break;

      case 'about':
        id = 'AboutUs',
        title = Lang.AboutUs
      break;
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
    const user = this.props.user,
      userBackgroundUrl = ImagePath({type: 'background', path: AppSettings.userBackground})

    if (!user) {
      return <Loading />
    }

    const totalUserTrails = user.trails.length + this.state.localTrailCount

    return (
      <ParallaxView style={styles.user.wrapper}
        backgroundSource={{uri: userBackgroundUrl}}
        windowHeight={320}
        scrollableViewStyle={{backgroundColor: Graphics.colors.background}}
        header={(
          <View style={styles.user.hero}>
            <TouchableOpacity onPress={() => this._nextPage('edit')}>
              <Avatar user={user} size={'XL'} borderWidth={6} />
            </TouchableOpacity>
            <Text style={styles.user.userHandle}>{user.handle}</Text>
            <TagList tags={user.tags} />
          </View>
        )}>
        <View style={styles.editor.group}>
          <EditLink
            label={Lang.MyOrders}
            onPress={() => user.orders && user.orders.length > 0 && this._nextPage('orders')}
            value={user.orders.length}
          />
        </View>
        <View style={styles.editor.group}>
          <EditLink
            label={Lang.MyTrails}
            onPress={() => totalUserTrails > 0 && this._nextPage('trails')}
            value={totalUserTrails}
          />
          <EditLink
            label={Lang.MyEvents}
            onPress={() => user.events.length > 0 && this._nextPage('events')}
            value={user.events.length}
          />
          <EditLink onPress={() => user.posts.length > 0 && this._nextPage('posts')} value={user.posts.length} label={Lang.MyPosts} />
        </View>
        <View style={styles.editor.group}>
          <EditLink
            label={Lang.SavedTrails}
            onPress={() => user.saves.trails.length > 0 && this._nextPage('savedTrails')}
            value={user.saves.trails.length}
          />
          <EditLink
            label={Lang.SavedEvents}
            onPress={() => user.saves.events.length > 0 && this._nextPage('savedEvents')}
            value={user.saves.events.length}
          />
          <EditLink
            label={Lang.SavedPosts}
            onPress={() => user.saves.posts.length > 0 && this._nextPage('savedPosts')}
            value={user.saves.posts.length}
          />
        </View>
        <View style={styles.editor.group}>
          <EditLink
            label={Lang.MyAccount}
            onPress={() => this._nextPage('edit')}
          />
        </View>
        <View style={styles.editor.group}>
          <EditLink
            label={Lang.AboutUs}
            onPress={() => this._nextPage('about')}
          />
        </View>
      </ParallaxView>
    )
  }
}

UserInfo.propTypes = {
  loginActions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  user: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)