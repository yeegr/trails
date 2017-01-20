'use strict'

import React from 'react'
import {
  DefaultRoute,
  IndexRoute,
  Route
} from 'react-router'

import App from './components/app'
import AreaDetail from './components/area/AreaDetail'
import PostDetail from './components/post/PostDetail'
import TrailDetail from './components/trail/TrailDetail'

export default (
  <Route path="/" component={App}>
    <Route path="areas/:id" component={AreaDetail} />
    <Route path="posts/:id" component={PostDetail} />

    <Route path="trails/:id" component={TrailDetail} />
  </Route>
)
