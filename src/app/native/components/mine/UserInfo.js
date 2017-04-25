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
import * as userActions from '../../../redux/actions/userActions'

import Avatar from '../shared/Avatar'
import EditLink from '../shared/EditLink'
import ImagePath from '../shared/ImagePath'
import Loading from '../shared/Loading'
import TagList from '../shared/TagList'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings,
  Graphics
} from '../../../../common/__'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)
  }

  _nextPage(type) {
    let {user} = this.props.login,
      userId = user._id,
      id = '',
      title = null,
      passProps = {}

    switch (type) {
      case 'orders':
        id = 'MyOrders',
        title = LANG.t('mine.MyOrders'),
        passProps = {
          query: "?status=success&creator=" + userId
        }
      break

      case 'wallet':
        id = 'MyWallet',
        title = LANG.t('mine.MyWallet'),
        passProps = {
          query: "?creator=" + userId
        }
      break

      case 'trails':
        id = 'MyTrails',
        title = LANG.t('mine.MyTrails')
      break

      case 'events':
        id = 'MyEvents',
        title = LANG.t('mine.MyEvents'),
        passProps = {
          query: "?creator=" + userId
        }
      break

      case 'posts':
        id = 'PostList',
        title = LANG.t('mine.MyPosts'),
        passProps = {
          query: "?creator=" + userId
        }
      break

      case 'savedTrails':
        id = 'TrailList',
        title = LANG.t('mine.SavedTrails'),
        passProps = {
          query: "?in=" + JSON.stringify(user.saves.trails).replace(/\"/g, '')
        }
      break

      case 'savedEvents':
        id = 'EventList',
        title = LANG.t('mine.SavedEvents'),
        passProps = {
          query: "?in=" + JSON.stringify(user.saves.events).replace(/\"/g, '')
        }
      break

      case 'savedPosts':
        id = 'PostList',
        title = LANG.t('mine.SavedPosts'),
        passProps = {
          query: "?in=" + JSON.stringify(user.saves.posts).replace(/\"/g, '')
        }
      break

      case 'edit':
        id = 'EditAccount',
        title = LANG.t('mine.EditAccount')
      break

      case 'about':
        id = 'AboutUs',
        title = LANG.t('mine.AboutUs')
      break

      case 'store':
        id = 'WebStore'
        title = LANG.t('mine.PurchaseOutdoorInsurance')
      break
    }

    this.props.navigator.push({
      id,
      title,
      passProps
    })
  }

  render() {
    const {user, trails} = this.props.login,
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
            <TouchableOpacity onPress={() => this._nextPage('edit')}>
              <Avatar user={user} size={'XL'} borderWidth={6} />
            </TouchableOpacity>
            <Text style={styles.user.userHandle}>{user.handle}</Text>
            <TagList tags={user.tags} />
          </View>
        )}>
        <View style={styles.editor.group}>
          <EditLink
            label={LANG.t('mine.MyOrders')}
            onPress={() => user.orders && user.orders.length > 0 && this._nextPage('orders')}
            value={user.orders.length}
          />
          <EditLink
            label={LANG.t('mine.MyWallet')}
            onPress={() => user.blance > 0 && this._nextPage('wallet')}
            value={LANG.t('number.currency', {amount: user.balance})}
          />
          <EditLink
            label={LANG.t('mine.PurchaseOutdoorInsurance')}
            onPress={() => this._nextPage('store')}
          />
        </View>
        <View style={styles.editor.group}>
          <EditLink
            label={LANG.t('mine.MyTrails')}
            onPress={() => trails.length > 0 && this._nextPage('trails')}
            value={trails.length.toString()}
          />
          <EditLink
            label={LANG.t('mine.MyEvents')}
            onPress={() => user.events.length > 0 && this._nextPage('events')}
            value={user.events.length}
          />
          <EditLink onPress={() => user.posts.length > 0 && this._nextPage('posts')} value={user.posts.length} label={LANG.t('mine.MyPosts')} />
        </View>
        <View style={styles.editor.group}>
          <EditLink
            label={LANG.t('mine.SavedTrails')}
            onPress={() => user.saves.trails.length > 0 && this._nextPage('savedTrails')}
            value={user.saves.trails.length}
          />
          <EditLink
            label={LANG.t('mine.SavedEvents')}
            onPress={() => user.saves.events.length > 0 && this._nextPage('savedEvents')}
            value={user.saves.events.length}
          />
          <EditLink
            label={LANG.t('mine.SavedPosts')}
            onPress={() => user.saves.posts.length > 0 && this._nextPage('savedPosts')}
            value={user.saves.posts.length}
          />
        </View>
        <View style={styles.editor.group}>
          <EditLink
            label={LANG.t('mine.EditAccount')}
            onPress={() => this._nextPage('edit')}
          />
        </View>
        <View style={styles.editor.group}>
          <EditLink
            label={LANG.t('mine.AboutUs')}
            onPress={() => this._nextPage('about')}
          />
        </View>
      </ParallaxView>
    )
  }
}

UserInfo.propTypes = {
  userActions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)