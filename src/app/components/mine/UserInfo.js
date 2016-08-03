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
  TabBarIOS,
  Text,
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../containers/actions/loginActions'

import Loading from '../shared/Loading'
import Avatar from '../shared/Avatar'
import TagList from '../shared/TagList'
import EditLink from '../shared/EditLink'
import styles from '../../styles/main'

const UserInfo = (props) => {
  const user = props.user,
    nextPage = (type) => {
      let id = null,
        title = null,
        query = null

      switch (type) {
        case 'orders':
          id = 'OrderList',
          title = Lang.MyOrders,
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

      props.navigator.push({
        id,
        title,
        passProps: {
          query: query
        }
      })
    }

  return (
    <ParallaxView style={styles.user.wrapper}
      backgroundSource={{uri: AppSettings.assetUri + AppSettings.userBackground }}
      windowHeight={320}
      scrollableViewStyle={{backgroundColor: AppSettings.color.background}}
      header={(
        <View style={styles.user.hero}>
          <Avatar user={user} size='XL' borderWidth={6} />
          <Text style={styles.user.userHandle}>{user.handle}</Text>
          <TagList tags={user.tags} />
        </View>
      )}>
      <View style={styles.editor.group}></View>
      <View style={styles.editor.group}>
        <EditLink onPress={() => nextPage('orders')} label={Lang.MyOrders} />
      </View>
      <View style={styles.editor.group}>
        <EditLink onPress={() => nextPage('trails')} value={user.trails.length} label={Lang.MyTrails} />
        <EditLink onPress={() => nextPage('events')} value={user.events.length} label={Lang.MyEvents} />
        <EditLink onPress={() => nextPage('posts')} value={user.posts.length} label={Lang.MyPosts} />
      </View>
      <View style={styles.editor.group}>
        <EditLink onPress={() => nextPage('edit')} label={Lang.MyAccount} />
      </View>
      <View style={styles.editor.group}>
        <EditLink onPress={() => nextPage('about')} label={Lang.AboutUs} />
      </View>
    </ParallaxView>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps)(UserInfo)