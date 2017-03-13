'use strict'

import * as ACTIONS from '../constants/loginConstants'

const initWeChat = {
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
  showMobileLogin: true,
  showWeChatLogin: true,
  isAuthorizingWeChat: false,
  isFetching: false,
  tmpAvatarUri: null,
  loginError: '',
  updateError: '',
  action: '',
  creds: Object.assign({
    mobile: null
  }, initWeChat)
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
      return Object.assign({}, init, {
        showLogin: true
      })

    case ACTIONS.HIDE_LOGIN:
      return Object.assign({}, init, {
        showLogin: false
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
        showMobileLogin: false,
        token: action.token,
        user: action.user
      })

    case ACTIONS.LOGIN_FAILURE:
      return Object.assign({}, state, {
        showMobileLogin: true,
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
    case ACTIONS.SET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: null,
        tmpAvatarUri: null,
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
        showWeChatLogin: false
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
        showWeChatLogin: true
      })

    case ACTIONS.RESET_VERIFICATION_ERROR: 
      return Object.assign({}, state, {
        loginError: ''
      })

// open-auth with wechat
    case ACTIONS.WECHAT_AUTH_REQUEST:
      return Object.assign({}, state, {
        action: action.action,
        isAuthorizingWeChat: true,
        isFetching: true,
        showMobileLogin: false,
        showWeChatLogin: false
      })

    case ACTIONS.WECHAT_AUTH_WAITING:
      return Object.assign({}, state, {
        isAuthorizingWeChat: false,
      })

    case ACTIONS.WECHAT_AUTH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.WECHAT_AUTH_FAILURE:
      return Object.assign({}, state, {
        action: '',
        isAuthorizingWeChat: false,
        isFetching: false,
        showMobileLogin: true,
        showWeChatLogin: true,
        creds: Object.assign({}, state.creds, initWeChat)
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