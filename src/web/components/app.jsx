'use strict'  

import React, {
  Component,
  PropTypes
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

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
