'use strict'

import {CONFIG} from '../../../constants'
import {AppSettings} from '../../settings'
import * as ACTIONS from '../constants/postsConstants'

// list posts
const requestPosts = (params) => {
  return {
    type: ACTIONS.REQUEST_POSTS,
    params
  }
}

const receivePosts = (list) => {
  return {
    type: ACTIONS.LIST_POSTS_SUCCESS,
    list
  }
}

const listPostsError = (message) => {
  return {
    type: ACTIONS.LIST_POSTS_FAILURE,
    message
  }
}

export const listPosts = (params) => {
  return (dispatch) => {
    dispatch(requestPosts(params))

    return fetch(AppSettings.apiUri + 'posts/' + params)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(listPostsError(response.error))
          return Promise.reject(response)
        } else {
         dispatch(receivePosts(response))
        }
      })
      .catch((err) => {
        dispatch(listPostsError(err))
      })
  }
}

// get one post
const requestPost = (id) => {
  return {
    type: ACTIONS.REQUEST_POST
  }
}

const receivePost = (post) => {
  return {
    type: ACTIONS.GET_POST_SUCCESS,
    post
  }
}

const getPostError = (message) => {
  return {
    type: ACTIONS.GET_POST_SUCCESS,
    message
  }
}

export const getPost = (id) => {
  return (dispatch) => {
    dispatch(requestPost(id))

    return fetch(AppSettings.apiUri + 'posts/' + id)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(getPostError(response.error))
          return Promise.reject(response)
        } else {
          dispatch(receivePost(response))
        }
      })
      .catch((err) => {
        dispatch(getPostError(err))
      })
  }
}