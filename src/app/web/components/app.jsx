'use strict'  

import React, {
  Component,
  PropTypes
} from 'react'

import {connect} from 'react-redux'
import * as loginActions from '../../redux/actions/loginActions'

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

  componentDidMount() {
    this.props.dispatch(loginActions.isLoggedIn())
  }
  
  render() {
    let nav = (AppSettings.showNavbar === true) ? (
      <Nav />
    ) : null

    return (
      <app>
        <page>
          {nav}
          {this.props.children}
          <Footer />
        </page>
        <Login />
      </app>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
