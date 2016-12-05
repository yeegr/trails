'use strict'

import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './redux/store/configureStore'
import CodePush from 'react-native-code-push'
import App from './components/app'

let store = configureStore()

class Wrapper extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    CodePush.sync()
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

store.subscribe(() => {store.getState()})

export default CodePush(Wrapper)
