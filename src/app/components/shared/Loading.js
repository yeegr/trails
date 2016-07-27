'use strict'

import React, {
  Component
} from 'react'

import {
  View,
  ActivityIndicator
} from 'react-native'

const Loading = (props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" animating={true} />
    </View>
  )
}

export default Loading