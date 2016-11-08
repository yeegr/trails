'use strict'

import React, {
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
    justifyContent: 'space-between',
  }
})

GearList.propTypes = {
  list: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired
}

export default GearList