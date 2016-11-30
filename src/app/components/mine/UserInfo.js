'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
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
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
  }

  componentWillMount() {
    this.props.loginActions.reloadUser(this.props.user.id)
  }

  nextPage(type) {
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
        id = 'TrailList',
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
        query: query
      }
    })
  }

  render() {
    const user = this.props.user,
      userBackgroundUrl = ImagePath({type: 'background', path: AppSettings.userBackground})

    if (!user) {
      return <Loading />
    }

    return (
      <ParallaxView style={styles.user.wrapper}
        backgroundSource={{uri: userBackgroundUrl}}
        windowHeight={320}
        scrollableViewStyle={{backgroundColor: Graphics.colors.background}}
        header={(
          <View style={styles.user.hero}>
            <TouchableOpacity onPress={() => this.nextPage('edit')}>
              <Avatar user={user} size={'XL'} borderWidth={6} />
            </TouchableOpacity>
            <Text style={styles.user.userHandle}>{user.handle}</Text>
            <TagList tags={user.tags} />
          </View>
        )}>
        <View style={styles.editor.group}>
          <EditLink onPress={() => user.orders && user.orders.length > 0 && this.nextPage('orders')} value={user.orders.length} label={Lang.MyOrders} />
        </View>
        <View style={styles.editor.group}>
          <EditLink onPress={() => user.trails.length > 0 && this.nextPage('trails')} value={user.trails.length} label={Lang.MyTrails} />
          <EditLink onPress={() => user.events.length > 0 && this.nextPage('events')} value={user.events.length} label={Lang.MyEvents} />
          <EditLink onPress={() => user.posts.length > 0 && this.nextPage('posts')} value={user.posts.length} label={Lang.MyPosts} />
        </View>
        <View style={styles.editor.group}>
          <EditLink onPress={() => user.saves.trails.length > 0 && this.nextPage('savedTrails')} value={user.saves.trails.length} label={Lang.SavedTrails} />
          <EditLink onPress={() => user.saves.events.length > 0 && this.nextPage('savedEvents')} value={user.saves.events.length} label={Lang.SavedEvents} />
          <EditLink onPress={() => user.saves.posts.length > 0 && this.nextPage('savedPosts')} value={user.saves.posts.length} label={Lang.SavedPosts} />
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