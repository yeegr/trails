'use strict'

import React from 'react'
import {
  IndexRoute,
  Route
} from 'react-router'

import App from './components/app'
import Home from './components/home'
import About from './components/about'
import AreaList from './components/area/AreaList'
import AreaDetail from './components/area/AreaDetail'
import EventDetail from './components/event/EventDetail'
import SelectOrderGroup from './components/event/SelectOrderGroup'
import OrderEvent from './components/event/OrderEvent'
import OrderPayment from './components/event/OrderPayment'
import OrderSummary from './components/event/OrderSummary'
import OrderSuccess from './components/event/OrderSuccess'
import PostDetail from './components/post/PostDetail'
import TrailDetail from './components/trail/TrailDetail'

import Gallery from './components/shared/Gallery'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />

    <Route path="/areas" component={AreaList}>
      <Route path="/areas/:id" component={AreaDetail}>
        <Route path="/areas/:id/gallery" component={Gallery} />
      </Route>
    </Route>

      <Route path="/events/:id" component={EventDetail}>
        <Route path="/events/:id/gallery" component={Gallery} />

        <Route path="/events/:id/select" component={SelectOrderGroup} />
        <Route path="/events/:id/:selectedGroup/order" component={OrderEvent} />
        <Route path="/events/:id/:selectedGroup/signups/:selectedSignUp" component={OrderSummary} />
        <Route path="/events/:id/:selectedGroup/payment" component={OrderPayment} />
        <Route path="/events/:id/:selectedGroup/success" component={OrderSuccess} />
      </Route>

      <Route path="/posts/:id" component={PostDetail}>
        <Route path="/posts/:id/gallery" component={Gallery} />
      </Route>

    <Route path="/trails/:id" component={TrailDetail}>
      <Route path="/trails/:id/gallery" component={Gallery} />
    </Route>
  </Route>
)
