'use strict'

import {AsyncStorage} from 'react-native'
import {ACCESS_TOKEN, USER} from '../../../util/constants'
import * as loginActions from '../actions/loginActions'
import * as ACTIONS from '../constants/loginConstants'

const init = {
  disableVerification: true,
  showVerification: false,
  disableLogin: true,
  showMobileForm: true,
  showWechatButton: true,
  verifyMobile: false,
  isFetchingWechatAuth: false,
  isFetching: false,
  wechat: null,
  mobile: null
},
loginReducer = (state = {
  showLogin: false
}, action) => {
  switch (action.type) {
    case ACTIONS.IS_LOGGED_IN:
      return Object.assign({}, state, {
        toke: action.token,
        user: action.user
      })

    case ACTIONS.IS_LOGGED_OUT:
      AsyncStorage.multiRemove([ACCESS_TOKEN, USER])

      return Object.assign({}, state, {
        toke: null,
        user: null
      })

    case ACTIONS.SHOW_LOGIN:
      return Object.assign({}, init, {
        showLogin: true
      })

    case ACTIONS.HIDE_LOGIN:
      return Object.assign({}, state, {
        showLogin: false
      })

    case ACTIONS.ENABLE_VERIFICATION:
      return Object.assign({}, state, {
        disableVerification: false
      })

    case ACTIONS.DISABLE_VERIFICATION:
      return Object.assign({}, state, {
        disableVerification: true
      })

    case ACTIONS.SHOW_VERIFICATION:
      return Object.assign({}, state, {
        showVerification: true
      })

    case ACTIONS.HIDE_VERIFICATION:
      return Object.assign({}, state, {
        showVerification: false
      })

    case ACTIONS.ENABLE_LOGIN:
      return Object.assign({}, state, {
        disableLogin: false
      })

    case ACTIONS.DISABLE_LOGIN:
      return Object.assign({}, state, {
        disableLogin: true
      })

   case ACTIONS.REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        disableVerification: true,
        disableLogin: true
      })

    case ACTIONS.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        showLogin: false,
        showVerification: false,
        message: null,
        token: action.token,
        user: action.user
      })

    case ACTIONS.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })

    case ACTIONS.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        token: null,
        user: null
      })

    case ACTIONS.GET_SUCCESS:
      return Object.assign({}, state, {
        message: null,
        user: action.user
      })

    case ACTIONS.GET_FAILURE:
      return Object.assign({}, state, {
        message: action.message
      })

    case ACTIONS.REQUEST_USER_UPDATE:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.USER_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user
      })

    case ACTIONS.USER_UPDATE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })

    case ACTIONS.SHOW_MOBILE_LOGIN_FORM:
      return Object.assign({}, state, {
        showMobileForm: true
      })

    case ACTIONS.SEND_WECHAT_AUTH_REQUEST:
      return Object.assign({}, state, {
        isFetchingWechatAuth: true
      })

    case ACTIONS.WECHAT_AUTH_REQUEST_SEND:
      return Object.assign({}, state, {
        isFetchingWechatAuth: false
      })

    case ACTIONS.WECHAT_USER_INFO_SUCCESS:
      loginActions.loginUser({
        wechat: action.wechat.openid
      })

      return Object.assign({}, state, {
        wechat: action.wechat
      })

    case ACTIONS.WECHAT_USER_INFO_FAILURE:
      return Object.assign({}, state, {
        wechat: null
      })

    case ACTIONS.MOBILE_AUTH_SUCCESS:
      loginActions.loginUser({
        mobile: action.mobile
      })

      return Object.assign({}, state, {
        mobile: action.mobile
      })

    case ACTIONS.MOBILE_AUTH_FAILURE:
      return Object.assign({}, state, {
        mobile: null
      })

    default:
      return state
  }
}

export default loginReducer