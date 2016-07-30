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
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginActions from '../../containers/actions/loginActions'
import {changeTab} from '../../containers/actions/homeActions'

import EditLink from '../shared/EditLink'
import CallToAction from '../shared/CallToAction'
import styles from '../../styles/main'

const EditAccount = (props) => {
  const nextPage = (type) => {
    let id = null,
      title = null

    switch (type) {
      case 'avatar':
        id = 'EditUserAvatar',
        title = Lang.EditUserAvatar
      break;

      case 'handle':
        id = 'EditUserHandle',
        title = Lang.EditUserHandle
      break;

      case 'mobile':
        id = 'EditUserMobile',
        title = Lang.ChangeUserMobile
      break;

      case 'level':
        id = 'EditUserLevel',
        title = Lang.UserLevel
      break;

      case 'name':
        id = 'EditUserName',
        title = Lang.RealName
      break;

      case 'pid':
        id = 'EditUserPID',
        title = Lang.PersonalId
      break;
    }

    props.navigator.push({
      id,
      title,
      passProps: {
        user: props.user
      }
    })
  },

  onLogoutPressed = () => {
    props.loginActions.logoutUser()
    resetNavigation()
  },

  resetNavigation = () => {
    console.log(props.user)
    console.log(props.navigator)
    props.changeTab('Areas')
    props.navigator.resetTo({
      id: 'Home',
      title: ''
    })
  },

  user = props.user

  if (user) {
    return (
      <View style={styles.detail.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <EditLink onPress={() => nextPage('avatar')} label={Lang.Avatar} user={user} />
            <EditLink onPress={() => nextPage('handle')} required={true} label={Lang.Handle} value={user.handle} />
            <EditLink onPress={() => nextPage('mobile')} required={true} label={Lang.MobileNumber} value={user.mobile} />
            <EditLink onPress={() => nextPage('')} label={Lang.UntieWechat} />
            <EditLink onPress={() => nextPage('level')} label={Lang.UserLevel} value={Lang.userLevelArray[user.level]} />
            <EditLink onPress={() => nextPage('name')} label={Lang.RealName} value={user.name} />
            <EditLink onPress={() => nextPage('pid')} label={Lang.PersonalId} value={user.pid} />
          </View>
        </ScrollView>
        <CallToAction onPress={onLogoutPressed} label={Lang.Logout} />
      </View>
    )
  } else {
    return null
  }
}

function mapStateToProps(state, ownProps) {
  return {
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