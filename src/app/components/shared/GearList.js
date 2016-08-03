'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import Gear from './Gear'

const GearList = (props) => {
  return (
    <View style={styles.wrapper}>
      {
        props.list.map(function(n, i) {
          return (
            <Gear key={i} number={n} onPress={props.onPress} />
          )
        })
      }
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  }
})

GearList.propTypes = {
  list: PropTypes.array.isRequired
}

export default GearList