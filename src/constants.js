'use strict'

export const ACTION_TARGETS = {
  AREA: 'Area',
  TRAIL: 'Trail', 
  EVENT: 'Event',
  POST: 'Post',
  USER: 'User',
  MINE: 'Mine'
}

export const HOME_TABS = {
  AREAS: 'Areas',
  TRAILS: 'Trails',
  EVENTS: 'Events',
  POSTS: 'Posts',
  MINE: 'Mine'
}

export const USER_ACTIONS = {
  FOLLOW: 'FOLLOW', 
  UNFOLLOW: 'UNFOLLOW', 
  APPLY: 'APPLY',
  RETRACT: 'RETRACT',
  LIKE: 'LIKE',
  UNLIKE: 'UNLIKE',
  SAVE: 'SAVE',
  UNSAVE: 'UNSAVE',
  SHARE: 'SHARE'
}

export const USER = 'user'
export const ACCESS_TOKEN = 'access_token'

export const CONFIG = {
  GET: {
    method: 'GET'
  },

  POST: {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  },

  UPDATE: {
    method: 'UPDATE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },

  PUT: {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },

  DELETE: {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}


