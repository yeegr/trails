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
  AsyncStorage,
  Image,
  Text,
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginActions from '../../redux/actions/loginActions'

import Loading from '../shared/Loading'
import ImagePath from '../shared/ImagePath'
import Avatar from '../shared/Avatar'
import TagList from '../shared/TagList'
import EditLink from '../shared/EditLink'
import styles from '../../styles/main'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
  }

  componentDidMount() {
    this.props.loginActions.getUpdatedUser(this.props.user.id)
  }

  nextPage(type) {
    let {user} = this.props, 
      id = null,
      title = null,
      query = null

    switch (type) {
      case 'orders':
        id = 'OrderList',
        title = Lang.MyOrders,
        query = "?creator=" + user.id
      break;

      case 'manage':
        id = 'EventManager',
        title = Lang.ManageEvents,
        query = "?creator=" + user.id
      break;

      case 'trails':
        id = 'TrailList',
        title = Lang.MyTrails,
        query = "?creator=" + user.id
      break;

      case 'events':
        id = 'EventList',
        title = Lang.MyEvents,
        query = "?creator=" + user.id
      break;

      case 'posts':
        id = 'PostList',
        title = Lang.MyPosts,
        query = "?creator=" + user.id
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
        query: query
      }
    })
  }

  render() {
    const {user} = this.props,
      userBackgroundUrl = ImagePath({type: 'background', path: AppSettings.userBackground})

console.log(userBackgroundUrl)
    return (
      <ParallaxView style={styles.user.wrapper}
        backgroundSource={{uri: userBackgroundUrl}}
        windowHeight={320}
        scrollableViewStyle={{backgroundColor: Graphics.colors.background}}
        header={(
          <View style={styles.user.hero}>
            <Avatar user={user} size='XL' borderWidth={6} />
            <Text style={styles.user.userHandle}>{user.handle}</Text>
            <TagList tags={user.tags} />
          </View>
        )}>
        <View style={styles.editor.group}></View>
        <View style={styles.editor.group}>
          <EditLink onPress={() => this.nextPage('orders')} value={user.orders.length} label={Lang.MyOrders} />
        </View>
        <View style={styles.editor.group}>
          <EditLink onPress={() => this.nextPage('manage')} value={1} label={Lang.ManageEvents} />
        </View>
        <View style={styles.editor.group}>
          <EditLink onPress={() => this.nextPage('trails')} value={user.trails.length} label={Lang.MyTrails} />
          <EditLink onPress={() => this.nextPage('events')} value={user.events.length} label={Lang.MyEvents} />
          <EditLink onPress={() => this.nextPage('posts')} value={user.posts.length} label={Lang.MyPosts} />
        </View>
        <View style={styles.editor.group}>
          <EditLink onPress={() => this.nextPage('edit')} label={Lang.MyAccount} />
        </View>
        <View style={styles.editor.group}>
          <EditLink onPress={() => this.nextPage('about')} label={Lang.AboutUs} />
        </View>
      </ParallaxView>
    )
  }
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