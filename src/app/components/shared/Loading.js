'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={props.size || 'large'} animating={true} />
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

Loading.propTypes = {
  size: PropTypes.string
}

export default Loading