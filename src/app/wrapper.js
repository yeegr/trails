'use strict'

import React, {Component} from 'react'
import CodePush from 'react-native-code-push'
import {Provider} from 'react-redux';
import configureStore from './containers/store/configureStore'
import App from './components/app'

let store = configureStore()
const Wrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

//store.subscribe(() => {store.getState()})

export default CodePush(Wrapper)