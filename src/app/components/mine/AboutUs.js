'use strict'

import React from 'react'
import {WebView} from 'react-native'
import {AppSettings} from '../../settings'
import styles from '../../styles/main'

const AboutUs = (props) => {
  return (
    <WebView
      source={{uri: AppSettings.baseUri + 'about'}}
      source={{uri: 'https://github.com/facebook/react-native'}}
      style={{marginTop: 64}}
    />
  )
}

export default AboutUs