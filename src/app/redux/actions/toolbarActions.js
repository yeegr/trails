'use strict'

import * as ACTIONS from '../constants/toolbarConstants'
import * as loginActions from './loginActions'
import {
  FETCH,
  AppSettings
} from '../../../common/__'

export const resetToolbar = (stats) => {
  return {
    type: ACTIONS.RESET_TOOLBAR,
    stats
  }
}

const toolbarActionRequest = (request) => {
  return {
    type: ACTIONS.TOOLBAR_ACTION_REQUEST,
    request
  }
}

const toolbarActionSuccess = (response) => {
  return {
    type: ACTIONS.TOOLBAR_ACTION_SUCCESS,
    response
  }
}

const toolbarActionFailure = (message) => {
  return {
    type: ACTIONS.TOOLBAR_ACTION_FAILURE,
    message
  }
}

export const send = (req) => {
  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify(req)
  })

  return (dispatch) => {
    dispatch(toolbarActionRequest(req))

    return fetch(AppSettings.apiUri + 'logs', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        dispatch(toolbarActionSuccess(res))
        dispatch(loginActions.reloadUser())
      })
      .catch((err) => dispatch(toolbarActionFailure(err)))
  }
}