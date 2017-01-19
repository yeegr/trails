'use strict'

import React from 'react'
import {render} from 'react-dom'
import {hashHistory, Router} from 'react-router'

import routes from './routes'

import './styles/android/index.less'
import './index.html'

const wrapper = document.querySelector('wrapper')

render((
  <Router history={hashHistory}>
    {routes}
  </Router>
), wrapper)
