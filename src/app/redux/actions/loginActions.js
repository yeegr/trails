'use strict'

import {AsyncStorage} from 'react-native'
import {AppSettings} from '../../settings'
import {CONFIG, ACCESS_TOKEN, USER} from '../../../util/constants'
import * as ACTIONS from '../constants/loginConstants'

export const isLoggedIn = () => {
  return AsyncStorage
    .multiGet([ACCESS_TOKEN, USER])
    .then((arr) => {
      if (arr[0][1] && arr[1][1]) {
        return {
          type: ACTIONS.IS_LOGGED_IN,
          token: arr[0][1],
          user: JSON.parse(arr[1][1])
        }
      }

      return {
        type: ACTIONS.IS_LOGGED_OUT
      }
    })
    .catch((err) => {
      return {
        type: ACTIONS.IS_LOGGED_OUT
      }
    })
}

// toggle login page
export const showLogin = () => {
  return {
    type: ACTIONS.SHOW_LOGIN
  }
}

export const hideLogin = () => {
  return {
    type: ACTIONS.HIDE_LOGIN
  }
}

// toggle mobile number verification form
export const enableVerification = () => {
  return {
    type: ACTIONS.ENABLE_VERIFICATION
  }
}

export const disableVerification = () => {
  return {
    type: ACTIONS.DISABLE_VERIFICATION
  }
}

export const showVerification = () => {
  return {
    type: ACTIONS.SHOW_VERIFICATION
  }
}

export const hideVerification = () => {
  return {
    type: ACTIONS.HIDE_VERIFICATION
  }
}

// send mobile number for verification
const requestMobileVerification = () => {
  return {
    type: ACTIONS.SEND_MOBILE_VERIFICATION_REQUEST
  }
}

const mobileVerified = (mobile) => {
  console.log('mobile verified')
  //loginUser({mobile})

  return (dispatch) => {
    dispatch(loginUser({mobile}))
  }
/*
  return {
    type: ACTIONS.MOBILE_VERIFICATION_SUCCESS,
    mobile
  }
  */
}

const mobileVerificationFailed = () => {
  return {
    type: ACTIONS.MOBILE_VERIFICATION_FAILURE
  }
}

export const verifyMobileNumber = (mobile, vcode) => {
  let config = Object.assign({}, CONFIG.POST, {
    body: JSON.stringify({
      mobile,
      vcode
    })
  })
  
  return dispatch => {
    dispatch(requestMobileVerification())

    return dispatch(mobileVerified(mobile))

/*
    return fetch(MOBILE_VERIFICATION_URL, config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.verified) {
          dispatch(mobileVerified(mobile))
        } else {
          dispatch(mobileVerificationFailed(res.message))
          return Promise.reject(res)
        }
      })
      .catch(err => console.error(err))*/
  }
}

export const enableLogin = () => {
  return {
    type: ACTIONS.ENABLE_LOGIN
  }
}

export const disableLogin = () => {
  return {
    type: ACTIONS.DISABLE_LOGIN
  }
}

const requestLogin = (creds) => {
  return {
    type: ACTIONS.REQUEST_LOGIN,
    creds
  }
}

const receiveLogin = (user) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    token: user.token,
    user
  }
}

const loginError = (message) => {
  return {
    type: ACTIONS.LOGIN_FAILURE,
    message
  }
}

const createUser = (wechat, mobile) => {
  let user = Object.assign({}, wechat)

  user.wechat = user.openid
  user.mobile = state.mobile

  return {
    type: ACTIONS.CREATE_USER,
    creds
  }
}

export const sendWechatAuthRequest = () => {
  return {
    type: ACTIONS.SEND_WECHAT_AUTH_REQUEST
  }
}

export const wechatAuthRequestSend = () => {
  return {
    type: ACTIONS.WECHAT_AUTH_REQUEST_SEND
  }
}

const receiveWechatUserInfo = (wechat) => {
  return {
    type: ACTIONS.WECHAT_USER_INFO_SUCCESS,
    wechat
  }
}

const wechatUserInfoError = (message) => {
  return {
    type: ACTIONS.WECHAT_USER_INFO_FAILURE,
    message
  }
}

