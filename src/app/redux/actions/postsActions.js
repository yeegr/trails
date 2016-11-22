'use strict'

import * as ACTIONS from '../constants/postsConstants'
import {
  AppSettings
} from '../../settings'

// list posts
const listPostsRequest = (params) => {
  return {
    type: ACTIONS.LIST_POSTS_REQUEST,
    params
  }
}

const listPostsSuccess = (list) => {
  return {
    type: ACTIONS.LIST_POSTS_SUCCESS,
    list
  }
}

const listPostsFailure = (message) => {
  return {
    type: ACTIONS.LIST_POSTS_FAILURE,
    message
  }
}

export const listPosts = (params) => {
  return (dispatch) => {
    dispatch(listPostsRequest(params))

    return fetch(AppSettings.apiUri + 'posts/' + params)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(listPostsFailure(response.error))
          return Promise.reject(response)
        } else {
         dispatch(listPostsSuccess(response))
        }
      })
      .catch((err) => {
        dispatch(listPostsFailure(err))
      })
  }
}

// get one post
const getPostRequest = () => {
  return {
    type: ACTIONS.GET_POST_REQUEST
  }
}

const getPostSuccess = (post) => {
  return {
    type: ACTIONS.GET_POST_SUCCESS,
    post
  }
}

const getPostFailure = (message) => {
  return {
    type: ACTIONS.GET_POST_SUCCESS,
    message
  }
}

export const getPost = (id) => {
  return (dispatch) => {
    dispatch(getPostRequest())

    return fetch(AppSettings.apiUri + 'posts/' + id)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(getPostError(response.error))
          return Promise.reject(response)
        } else {
          dispatch(getPostSuccess(response))
        }
      })
      .catch((err) => {
        dispatch(getPostError(err))
      })
  }
}