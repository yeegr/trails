'use strict'

import React, {
  PropTypes
} from 'react'

import {
  WebView
} from 'react-native'

import {
  AppSettings
} from '../../settings'

const AboutUs = (props) => {
  return (
    <WebView
      source={{uri: AppSettings.baseUri + 'about'}}
      source={{uri: 'https://github.com/facebook/react-native'}}
      style={{marginTop: 64}}
    />
  )
}

AboutUs.propTypes = {
  
}

export default AboutUs