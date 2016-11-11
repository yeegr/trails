'use strict'

import {AsyncStorage} from 'react-native'
import {CONSTANTS} from '../../settings'
import * as ACTIONS from '../constants/loginConstants'

const wechat = {
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
  disableValidation: true,
  showValidation: false,
  verifyMobile: false,
  loginDisabled: true,
  isAuthorizingWechat: false,
  isFetching: false,
  tmpAvatarUri: null,
  loginError: '',
  updateError: '',
  creds: Object.assign({
    mobile: null
  }, wechat)
},
loginReducer = (state = init, action) => {
  switch (action.type) {
    case ACTIONS.IS_LOGGED_IN:
      return Object.assign({}, state, {
        toke: action.token,
        user: action.user
      })

    case ACTIONS.IS_LOGGED_OUT:
      AsyncStorage.multiRemove([CONSTANTS.ACCESS_TOKEN, CONSTANTS.USER])

      return Object.assign({}, init, {
        toke: null,
        user: null
      })

    case ACTIONS.SHOW_LOGIN:
      return Object.assign({}, state, {
        showLogin: true
      })

    case ACTIONS.HIDE_LOGIN:
      return Object.assign({}, init, {
        showLogin: false
      })

    case ACTIONS.ENABLE_VERIFICATION:
      return Object.assign({}, state, {
        disableValidation: false
      })

    case ACTIONS.DISABLE_VERIFICATION:
      return Object.assign({}, state, {
        disableValidation: true
      })

    case ACTIONS.SHOW_VERIFICATION:
      return Object.assign({}, state, {
        showValidation: true
      })

    case ACTIONS.HIDE_VERIFICATION:
      return Object.assign({}, state, {
        showValidation: false
      })

    case ACTIONS.ENABLE_LOGIN:
      return Object.assign({}, state, {
        loginDisabled: false
      })

    case ACTIONS.DISABLE_LOGIN:
      return Object.assign({}, state, {
        loginDisabled: true
      })

   case ACTIONS.REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        disableValidation: true,
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

    case ACTIONS.UPDATE_AVATAR_URI:
      return Object.assign({}, state, {
        tmpAvatarUri: action.uri
      })

    case ACTIONS.REQUEST_USER_UPDATE:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.USER_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user,
        tmpAvatarUri: null
      })

    case ACTIONS.USER_UPDATE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        updateError: action.updateError,
        tmpAvatarUri: null
      })

    case ACTIONS.CLEAR_UPDATE_ERROR:
      return Object.assign({}, state, {
        updateError: ''
      })

    case ACTIONS.SHOW_MOBILE_LOGIN_FORM:
      return Object.assign({}, state, {
        showMobileForm: true
      })

// send mobile number for validation
    case ACTIONS.SEND_MOBILE_NUMBER_FOR_VALIDATION:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ACTIONS.MOBILE_NUMBER_SAVED:
      return Object.assign({}, state, {
        isFetching: false
      })

    case ACTIONS.MOBILE_NUMBER_VALIDATION_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })

// verify mobile number against validation code
    case ACTIONS.SEND_MOBILE_VERIFICATION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        creds: Object.assign({}, state.creds, {
          mobile: null
        })
      })

    case ACTIONS.MOBILE_VERIFICATION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        creds: Object.assign({}, state.creds, {
          mobile: action.mobile
        })
      })

    case ACTIONS.MOBILE_VERIFICATION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        creds: Object.assign({}, state.creds, {
          mobile: null
        }),
        loginError: action.error
      })

    case ACTIONS.RESET_VERIFICATION_ERROR: 
      return Object.assign({}, state, {
        loginError: ''
      })

// open-auth with wechat
    case ACTIONS.SEND_WECHAT_AUTH_REQUEST:
      return Object.assign({}, state, {
        isAuthorizingWechat: true
      })

    case ACTIONS.WECHAT_AUTH_REQUEST_SEND:
      return Object.assign({}, state, {
        isAuthorizingWechat: false
      })

    case ACTIONS.WECHAT_USER_INFO_SUCCESS:
      return Object.assign({}, state, {
        creds: Object.assign({}, state.creds, action.wechat)
      })

    case ACTIONS.WECHAT_USER_INFO_FAILURE:
      return Object.assign({}, state, {
        creds: Object.assign({}, state.creds, wechat)
      })

    default:
      return state
  }
}

export default loginReducer