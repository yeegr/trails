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
import * as loginActions from '../../../redux/actions/loginActions'
import {changeTab} from '../../../redux/actions/homeActions'

import CallToAction from '../shared/CallToAction'
import EditLink from '../shared/EditLink'

import styles from '../../styles/main'

import {
  CONSTANTS,
  LANG,
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
            this.props.loginActions.wechatAuthSuccess(res.code)
          } else {
            this.props.loginActions.wechatAuthFailure(res)
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
        id = 'PhotoPicker',
        title = LANG.t('mine.edit.Gallery')
        passProps.photos = this.props.user.photos
        passProps.dispatcher = this.props.loginActions
      break
    }

    this.props.navigator.push({
      id,
      title,
      passProps
    })
  }

  _onLogoutPressed() {
    this.props.loginActions.logoutUser()
    this.props.changeTab('Areas')
    this.props.navigator.resetTo({
      id: 'Home',
      title: ''
    })
  }

  _bindWeChat() {
    if (this.state.isWXAppInstalled) {
      this.props.loginActions.wechatAuthRequest(CONSTANTS.ACCOUNT_ACTIONS.BIND)
      WeChat
      .sendAuthRequest('snsapi_userinfo', 'shitulv_login')
      .catch((e) => {console.log(e)})
    }
  }

  _unbindWeChat() {
    this.props.loginActions.updateUser(this.props.user.id, {
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
          onPress: this.props.loginActions.clearCache
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
              user={user}
            />
            <EditLink
              label={LANG.t('user.Handle')}
              onPress={() => this._nextPage('handle')}
              required={true}
              value={user.handle}
            />
            <EditLink
              label={LANG.t('user.MobileNumber')}
              onPress={() => this._nextPage('mobile')}
              required={true}
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
      </View>
    )
  }
}

EditAccount.propTypes = {
  navigator: PropTypes.object.isRequired,
  login: PropTypes.object,
  user: PropTypes.object,
  loginActions: PropTypes.object.isRequired,
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
    loginActions: bindActionCreators(loginActions, dispatch),
    changeTab: (tabId) => dispatch(changeTab(tabId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount)