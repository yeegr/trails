'use strict'

import React, {
  Component
} from 'react'

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating={true} />
    </View>
  )
},
styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20
  }
})

export default Loading