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
import * as loginActions from '../../redux/actions/loginActions'
import {changeTab} from '../../redux/actions/homeActions'

import CallToAction from '../shared/CallToAction'
import EditLink from '../shared/EditLink'

import styles from '../../styles/main'

import {
  CONSTANTS,
  LANG,
  AppSettings,
  Graphics
} from '../../settings'

class EditAccount extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)
    this._onLogoutPressed = this._onLogoutPressed.bind(this)
    this._toggleWeChat = this._toggleWeChat.bind(this)
    this._bindWeChat = this._bindWeChat.bind(this)
    this._unbindWeChat = this._unbindWeChat.bind(this)
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
      title = null

    switch (type) {
      case 'avatar':
        id = 'EditUserAvatar',
        title = LANG.t('mine.edit.EditUserAvatar')
      break;

      case 'handle':
        id = 'EditUserHandle',
        title = LANG.t('mine.edit.EditUserHandle')
      break;

      case 'mobile':
        id = 'EditUserMobile',
        title = LANG.t('mine.edit.ChangeUserMobile')
      break;

      case 'level':
        id = 'EditUserLevel',
        title = LANG.t('mine.edit.EditUserLevel')
      break;

      case 'name':
        id = 'EditUserName',
        title = LANG.t('mine.edit.RealName')
      break;

      case 'pid':
        id = 'EditUserPID',
        title = LANG.t('mine.edit.PersonalId')
      break;
    }

    this.props.navigator.push({
      id,
      title,
      passProps: {
        user: this.props.login.user
      }
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
    this.props.loginActions.updateUser(this.props.login.user.id, {
      wechat: CONSTANTS.WeChatOpenId
    })
  }

  _toggleWeChat() {
    if (this.props.login.user.wechat === CONSTANTS.WeChatOpenId) {
      this._bindWeChat()
    } else {
      this._unbindWeChat()
    }
  }

  render() {
    const {user} = this.props.login

    if (!user) {
      return null
    }

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
            <EditLink
              label={LANG.t((user.wechat === CONSTANTS.WeChatOpenId) ? 'mine.edit.BindWeChat' : 'mine.edit.UnbindWeChat')}
              onPress={this._toggleWeChat}
            />
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
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('mine.edit.ClearCache')}
              onPress={this.props.loginActions.clearCache}
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
  user: PropTypes.object,
  navigator: PropTypes.object.isRequired,
  loginActions: PropTypes.object.isRequired,
  changeTab: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    changeTab: (tabId) => dispatch(changeTab(tabId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount)