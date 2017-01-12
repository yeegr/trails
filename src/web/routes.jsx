'use strict'

import React from 'react'
import {
  DefaultRoute,
  IndexRoute,
  Route
} from 'react-router'

import App from './components/app.jsx'
import PostDetail from './components/post/PostDetail.jsx'

export default (
  <Route path="/" component={App}>
    <Route path="posts/:id" component={PostDetail} />
  </Route>
)
