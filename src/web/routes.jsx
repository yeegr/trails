'use strict'

import React from 'react'
import {
  IndexRoute,
  Route
} from 'react-router'

import App from './components/app'
import Home from './components/home'
import AreaDetail from './components/area/AreaDetail'
import EventDetail from './components/event/EventDetail'
import SelectOrderGroup from './components/event/SelectOrderGroup'
import OrderEvent from './components/event/OrderEvent'
import OrderPayment from './components/event/OrderPayment'
import OrderSummary from './components/event/OrderSummary'
import OrderSuccess from './components/event/OrderSuccess'
import PostDetail from './components/post/PostDetail'
import TrailDetail from './components/trail/TrailDetail'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />

    <Route path="areas/:id" component={AreaDetail} />
    <Route path="events/:id" component={EventDetail} />
    <Route path="events/:id/select" component={SelectOrderGroup} />
    <Route path="events/:id/:selectedGroup/order" component={OrderEvent} />
    <Route path="events/:id/:selectedGroup/signups/:selectedSignUp" component={OrderSummary} />
    <Route path="events/:id/:selectedGroup/payment" component={OrderPayment} />
    <Route path="events/:id/:selectedGroup/success" component={OrderSuccess} />
    <Route path="posts/:id" component={PostDetail} />

    <Route path="trails/:id" component={TrailDetail} />
  </Route>
)
