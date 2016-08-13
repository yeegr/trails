'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  WebView
} from 'react-native'

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
    const {html, url} = this.props,
    css = '<style>html {font-size: 12px} img {max-width: 100%} p {text-indent: 2em}</style>'

    return (
      <WebView
        source={{html: css + html, baseUrl: url}}
        injectedJavaScript="document.body.offsetHeight"
        onNavigationStateChange={this.onNavigationStateChange.bind(this, 'docHeight')}
        scrollEnabled={false}
        automaticallyAdjustContentInsets={true}
        style={[styles.webview, {height: this.state.docHeight}]} />
    )
  }  
}

const calcWebViewHeight = (key, evt) =>{
  let tmp = {}

  if (!isNaN(evt.jsEvaluationValue)) {
    tmp[key] = parseInt(evt.jsEvaluationValue) 
  }

  return tmp
},
styles = StyleSheet.create({
  webview: {
    backgroundColor: 'transparent',
    flex: 1
  }
})

WebViewWrapper.propTypes = {
  html: PropTypes.string.isRequired,
  url: PropTypes.string
}

export default WebViewWrapper