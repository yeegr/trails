import React, {
  Component
} from 'react'

import {
  AppRegistry
} from 'react-native'

import Wrapper from './src/app/wrapper'

const trails = () => {
  return (
    <Wrapper />
  )
}

AppRegistry.registerComponent('trails', () => trails)