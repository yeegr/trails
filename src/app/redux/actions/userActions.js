'use strict'

import * as ACTIONS from '../constants/userConstants'
import {
  CONSTANTS,
  FETCH,
  UTIL,
  AppSettings,
  Lang
} from '../../../common/__'

let storageEngine = null,
  storageType = null

// check user login status
const _isLoggedIn = (token, user) => {
  return {
    type: ACTIONS.IS_LOGGED_IN,
    token,
    user
  }
}

const _isLoggedOut = () => {
  return {
    type: ACTIONS.IS_LOGGED_OUT
  }  
}

export const isLoggedIn = () => {
  return (dispatch) => {
    storageEngine = AppSettings.storageEngine,
    storageType = AppSettings.storageType

    switch (storageType) {
      case CONSTANTS.STORAGE_TYPES.ASYNC:
        storageEngine
        .multiGet([
          CONSTANTS.ACCESS_TOKEN,
          CONSTANTS.USER
        ])
        .then((arr) => {
          if (arr[0][1] && arr[1][1]) {
            let token = arr[0][1],
              user = JSON.parse(arr[1][1])

            storageEngine
            .getItem(CONSTANTS.STORAGE_KEYS.TRAILS)
            .then((str) => {
              return (UTIL.isNullOrUndefined(str)) ? {} : JSON.parse(str)
            })
            .then((obj) => {
              return UTIL.obj2arr(obj)
            })
            .then((trails) => {
              dispatch(_isLoggedIn(token, user))
              dispatch(setLocalTrails(trails))
            })
          } else {
            dispatch(_isLoggedOut())
          }
        })
        .catch((err) => {
          dispatch(_isLoggedOut())
        })
      break

      case CONSTANTS.STORAGE_TYPES.LOCAL:
        if (storageEngine.getItem(CONSTANTS.ACCESS_TOKEN) !== null) {
          let token = storageEngine.getItem(CONSTANTS.ACCESS_TOKEN),
            user = JSON.parse(storageEngine.getItem(CONSTANTS.USER)),
            str = storageEngine.getItem(user._id),
            obj = (str) ? JSON.parse(str) : null,
            trails = (str) ? UTIL.obj2arr(obj) : []

          dispatch(_isLoggedIn(token, user))
          dispatch(setLocalTrails(trails))
        } else {
          dispatch(_isLoggedOut())
        }
      break
    }
  }
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
const _loginRequest = (creds) => {
  return {
    type: ACTIONS.LOGIN_REQUEST,
    creds
  }
}

const _loginSuccess = (user, trails) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    token: user.token,
    user,
    trails
  }
}

export const setLocalTrails = (trails) => {
  return {
    type: ACTIONS.SET_LOCAL_TRAILS,
    trails
  }
}

const _initLocalStorage = (user, trails) => {
  return (dispatch) => {
    let storageEngine = AppSettings.storageEngine,
      storageType = AppSettings.storageType
    
    switch (storageType) {
      case CONSTANTS.STORAGE_TYPES.ASYNC:
        storageEngine
        .setItem(CONSTANTS.STORAGE_KEYS.TRAILS, JSON.stringify(trails.obj))
        .then(() => {
          dispatch(_loginSuccess(user, trails.arr))
        })
      break

      case CONSTANTS.STORAGE_TYPES.LOCAL:
        storageEngine.setItem(CONSTANTS.STORAGE_KEYS.TRAILS, JSON.stringify(trails.obj)),
        dispatch(_loginSuccess(user, trails.arr))
      break
    }
  }
}

// initialize local storage
const _initSync = (user) => {
  return (dispatch) => {
    let arr = [],
      obj = {}

    if (user.trails.length > 0) {
      let query = '?in=[' + user.trails.join(',') + ']'

      fetch(AppSettings.apiUri + 'trails/' + query)
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        arr.map((trail) => {
          trail.storeKey = UTIL.generateRandomString(16)
          obj[trail.storeKey] = trail
        })

        dispatch(_initLocalStorage(user, {
          arr,
          obj
        }))
      })
      .catch((err) => console.log(err))
    } else {
      dispatch(_initLocalStorage(user, {
        arr,
        obj
      }))
    }
  }
}

const _loginFailure = (message) => {
  return {
    type: ACTIONS.LOGIN_FAILURE,
    message
  }
}

export const loginUser = (creds) => {
  creds.device = AppSettings.device

  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify(creds)
  })

  return (dispatch) => {
    dispatch(_loginRequest(creds))

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
          dispatch(_storeUser(res, 'LOGIN'))
        } else {
          dispatch(_loginFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(_loginFailure(err)))
  }
}

// get user information
const _storeUserSuccess = (user) => {
  return {
    type: ACTIONS.STORE_USER_SUCCESS,
    token: user.token,
    user
  }
}

const _storeUserFailure = (message) => {
  return {
    type: ACTIONS.STORE_USER_FAILURE,
    message
  }
}

const _storeUser = (user, type) => {
  return (dispatch) => {
    switch (storageType) {
      case CONSTANTS.STORAGE_TYPES.ASYNC:
        storageEngine
        .multiSet([
          [CONSTANTS.ACCESS_TOKEN, JSON.stringify(user.token)],
          [CONSTANTS.USER, JSON.stringify(user)]
        ])
        .then(() => {
          if (type === 'LOGIN') {
            dispatch(_initSync(user))
          } else {
            dispatch(_storeUserSuccess(user))
          }
        })
      break

      case CONSTANTS.STORAGE_TYPES.LOCAL:
        storageEngine.setItem(CONSTANTS.ACCESS_TOKEN, JSON.stringify(user.token))
        storageEngine.setItem(CONSTANTS.USER, JSON.stringify(user))

        if (type === 'LOGIN') {
          dispatch(_initSync(user))
        } else {
          dispatch(_storeUserSuccess(user))
        }
      break
    }
  }
}

