'use strict'

import {
  CONFIG,
  ACCESS_TOKEN,
  USER
} from '../../../constants'

import * as ACTIONS from '../constants/toolbarConstants'
import {AppSettings} from '../../settings'

export const resetToolbar = (stats) => {
  return {
    type: ACTIONS.RESET_TOOLBAR,
    stats
  }
}

const sendActionRequest = (request) => {
  return {
    type: ACTIONS.REQUEST_TOOLBAR_ACTION,
    request
  }
}

const receiveActionResponse = (response) => {
  return {
    type: ACTIONS.TOOLBAR_ACTION_SUCCESS,
    response
  }
}

const receiveActionError = (message) => {
  return {
    type: ACTIONS.TOOLBAR_ACTION_FAILURE,
    message
  }
}

export const send = (req) => {
  let config = Object.assign({}, CONFIG.POST, {
    body: JSON.stringify(req)
  })

  return (dispatch) => {
    dispatch(sendActionRequest(req))

    return fetch(AppSettings.apiUri + 'logs', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        dispatch(receiveActionResponse(res))
      })
      .catch((err) => dispatch(receiveActionError(err)))
  }
}