'use strict'  

import React, {
  Component,
  PropTypes
} from 'react'

import semver from 'semver'

import {connect} from 'react-redux'
import * as loginActions from '../../redux/actions/loginActions'

import Nav from './nav'
import Footer from './footer'
import Login from './login'

import Device from '../device'

import {
  CONSTANTS,
  UTIL,
  AppSettings
} from '../../../common/__'

class App extends Component {
  constructor(props) {
    super(props)

    this._onWeChatBridgeReady = this._onWeChatBridgeReady.bind(this)
  }

  componentWillMount() {
    AppSettings.device = Device
    AppSettings.storageEngine = localStorage
    AppSettings.storageType = CONSTANTS.STORAGE_TYPES.LOCAL
    AppSettings.currentCity = '010'

    let {device} = AppSettings,
      {browserName, browserVersion} = device

    browserVersion = UTIL.versionCleaner(browserVersion)

    if (browserName === 'MicroMessenger' && semver.gte(browserVersion, '5.0.0')) {
      AppSettings.wrapperView = 'WeChat'
      AppSettings.defaultPaymentMethod = 'WeChatPay'
      AppSettings.paymentMethods.splice(0, 1)
    } else if (browserName === 'WebView') {
      AppSettings.wrapperView = 'WebView'
    } else {
      AppSettings.wrapperView = 'Browser'
      AppSettings.paymentMethods.splice(1, 1)
    }
  }

  componentDidMount() {
    if (AppSettings.wrapperView === 'MicroMessenger') {
      let query = UTIL.objectifyQuerystring(window.location.href)
      
      fetch(AppSettings.apiUri + 'wx/auth?code=' + query.code)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        AppSettings.WeChatUserOpenId = res.openid
      })
      .catch((error) => {
        console.log({error})
      })
    } else {
      AppSettings.WeChatUserOpenId = 'oiOKDwleB6wgxOsdxY-S7vnACyFc'
    }

    if (typeof(WeixinJSBridge) === 'undefined') {
      document.addEventListener('WeixinJSBridgeReady', this._onWeChatBridgeReady, false)
    } else {
      this._onWeChatBridgeReady()
    }

    this.props.dispatch(loginActions.isLoggedIn())
  }

  _onWeChatBridgeReady() {
    AppSettings.isWeChatReady = true
  }
  
  render() {
    let nav = <Nav />,
      footer = <Footer />

    if (AppSettings.wrapperView !== 'Browser') {
      nav = null
      footer = null
    }

    return (
      <app>
        <page>
          {nav}
          {this.props.children}
          {footer}
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
