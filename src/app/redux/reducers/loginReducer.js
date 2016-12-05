'use strict'

import {AsyncStorage} from 'react-native'
import {CONSTANTS} from '../../settings'
import * as ACTIONS from '../constants/loginConstants'

const initWechat = {
  wechat: null,
  handle: null,
  gender: null,
  language: null,
  city: null,
  province: null,
  country: null,
  avatar: null
},
init = {
  showLogin: false,
  disableVerification: true,
  showValidation: false,
  verifyMobile: false,
  loginDisabled: true,
  showMobileLogin: true,
  showWechatLogin: true,
  isAuthorizingWechat: false,
  isFetching: false,
  tmpAvatarUri: null,
  loginError: '',
  updateError: '',
  creds: Object.assign({
    mobile: null
  }, initWechat)
},
loginReducer = (state = init, action) => {
  switch (action.type) {
    case ACTIONS.IS_LOGGED_IN:
      return Object.assign({}, state, {
        toke: action.token,
        user: action.user
      })

    case ACTIONS.IS_LOGGED_OUT:
      return Object.assign({}, init, {
        toke: null,
        user: null
      })

// toggle login popup
    case ACTIONS.SHOW_LOGIN:
      return Object.assign({}, state, {
        showLogin: true
      })

    case ACTIONS.HIDE_LOGIN:
      return Object.assign({}, init, {
        showLogin: false
      })

// toggle verification input
    case ACTIONS.ENABLE_VERIFICATION:
      return Object.assign({}, state, {
        disableVerification: false
      })

    case ACTIONS.DISABLE_VERIFICATION:
      return Object.assign({}, state, {
        disableVerification: true
      })

// toggle
    case ACTIONS.SHOW_VERIFICATION:
      return Object.assign({}, state, {
        showValidation: true
      })

    case ACTIONS.HIDE_VERIFICATION:
      return Object.assign({}, state, {
        showValidation: false
      })

// toggle login form
    case ACTIONS.ENABLE_LOGIN:
      return Object.assign({}, state, {
        loginDisabled: false
      })

    case ACTIONS.DISABLE_LOGIN:
      return Object.assign({}, state, {
        loginDisabled: true
      })

// login
   case ACTIONS.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        disableVerification: true,
        loginDisabled: true
      })

    case ACTIONS.LOGIN_SUCCESS:
      return Object.assign({}, init, {
        token: action.token,
        user: action.user
      })

    case ACTIONS.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })

// logout
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

// get user
    case ACTIONS.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        message: null,
        user: action.user
      })

    case ACTIONS.GET_USER_FAILURE:
      return Object.assign({}, state, {
        message: action.message
      })

// update avatar
    case ACTIONS.UPDATE_AVATAR_URI:
      return Object.assign({}, state, {
        tmpAvatarUri: action.uri
      })

    case ACTIONS.UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tmpAvatarUri: null,
        user: action.user
      })

    case ACTIONS.UPDATE_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        tmpAvatarUri: null,
        updateError: action.updateError
      })

    case ACTIONS.CLEAR_UPDATE_ERROR:
      return Object.assign({}, state, {
        updateError: ''
      })

    case ACTIONS.SHOW_MOBILE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        showMobileLogin: true
      })

// send mobile number for verification
    case ACTIONS.UPLOAD_MOBILE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.UPLOAD_MOBILE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      })

    case ACTIONS.UPLOAD_MOBILE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })

// verify mobile number against verification code
    case ACTIONS.VERIFY_MOBILE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        showMobileLogin: false,
        showWechatLogin: false
      })

    case ACTIONS.VERIFY_MOBILE_SUCCESS:
      return Object.assign({}, state, {
        creds: Object.assign({}, state.creds, {
          mobile: action.mobile
        }),
        isFetching: false
      })

    case ACTIONS.VERIFY_MOBILE_FAILURE:
      return Object.assign({}, state, {
        creds: Object.assign({}, state.creds, {
          mobile: null
        }),
        isFetching: false,
        loginError: action.error,
        showMobileLogin: true,
        showWechatLogin: true
      })

    case ACTIONS.RESET_VERIFICATION_ERROR: 
      return Object.assign({}, state, {
        loginError: ''
      })

// open-auth with wechat
    case ACTIONS.WECHAT_AUTH_REQUEST:
      return Object.assign({}, state, {
        isAuthorizingWechat: true,
        isFetching: true,
        showMobileLogin: false,
        showWechatLogin: false
      })

    case ACTIONS.WECHAT_AUTH_WAITING:
      return Object.assign({}, state, {
        isAuthorizingWechat: false,
      })

    case ACTIONS.WECHAT_AUTH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.WECHAT_AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthorizingWechat: false,
        isFetching: false,
        showMobileLogin: true,
        showWechatLogin: true,
        creds: Object.assign({}, state.creds, initWechat)
      })

    case ACTIONS.WECHAT_OPENID_SUCCESS:
      return Object.assign({}, state, {
        creds: Object.assign({}, state.creds, action.wechat_data),
        isFetching: false
      })

    case ACTIONS.WECHAT_OPENID_FAILURE:
      return init

    default:
      return state
  }
}

export default loginReducer