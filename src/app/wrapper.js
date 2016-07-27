'use strict'

import React, {
  Component
} from 'react'

import {
  Provider
} from 'react-redux';

import App from './components/app'

import configureStore from './containers/store/configureStore'

let store = configureStore()
const Wrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

//store.subscribe(() => {store.getState()})

export default Wrapper