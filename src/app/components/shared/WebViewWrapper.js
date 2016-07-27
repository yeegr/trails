'use strict'

import {
  AppSettings,
  Graphics,
  WebViewCSS
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  WebView
} from 'react-native'

import {calcWebViewHeight} from '../../../common'

class WebViewWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      docHeight: 0,
    }
  }

  onNavigationStateChange(key, event) {
    this.setState(calcWebViewHeight(key, event))
  }

  render() {
    const {html, url} = this.props

    return (
      <WebView
        source={{html: WebViewCSS + html, baseUrl: url}}
        injectedJavaScript="document.body.offsetHeight"
        onNavigationStateChange={this.onNavigationStateChange.bind(this, 'docHeight')}
        scrollEnabled={false}
        automaticallyAdjustContentInsets={true}
        style={[styles.webview, {height: this.state.docHeight}]} />
    )
  }  
}

const styles = StyleSheet.create({
  webview: {
    backgroundColor: 'transparent',
    flex: 1,
  }
})

WebViewWrapper.propTypes = {
  html: PropTypes.string.isRequired,
  url: PropTypes.string
}

export default WebViewWrapper