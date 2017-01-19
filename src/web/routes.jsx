'use strict'

import React from 'react'
import {
  DefaultRoute,
  IndexRoute,
  Route
} from 'react-router'

import App from './components/app'
import PostDetail from './components/post/PostDetail'
import TrailDetail from './components/trail/TrailDetail'

export default (
  <Route path="/" component={App}>
    <Route path="posts/:id" component={PostDetail} />

    <Route path="trails/:id" component={TrailDetail} />
  </Route>
)
