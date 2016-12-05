'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ScrollView,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../redux/actions/loginActions'
import {
  changeTab
} from '../../redux/actions/homeActions'

import CallToAction from '../shared/CallToAction'
import EditLink from '../shared/EditLink'
import styles from '../../styles/main'

import {
  Lang
} from '../../settings'

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
    props.changeTab('Areas')
    props.navigator.resetTo({
      id: 'Home',
      title: ''
    })
  },

  user = props.user

  if (user) {
    return (
      <View style={styles.global.wrapper}>
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
        <CallToAction
          backgroundColor='red' 
          label={Lang.Logout} 
          onPress={onLogoutPressed} 
        />
      </View>
    )
  } else {
    return null
  }
}

EditAccount.propTypes = {
  user: PropTypes.object,
  loginActions: PropTypes.object.isRequired,
  changeTab: PropTypes.func.isRequired
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