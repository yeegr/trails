'use strict'

import React from 'react'
import {render} from 'react-dom'
import {hashHistory, Router} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from '../redux/store/configureStore'

import routes from './routes'

import './favicon.ico'
import './styles/android/index.less'
import './index.html'

const wrapper = document.querySelector('wrapper'),
  store = configureStore()

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>
), wrapper)
