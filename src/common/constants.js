'use strict'

export const STORE_TYPES = {
  REMOTE: 'remote',
  LOCAL: 'local'
}

export const ACTION_TARGETS = {
  AREA: 'Area',
  TEMP: 'Temp', 
  TRAIL: 'Trail', 
  EVENT: 'Event',
  AGENDA: 'Agenda',
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

export const ACCOUNT_ACTIONS = {
  LOGIN: 'LOGIN',
  BIND: 'BIND',
  SAVE_HANDLE: 'SAVE_HANDLE',
  SAVE_AVATAR: 'SAVE_AVATAR'
}

export const TOOLBAR_TYPE_KEYS = {
  Area: 'areas',
  Trail: 'trails',
  Event: 'events',
  Post: 'posts'
}

export const ASSET_FOLDERS = {
  AREA: 'areas',
  TRAIL: 'trails',
  EVENT: 'events',
  POST: 'posts',
  USER: 'users'
}

export const WeChatOpenId = 'WeChatOpenId'

export const DEFAULT_LOCALE = 'zh-CN'
export const USER = 'user'
export const ACCESS_TOKEN = 'access_token'