const _fetchUser = (token) => {
  return (dispatch) => {
    fetch(AppSettings.apiUri + 'users/token/' + token, FETCH.GET)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res._id) {
        dispatch(_storeUser(res, 'RELOAD'))
      } else {
        dispatch(_storeUserFailure(res.message))
        return Promise.reject(res)
      }
    })
    .catch((err) => dispatch(_storeUserFailure(err)))
  }
}

export const reloadUser = () => {
  switch (storageType) {
    case CONSTANTS.STORAGE_TYPES.ASYNC:
      storageEngine
      .getItem(CONSTANTS.ACCESS_TOKEN)
      .then((token) => {
        _fetchUser(token)
      })
    break

    case CONSTANTS.STORAGE_TYPES.LOCAL:
      _fetchUser(storageEngine.getItem(CONSTANTS.ACCESS_TOKEN))
    break
  }
/*    let token = getState().login.user.token

    return fetch(AppSettings.apiUri + 'users/token/' + token, FETCH.GET)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res._id) {
          dispatch(_storeUser(res, 'RELOAD'))
        } else {
          dispatch(_storeUserFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(_storeUserFailure(err)))
  }*/
}

// update user
const _updateUserRequest = () => {
  return {
    type: ACTIONS.UPDATE_USER_REQUEST
  }
}

const _updateUserSuccess = (user) => {
  return (dispatch) => {
    dispatch(_storeUser(user, 'UPDATED'))
  }
}

const _updateUserFailure = (key) => {
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

const _updateUserStorage = (dispatch, user) => {
  switch (storageType) {
    case CONSTANTS.STORAGE_TYPES.ASYNC:
      storageEngine
      .setItem(CONSTANTS.USER, JSON.stringify(user))
      .then(() => {
        dispatch(_updateUserSuccess(user))
      })
    break

    case CONSTANTS.STORAGE_TYPES.LOCAL:
      storageEngine
      .setItem(CONSTANTS.USER, JSON.stringify(user))

      dispatch(_updateUserSuccess(user))
    break
  }
}

const _uploadPhotos = (type, id, photos) => {
  let formData = new FormData()
  formData.append('type', type)
  formData.append('id', id)
  formData.append('path', type + '/' + id + '/')

  photos.map((photo) => {
    formData.append(photo.key, photo)
  })

  let config = Object.assign({}, FETCH.UPLOAD, {
    body: formData
  })

  return (dispatch) => {
    dispatch(_updateUserRequest())

    return fetch(AppSettings.apiUri + 'photos', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        dispatch(_updateUserSuccess(res))
      })
      .catch((err) => dispatch(_updateUserFailure(err)))
  }
}

export const updateUser = (user_id, data) => {
  delete data.photos

  let config = Object.assign({}, FETCH.PUT, {
      body: JSON.stringify(data)
    })

  return (dispatch) => {
    dispatch(_updateUserRequest())

    return fetch(AppSettings.apiUri + 'users/' + user_id, config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        _updateUserStorage(dispatch, res)
      })
      .catch((err) => dispatch(_updateUserFailure(err)))
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
    dispatch(_updateUserRequest())

    return fetch(AppSettings.apiUri + 'users/' + user_id + '/avatar', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        _updateUserStorage(dispatch, res)
      })
      .catch((err) => dispatch(_updateUserFailure(err)))
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
    dispatch(_updateUserRequest())

    return fetch(AppSettings.apiUri + 'users/' + user_id + '/mobile', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        _updateUserStorage(dispatch, res)
      })
      .catch((err) => dispatch(_updateUserFailure(err)))
  }
}

export const updateUserFollowings = (ref) => {
  return (dispatch, getState) => {
    let user = getState().login.user,
      action = (user.followings.indexOf(ref) < 0) ? 'FOLLOW' : 'UNFOLLOW',
      config = Object.assign({}, FETCH.POST, {
        body: JSON.stringify({
          creator: user._id,
          ref,
          target: 'User',
          action
        })
      })

    return fetch(AppSettings.apiUri + 'logs', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        switch (res.action) {
          case 'FOLLOW':
            user.followings.push(ref)
          break

          case 'UNFOLLOW':
            user.followings.splice(user.followings.indexOf(ref), 1)
          break
        }

        _updateUserStorage(dispatch, user)
      })
      .catch((err) => dispatch(_updateUserFailure(err)))
  }
}

export const setPhotos = (id, selected) => {
  return (dispatch, getState) => {
    let originals = getState().login.user.photos,
      photos = UTIL.comparePhotoArrays(originals, selected)

    dispatch(_uploadPhotos(CONSTANTS.ACTION_TARGETS.USER, id, photos))
  }
}

export const clearUpdateError = () => {
  return {
    type: ACTIONS.CLEAR_UPDATE_ERROR
  }
}

// logout
const _logoutRequest = () => {
  return {
    type: ACTIONS.LOGOUT_REQUEST
  }
}

const _logoutSuccess = () => {
  return {
    type: ACTIONS.LOGOUT_SUCCESS
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(_logoutRequest())

    switch (storageType) {
      case CONSTANTS.STORAGE_TYPES.ASYNC:
        storageEngine
        .clear(() => {
          dispatch(_logoutSuccess())
        })
      break

      case CONSTANTS.STORAGE_TYPES.LOCAL:
        storageEngine.clear()
        dispatch(_logoutSuccess())
      break
    }
  }
}

// clear local trails
export const clearCache = () => {
  return (dispatch, getState) => {
    let userId = getState().login.user._id

    storageEngine
    .removeItem(userId, () => {
      dispatch(reloadUser())
    })
  }
}
