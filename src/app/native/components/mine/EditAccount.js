'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Alert,
  ScrollView,
  View
} from 'react-native'

import * as WeChat from 'react-native-wechat'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActions from '../../../redux/actions/userActions'
import {changeTab} from '../../../redux/actions/homeActions'

import CallToAction from '../shared/CallToAction'
import EditLink from '../shared/EditLink'
import Saving from '../shared/Saving'

import styles from '../../styles/main'

import {
  CONSTANTS,
  LANG,
  AppSettings,
  Graphics
} from '../../../../common/__'

class EditAccount extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)
    this._onLogoutPressed = this._onLogoutPressed.bind(this)
    this._toggleWeChat = this._toggleWeChat.bind(this)
    this._bindWeChat = this._bindWeChat.bind(this)
    this._unbindWeChat = this._unbindWeChat.bind(this)
    this._clearCache = this._clearCache.bind(this)

    this.state = Object.assign({}, this.init, {
      apiVersion: 'waiting...',
      wxAppInstallUrl: 'waiting...',
      isWXAppSupportApi: 'waiting...',
      isWXAppInstalled: false
    })
  }

  async componentDidMount() {
    try {
      this.setState({
        apiVersion: await WeChat.getApiVersion(),
        wxAppInstallUrl: await WeChat.getWXAppInstallUrl(),
        isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
        isWXAppInstalled: await WeChat.isWXAppInstalled()
      })

      WeChat.addListener('SendAuth.Resp', (res) => {
        if (this.props.login.action === CONSTANTS.ACCOUNT_ACTIONS.BIND) {
          if (res.errCode === 0) {
            this.props.userActions.wechatAuthSuccess(res.code)
          } else {
            this.props.userActions.wechatAuthFailure(res)
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  _nextPage(type) {
    let id = null,
      title = null,
      passProps = {
        user: this.props.user
      }

    switch (type) {
      case 'avatar':
        id = 'EditUserAvatar',
        title = LANG.t('mine.edit.EditUserAvatar')
      break

      case 'handle':
        id = 'EditUserHandle',
        title = LANG.t('mine.edit.EditUserHandle')
      break

      case 'mobile':
        id = 'EditUserMobile',
        title = LANG.t('mine.edit.ChangeUserMobile')
      break

      case 'level':
        id = 'EditUserLevel',
        title = LANG.t('mine.edit.EditUserLevel')
      break

      case 'name':
        id = 'EditUserName',
        title = LANG.t('mine.edit.RealName')
      break

      case 'pid':
        id = 'EditUserPID',
        title = LANG.t('mine.edit.PersonalId')
      break

      case 'gallery':
        id = 'ImagePicker',
        title = LANG.t('mine.edit.Gallery')
        passProps.id = this.props.user._id
        passProps.photos = this.props.user.photos
        passProps.dispatcher = this.props.userActions
      break

      case 'intro':
        id = 'EditUserIntro',
        title = LANG.t('mine.edit.SelfIntro')
      break
    }

    this.props.navigator.push({
      id,
      title,
      passProps
    })
  }

  _onLogoutPressed() {
    this.props.userActions.logoutUser()
    this.props.changeTab('Areas')
    this.props.navigator.resetTo({
      id: 'Home',
      title: ''
    })
  }

  _bindWeChat() {
    if (this.state.isWXAppInstalled) {
      this.props.userActions.wechatAuthRequest(CONSTANTS.ACCOUNT_ACTIONS.BIND)
      WeChat
      .sendAuthRequest('snsapi_userinfo', 'shitulv_login')
      .catch((e) => {console.log(e)})
    }
  }

  _unbindWeChat() {
    this.props.userActions.updateUser(this.props.user.id, {
      wechat: CONSTANTS.WeChatOpenId
    })
  }

  _toggleWeChat() {
    if (this.props.user.wechat === CONSTANTS.WeChatOpenId) {
      this._bindWeChat()
    } else {
      this._unbindWeChat()
    }
  }

  _clearCache() {
    Alert.alert(
      LANG.t('mine.edit.ClearCacheAlert.title'),
      LANG.t('mine.edit.ClearCacheAlert.description'),
      [
        {
          text: LANG.t('mine.edit.ClearCacheAlert.cancel')
        },
        {
          text: LANG.t('mine.edit.ClearCacheAlert.confirm'), 
          onPress: this.props.userActions.clearCache
        }
      ]
    )
  }

  render() {
    const {user} = this.props

    if (!user) {
      return null
    }

    const bindWeChatLink = (this.state.isWXAppInstalled) ? (
        <EditLink
          label={LANG.t((user.wechat === CONSTANTS.WeChatOpenId) ? 'mine.edit.BindWeChat' : 'mine.edit.UnbindWeChat')}
          onPress={this._toggleWeChat}
        />
      ) : null

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('user.Avatar')}
              onPress={() => this._nextPage('avatar')}
              required={true}
              validated={(user.avatar !== AppSettings.defaultEventHeroUri)}
              user={user}
            />
            <EditLink
              label={LANG.t('user.Handle')}
              onPress={() => this._nextPage('handle')}
              required={true}
              validated={(user.handle.length >= AppSettings.minUserHandleLength)}
              value={user.handle}
            />
            <EditLink
              label={LANG.t('user.MobileNumber')}
              onPress={() => this._nextPage('mobile')}
              required={true}
              validated={(AppSettings.mobileRx.test(user.mobile.toString()))}
              value={user.mobile}
            />
            {bindWeChatLink}
            <EditLink
              label={LANG.t('mine.edit.EditUserLevel')}
              onPress={() => this._nextPage('level')}
              value={LANG.t('user.levels.' + user.level)}
            />
            <EditLink
              label={LANG.t('mine.edit.RealName')}
              onPress={() => this._nextPage('name')}
              value={user.name}
            />
            <EditLink
              label={LANG.t('mine.edit.PersonalId')}
              onPress={() => this._nextPage('pid')}
              value={user.pid}
            />
            <EditLink
              label={LANG.t('mine.edit.Gallery')}
              onPress={() => this._nextPage('gallery')}
              value={user.photos.length}
            />
            <EditLink
              label={LANG.t('mine.edit.SelfIntro')}
              onPress={() => this._nextPage('intro')}
              value={(user.intro && user.intro.length > 2)}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('mine.edit.ClearCache')}
              onPress={this._clearCache}
            />
          </View>
        </ScrollView>
        <CallToAction
          backgroundColor={Graphics.colors.warning} 
          label={LANG.t('mine.edit.Logout')} 
          onPress={this._onLogoutPressed} 
        />
        <Saving
          visible={this.props.login.isFetching}
          label={LANG.t('glossary.Saving')}
        />
      </View>
    )
  }
}

EditAccount.propTypes = {
  navigator: PropTypes.object.isRequired,
  login: PropTypes.object,
  user: PropTypes.object,
  userActions: PropTypes.object.isRequired,
  changeTab: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    changeTab: (tabId) => dispatch(changeTab(tabId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount)