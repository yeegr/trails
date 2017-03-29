'use strict'

import React from 'react'
import {
  IndexRoute,
  Route
} from 'react-router'

import App from './components/app'
import Home from './components/home'
import About from './components/about'

// area components
import AreaList from './components/area/AreaList'
import AreaDetail from './components/area/AreaDetail'

// event components
import EventList from './components/event/EventList'
import EventDetail from './components/event/EventDetail'

// order components
import SelectOrderGroup from './components/order/SelectOrderGroup'
import OrderEvent from './components/order/OrderEvent'
import OrderPayment from './components/order/OrderPayment'
import OrderSummary from './components/order/OrderSummary'
import OrderSuccess from './components/order/OrderSuccess'

// post components
import PostList from './components/post/PostList'
import PostDetail from './components/post/PostDetail'

// trail components
import TrailDetail from './components/trail/TrailDetail'

import Gallery from './components/shared/Gallery'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />

    <Route path="/areas" component={AreaList} />
      <Route path="/areas/:id" component={AreaDetail} />
        <Route path="/areas/:id/gallery" component={Gallery} />

    <Route path="/events" component={EventList} />
      <Route path="/events/:id" component={EventDetail} />
        <Route path="/events/:id/gallery" component={Gallery} />

        <Route path="/events/:id/select" component={SelectOrderGroup} />

        <Route path="/events/:id/:selectedGroup/order" component={OrderEvent} />
        <Route path="/events/:id/:selectedGroup/signups/:selectedSignUp" component={OrderSummary} />
        <Route path="/events/:id/:selectedGroup/payment" component={OrderPayment} />

    <Route path="/posts" component={PostList} />
      <Route path="/posts/:id" component={PostDetail} />
        <Route path="/posts/:id/gallery" component={Gallery} />

      <Route path="/trails/:id" component={TrailDetail} />
        <Route path="/trails/:id/gallery" component={Gallery} />

    <Route path="/orders/:id/success" component={OrderSuccess} />
  </Route>
)