export const requestWechatUserInfo = (wechat_token) => {
  return (dispatch) => {
    return fetch(AppSettings.assetUri + 'wechat/info/' + wechat_token)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log(res)
        dispatch(receiveWechatUserInfo(res))
      })
      .catch((err) => dispatch(wechatUserInfoError(err)))
  }
}

export const showMobileLoginForm = () => {
  return {
    type: ACTIONS.SHOW_MOBILE_LOGIN_FORM
  }
}

const completeSignup = (creds) => {
  var action = null

  if (creds.mobile) {
    action = sendWechatAuthRequest()
  }

  if (creds.wechat) {
    action = showMobileLoginForm()
  }

  return (dispatch) => {
    dispatch(action)
  }
}

export const loginUser = (creds) => {
  let config = Object.assign({}, CONFIG.POST, {
    body: JSON.stringify(creds)
  })

  return (dispatch) => {
    dispatch(requestLogin(creds))

    return fetch(AppSettings.apiUri + 'login', config)
      .then((res) => {
        console.log(res)
        if (res.status === 404) {
          dispatch(completeSignup(creds))
        } else {
          return res.json()
        }
      })
      .then((res) => {
        if (res.token && res.id) {
          AsyncStorage.multiSet([
            [ACCESS_TOKEN, res.token],
            [USER, JSON.stringify(res)]
          ]).then(() => {
            dispatch(receiveLogin(res))
          })
        } else {
          dispatch(loginError(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(loginError(err)))
  }
}


const receiveUser = (user) => {
  return {
    type: ACTIONS.GET_SUCCESS,
    token: user.token,
    user
  }
}

const getUserError = (message) => {
  return {
    type: ACTIONS.GET_FAILURE,
    message
  }
}

export const getUpdatedUser = (user_id) => {
  return (dispatch) => {
    return fetch(AppSettings.apiUri + 'users/' + user_id, CONFIG.GET)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.id) {
          AsyncStorage
          .setItem(USER, JSON.stringify(res))
          .then(() => {
            dispatch(receiveUser(res))
          })
        } else {
          dispatch(getUserError(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(getUserError(err)))
  }
}

const requestLogout = () => {
  return {
    type: ACTIONS.LOGOUT_REQUEST
  }
}

const receiveLogout = () => {
  return {
    type: ACTIONS.LOGOUT_SUCCESS
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch(requestLogout())
    AsyncStorage.multiRemove([ACCESS_TOKEN, USER], () => {
      dispatch(receiveLogout())
    })
  }
}

const requestUserUpdate = () => {
  return {
    type: ACTIONS.REQUEST_USER_UPDATE
  }
}

const receiveUpdatedUser = (user) => {
  return {
    type: ACTIONS.USER_UPDATE_SUCCESS,
    user
  }
}

const userUpdateError = (message) => {
  return {
    type: ACTIONS.USER_UPDATE_FAILURE,
    message
  }
}

export const updateUserAvatar = (user_id, uri) => {
  let formData = new FormData()

  formData.append('file', {
    type: 'image/jpg',
    name: 'avatar.jpg',
    uri
  })

  let config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData
  }

  return (dispatch) => {
    dispatch(requestUserUpdate())

    return fetch(AppSettings.apiUri + 'users/' + user_id + '/avatar', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        AsyncStorage
        .setItem(USER, JSON.stringify(res))
        .then(() => {
          dispatch(receiveUpdatedUser(res))
        })
      })
      .catch((err) => dispatch(userUpdateError(err)))
  }
}

export const updateUser = (user_id, data) => {
  let config = Object.assign({}, CONFIG.PUT, {
    body: JSON.stringify(data)
  })

  return (dispatch) => {
    dispatch(requestUserUpdate())

    return fetch(AppSettings.apiUri + 'users/' + user_id, config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        AsyncStorage
        .setItem(USER, JSON.stringify(res))
        .then(() => {
          dispatch(receiveUpdatedUser(res))
        })
      })
      .catch((err) => dispatch(userUpdateError(err)))
  }
}
