'use strict'

import * as ACTIONS from '../constants/commentsConstants'
import {
  FETCH,
  AppSettings
} from '../../../common/__'

// list comments
const listCommentsRequest = () => {
  return {
    type: ACTIONS.LIST_COMMENTS_REQUEST
  }
}

const listCommentsSuccess = (response) => {
  return {
    type: ACTIONS.LIST_COMMENTS_SUCCESS,
    list: response.comments
  }
}

const listCommentsFailure = (message) => {
  return {
    type: ACTIONS.LIST_COMMENTS_FAILURE,
    message
  }
}

export const listComments = (type, id) => {
  return (dispatch) => {
    dispatch(listCommentsRequest())

    return fetch(AppSettings.apiUri + 'comments?type=' + type + '&id=' + id)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        dispatch(listCommentsSuccess(res))
      })
      .catch((err) => dispatch(listCommentsFailure(err)))
  }
}

// create comment
const createCommentRequest = (request) => {
  return {
    type: ACTIONS.CREATE_COMMENT_REQUEST,
    request
  }
}

const createCommentSuccess = (response) => {
  return {
    type: ACTIONS.CREATE_COMMENT_SUCCESS,
    response
  }
}

const createCommentFailure = (message) => {
  return {
    type: ACTIONS.CREATE_COMMENT_FAILURE,
    message
  }
}

export const createComment = (req) => {
  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify(req)
  })

  return (dispatch) => {
    dispatch(createCommentRequest(req))

    return fetch(AppSettings.apiUri + 'comments', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        dispatch(createCommentSuccess(res))
        dispatch(listComments(req.target, req.ref))
      })
      .catch((err) => dispatch(createCommentFailure(err)))
  }
}