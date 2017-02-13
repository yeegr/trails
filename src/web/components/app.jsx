'use strict'  

import React, {
  Component
} from 'react'

import Login from './login'

class App extends Component {
  constructor(props) {
    super(props)  
  }
  
  render() {
    return (
      <app>
        <page>
        {
          this.props.children
        }
        </page>
        <Login />
      </app>
    )
  }
}

export default App
