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
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this)

    this.state = {
      docHeight: 0
    }
  }

  onNavigationStateChange(evt) {
    this.setState({
      docHeight: parseInt(evt.jsEvaluationValue)
    })
  }

  render() {
    const style = `
        <style>
          html {font-size:10pt}
          html, body {margin:0; padding:0}
          img {max-width:100%}
          p {text-indent:2em}
          ol {padding-left:2em}
          li {margin-bottom:1.4em}
          figure {margin:0}
          h1 {font-size:1.5em; font-weight:400}
          figcaption {display:'block'; font-style:'italic'; text-align:'center'}
        </style>
      `,
      {html, uri} = this.props

    return (
      <WebView
        source={{html: style + '<div>' + html + '</div>', uri}}
        injectedJavaScript="document.body.firstChild.clientHeight"
        onNavigationStateChange={this.onNavigationStateChange}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
        style={[styles.webview, {height: this.state.docHeight}]}
      />
    )
  }  
}

const styles = StyleSheet.create({
  webview: {
    backgroundColor: 'transparent'
  }
})

WebViewWrapper.propTypes = {
  html: PropTypes.string.isRequired,
  uri: PropTypes.string
}

export default WebViewWrapper