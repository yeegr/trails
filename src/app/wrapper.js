'use strict'

import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './containers/store/configureStore'
//import CodePush from 'react-native-code-push'
import App from './components/app'

let store = configureStore()
class Wrapper extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

//store.subscribe(() => {store.getState()})

export default Wrapper
//export default CodePush(Wrapper)