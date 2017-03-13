'use strict'

import React from 'react'
import {AppRegistry} from 'react-native'
import Wrapper from './src/app/native/wrapper'

const Trails = () => {
  return (
    <Wrapper />
  )
}

AppRegistry.registerComponent('trails', () => Trails)