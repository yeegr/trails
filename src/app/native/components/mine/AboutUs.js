'use strict'

import React, {
  PropTypes
} from 'react'

import {
  WebView
} from 'react-native'

import {
  AppSettings
} from '../../../../common/__'

const AboutUs = (props) => {
  return (
    <WebView
      scalesPageToFit={true}
      source={{uri: AppSettings.baseUri + 'about?showNavbar=false'}}
      style={{marginTop: 64}}
    />
  )
}

AboutUs.propTypes = {
  uri: PropTypes.string
}

export default AboutUs