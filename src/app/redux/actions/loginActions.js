'use strict'

import {AsyncStorage} from 'react-native'
import * as ACTIONS from '../constants/loginConstants'
import {
  CONSTANTS,
  FETCH,
  UTIL,
  AppSettings,
  Lang
} from '../../settings'

// check user login status
export const isLoggedIn = () => {
  return AsyncStorage
    .multiGet([CONSTANTS.ACCESS_TOKEN, CONSTANTS.USER])
    .then((arr) => {
      if (arr[0][1] && arr[1][1]) {
        let token = arr[0][1],
          user = JSON.parse(arr[1][1])

        AsyncStorage
        .getItem(user._id)
        .then((str) => {
          return (UTIL.isNullOrUndefined(str)) ? {} : JSON.parse(str)
        })
        .then((obj) => {
          user.localTrails = UTIL.obj2arr(obj)
        })
/*          tmp = JSON.parse(arr[2][1]),
          trailArray = []

        if (tmp.hasOwnProperty(user._id)) {
          for (let key in tmp[user._id]) {
            if (tmp[user._id].hasOwnProperty(key)) {
              trailArray.push(tmp[key])
            }
          }
        }

        user.localTrails = trailArray*/

        return {
          type: ACTIONS.IS_LOGGED_IN,
          token,
          user
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

// upload mobile number for verification
const uploadMobileRequest = () => {
  return {
    type: ACTIONS.UPLOAD_MOBILE_REQUEST
  }
}

const uploadMobileSuccess = () => {
  return {
    type: ACTIONS.UPLOAD_MOBILE_SUCCESS
  }
}

const uploadMobileFailure = () => {
  return {
    type: ACTIONS.UPLOAD_MOBILE_FAILURE
  }
}

export const uploadMobileNumber = (mobile, action) => {
  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify({
      mobile,
      action
    })
  })

  return (dispatch) => {
    dispatch(uploadMobileRequest())

    return fetch(AppSettings.apiUri + 'validate', config)
      .then((res) => {
        if (res.status === 201) {
          dispatch(uploadMobileSuccess())
        } else {
          dispatch(uploadMobileFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => console.log(err))
  }
}

// reset verification error message
export const resetVerificationError = () => {
  return {
    type: ACTIONS.RESET_VERIFICATION_ERROR
  }
}

// verify mobile number against sms code
const verifyMobileRequest = () => {
  return {
    type: ACTIONS.VERIFY_MOBILE_REQUEST
  }
}

const verifyMobileSuccess = (mobile) => {
  return {
    type: ACTIONS.VERIFY_MOBILE_SUCCESS,
    mobile
  }
}

const verifyMobileFailure = (key) => {
  return {
    type: ACTIONS.VERIFY_MOBILE_FAILURE,
    error: Lang[key]
  }
}

export const verifyMobileNumber = (mobile, vcode, action) => {
  let config = Object.assign({}, FETCH.PUT, {
    body: JSON.stringify({
      mobile,
      vcode,
      action
    })
  })
  
  return (dispatch, getState) => {
    dispatch(verifyMobileRequest())

    return fetch(AppSettings.apiUri + 'validate', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.verified) {
          dispatch(verifyMobileSuccess(mobile))
          dispatch(loginUser(getState().login.creds))
        } else {
          dispatch(verifyMobileFailure(res.error))
          //return Promise.reject(res)
        }
      })
  }
}

// get WeChat authorization
export const wechatAuthRequest = (action) => {
  return {
    type: ACTIONS.WECHAT_AUTH_REQUEST,
    action
  }
}

export const wechatAuthWaiting = () => {
  return {
    type: ACTIONS.WECHAT_AUTH_WAITING
  }
}

export const wechatAuthSuccess = (wechat_token) => {
  return (dispatch) => {
    dispatch(getWeChatUserInfo(wechat_token))

    return {
      type: ACTIONS.WECHAT_AUTH_SUCCESS
    }
  }
}

export const wechatAuthFailure = (error) => {
  return {
    type: ACTIONS.WECHAT_AUTH_FAILURE,
    error
  }
}

const wechatOpenIdSuccess = (wechat_data) => {
  return {
    type: ACTIONS.WECHAT_OPENID_SUCCESS,
    wechat_data
  }
}

const wechatOpenIdFailure = (message) => {
  return {
    type: ACTIONS.WECHAT_OPENID_FAILURE,
    message
  }
}

const getWeChatUserInfo = (token) => {
  return (dispatch, getState) => {
    return fetch(AppSettings.assetUri + 'wechat/info/' + token)
      .then((res) => {
        return res.json()
      })
      .then((wechat) => {
        let state = getState().login

        switch (state.action) {
          case CONSTANTS.ACCOUNT_ACTIONS.LOGIN:
            dispatch(loginUser(wechat))
          break
          
          case CONSTANTS.ACCOUNT_ACTIONS.BIND:
            dispatch(updateUser(state.user._id, {
              wechat: wechat.wechat
            }))
          break
        }

        dispatch(wechatOpenIdSuccess(wechat))
      })
      .catch((err) => dispatch(wechatOpenIdFailure(err)))
  }
}

// complete sign-up process
export const showMobileLogin = () => {
  return {
    type: ACTIONS.SHOW_MOBILE_LOGIN
  }
}

const _completeSignup = (creds) => {
  let action = null

  if (creds.mobile) {
    action = wechatAuthRequest()
  }

  if (creds.wechat) {
    action = showMobileLogin()
  }

  return (dispatch) => {
    dispatch(action)
  }
}

// login user
const loginRequest = (creds) => {
  return {
    type: ACTIONS.LOGIN_REQUEST,
    creds
  }
}

const loginSuccess = (user) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    token: user.token,
    user
  }
}

const loginFailure = (message) => {
  return {
    type: ACTIONS.LOGIN_FAILURE,
    message
  }
}

export const loginUser = (creds) => {
  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify(creds)
  })

  return (dispatch) => {
    dispatch(loginRequest(creds))

    return fetch(AppSettings.apiUri + 'login', config)
      .then((res) => {
        if (res.status === 404) {
          dispatch(_completeSignup(creds))
        } else {
          return res.json()
        }
      })
      .then((res) => {
        if (res.token && res._id) {
          AsyncStorage
          .multiSet([
            [CONSTANTS.ACCESS_TOKEN, res.token],
            [CONSTANTS.USER, JSON.stringify(res)]
          ]).then(() => {
            res.localTrails = []
            dispatch(loginSuccess(res))
          })
        } else {
          dispatch(loginFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(loginFailure(err)))
  }
}

// get user information
const setUserSuccess = (user) => {
  return {
    type: ACTIONS.SET_USER_SUCCESS,
    token: user.token,
    user
  }
}

const setUserFailure = (message) => {
  return {
    type: ACTIONS.GET_USER_FAILURE,
    message
  }
}

const resetUser = (user) => {
  return (dispatch) => {
    AsyncStorage
    .setItem(CONSTANTS.USER, JSON.stringify(user))
    .then(() => {
      AsyncStorage
      .getItem(user._id)
      .then((str) => {
        return UTIL.isNullOrUndefined(str) ? {} : JSON.parse(str)
      })
      .then((obj) => {
        return UTIL.obj2arr(obj)
      })
      .then((trails) => {
        user.localTrails = trails
        dispatch(setUserSuccess(user))
      })
    })
  }
}

export const reloadUser = () => {
  return (dispatch, getState) => {
    let userId = getState().login.user._id

    return fetch(AppSettings.apiUri + 'users/' + userId, FETCH.GET)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.id) {
          AsyncStorage
          .setItem(CONSTANTS.USER, JSON.stringify(res))
          .then(() => {
            AsyncStorage
            .getItem(userId)
            .then((str) => {
              return UTIL.isNullOrUndefined(str) ? {} : JSON.parse(str)
            })
            .then((obj) => {
              return UTIL.obj2arr(obj)
            })
            .then((trails) => {
              res.localTrails = trails
              dispatch(setUserSuccess(res))
            })
          })
        } else {
          dispatch(setUserFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(setUserFailure(err)))
  }
}

// clear local trails
export const clearCache = () => {
  return (dispatch, getState) => {
    let userId = getState().login.user._id

    AsyncStorage
    .multiRemove([userId], () => {
      dispatch(reloadUser())
    })
  }
}

// update user
const updateUserRequest = () => {
  return {
    type: ACTIONS.UPDATE_USER_REQUEST
  }
}

const updateUserSuccess = (user) => {
  return (dispatch) => {
    dispatch(resetUser(user))
  }
}

const updateUserFailure = (key) => {
  return {
    type: ACTIONS.UPDATE_USER_FAILURE,
    updateError: Lang[key]
  }
}

export const updateAvatarUri = (uri) => {
  return {
    type: ACTIONS.UPDATE_AVATAR_URI,
    uri
  }
}

export const updateUserAvatar = (user_id, uri) => {
  let formData = new FormData()

  formData.append('file', {
    type: 'image/jpg',
    name: 'avatar.jpg',
    uri
  })

  let config = Object.assign({}, FETCH.UPLOAD, {
    body: formData
  })

  return (dispatch) => {
    dispatch(updateUserRequest())

    return fetch(AppSettings.apiUri + 'users/' + user_id + '/avatar', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        AsyncStorage
        .setItem(CONSTANTS.USER, JSON.stringify(res))
        .then(() => {
          dispatch(updateUserSuccess(res))
        })
      })
      .catch((err) => dispatch(updateUserFailure(err)))
  }
}

export const updateUser = (user_id, data) => {
  let config = Object.assign({}, FETCH.PUT, {
    body: JSON.stringify(data)
  })

  return (dispatch) => {
    dispatch(updateUserRequest())

    return fetch(AppSettings.apiUri + 'users/' + user_id, config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        AsyncStorage
        .setItem(CONSTANTS.USER, JSON.stringify(res))
        .then(() => {
          dispatch(updateUserSuccess(res))
        })
      })
      .catch((err) => dispatch(updateUserFailure(err)))
  }
}

export const updateUserMobile = (user_id, mobile, vcode) => {
  let config = Object.assign({}, FETCH.PUT, {
    body: JSON.stringify({
      mobile,
      vcode
    })
  })

  return (dispatch) => {
    dispatch(updateUserRequest())

    return fetch(AppSettings.apiUri + 'users/' + user_id + '/mobile', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.error) {
          return Promise.reject(res)
        } else {
          AsyncStorage
          .setItem(CONSTANTS.USER, JSON.stringify(res))
          .then(() => {
            dispatch(updateUserSuccess(res))
          })
        }
      })
      .catch((err) => dispatch(updateUserFailure(err.error)))
  }
}

export const clearUpdateError = () => {
  return {
    type: ACTIONS.CLEAR_UPDATE_ERROR
  }
}

// logout
const logoutRequest = () => {
  return {
    type: ACTIONS.LOGOUT_REQUEST
  }
}

const logoutSuccess = () => {
  return {
    type: ACTIONS.LOGOUT_SUCCESS
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest())

    AsyncStorage
    .multiRemove(['user', 'access_toklen'], () => {
      dispatch(logoutSuccess())
    })
  }
}