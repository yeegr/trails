'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import TextView from './TextView'

const Empty = (props) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: 50
    }
  })

  return (
    <View style={styles.container}>
      <TextView
        text={props.text}
      />
    </View>
  )
}

Empty.propTypes = {
  text: PropTypes.string.isRequired
}

export default Empty