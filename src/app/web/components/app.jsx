'use strict'  

import React, {
  Component,
  PropTypes
} from 'react'

import Nav from './nav'
import Footer from './footer'
import Login from './login'

import Device from '../device'

import {
  CONSTANTS,
  AppSettings
} from '../../../common/__'

class App extends Component {
  constructor(props) {
    super(props)  
  }

  componentWillMount() {
    AppSettings.device = Device
    AppSettings.storageEngine = localStorage
    AppSettings.storageType = CONSTANTS.STORAGE_TYPES.LOCAL
    AppSettings.currentCity = '010'
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
