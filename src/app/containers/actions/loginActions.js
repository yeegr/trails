'use strict'

import {AsyncStorage} from 'react-native'

import {
  CONFIG,
  ACCESS_TOKEN,
  USER
} from '../../../constants'
import {AppSettings} from '../../settings'
import * as ACTIONS from '../constants/loginConstants'

export const isLoggedIn = () => {
  return AsyncStorage
    .multiGet([ACCESS_TOKEN, USER])
    .then((arr) => {
      return {
        type: ACTIONS.IS_LOGGED_IN,
        token: arr[0][1],
        user: JSON.parse(arr[1][1])
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

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

export const getVerification = (mobile) => {
  let config = Object.assign({}, CONFIG.POST, {
    body: JSON.stringify({mobile: mobile})
  })
  
  /*
  return dispatch => {
    dispatch(requestLogin(creds))

    return fetch(LOGIN_URL, config)
      .then((response) => {
        return responnse.json()
      })
      .then((response) => {
        if (response.token && response.user) {
          AsyncStorage.multiSet([
            [ACCESS_TOKEN, response.token],
            [USER, JSON.stringify(response.user)]
          ])
          dispatch(receiveLogin(response.user))
        } else {
          dispatch(loginError(response.message))
          return Promise.reject(response)
        }
      })
      .catch(err => console.log('error: ', err))
  }
  */
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

export const loginUser = (creds) => {
  let config = Object.assign({}, CONFIG.POST, {
    body: JSON.stringify(creds)
  })

  return (dispatch) => {
    dispatch(requestLogin(creds))

    return fetch(AppSettings.apiUri + 'login', config)
      .then((res) => {
        return res.json()
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
        console.log(res)
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
