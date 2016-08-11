'use strict'

import {
  CONFIG,
  ACCESS_TOKEN,
  USER
} from '../../../constants'

import * as ACTIONS from '../constants/commentConstants'
import * as loginActions from './loginActions'
import {AppSettings} from '../../settings'

const sendListRequest = (params) => {
  return {
    type: ACTIONS.SEND_LIST_REQUEST,
    params
  }
}

const receiveListResponse = (response) => {
  return {
    type: ACTIONS.LIST_COMMENTS_SUCCESS,
    response
  }
}

const receiveListError = (message) => {
  return {
    type: ACTIONS.LIST_COMMENTS_FAILURE,
    message
  }
}

export const listComments = (params) => {
  return (dispatch) => {
    dispatch(sendListRequest(params))

    return fetch(AppSettings.apiUri + 'comments/' + params)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log(res)
        dispatch(receiveListResponse(res))
      })
      .catch((err) => dispatch(receiveListError(err)))
  }
}

// create comment
const sendCreateRequest = (request) => {
  return {
    type: ACTIONS.SEND_CREATE_REQUEST,
    request
  }
}

const receiveCreateResponse = (response) => {
  return {
    type: ACTIONS.CREATE_COMMENT_SUCCESS,
    response
  }
}

const receiveCreateError = (message) => {
  return {
    type: ACTIONS.CREATE_COMMENT_FAILURE,
    message
  }
}

export const createComment = (req) => {
  let config = Object.assign({}, CONFIG.POST, {
    body: JSON.stringify(req)
  })

  return (dispatch) => {
    dispatch(sendCreateRequest(req))

    return fetch(AppSettings.apiUri + 'comments', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        dispatch(receiveCreateResponse(res))
        //dispatch(loginActions.getUpdatedUser(req.creator))
      })
      .catch((err) => dispatch(receiveCreateError(err)))
  }
}