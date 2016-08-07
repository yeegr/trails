'use strict'

import {
  AsyncStorage
} from 'react-native'

import * as ACTIONS from '../constants/loginConstants'

const loginReducer = (state = {
  isAuthenticated: false,
  showLogin: false,
  disableVerification: true,
  showVerification: false,
  disableLogin: true,
  isFetching: false
}, action) => {
  switch (action.type) {
   case ACTIONS.IS_LOGGED_IN:
      return Object.assign({}, state, {
        token: action.token,
        user: action.user
      })

   case ACTIONS.SHOW_LOGIN:
      return Object.assign({}, state, {
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
        isAuthenticated: false,
        disableVerification: true,
        disableLogin: true
      })

    case ACTIONS.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        showLogin: false,
        showVerification: false,
        message: null,
        token: action.token,
        user: action.user
      })

    case ACTIONS.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        message: action.message
      })

    case ACTIONS.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })

    case ACTIONS.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
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

    default:
      return state
  }
}

export default loginReducer