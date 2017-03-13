'use strict'  

import React, {
  Component,
  PropTypes
} from 'react'

import Nav from './nav'
import Footer from './footer'
import Login from './login'

class App extends Component {
  constructor(props) {
    super(props)  
  }
  
  render() {
    return (
      <app>
        <page>
          <Nav />
          {
            this.props.children
          }
          <Footer />
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
