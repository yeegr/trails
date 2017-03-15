'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import Gear from './Gear'

import {
  UTIL,
  AppSettings
} from '../../../../common/__'

const GearList = (props) => {
  const margin = 15,
    sideLength = UTIL.calculateGridLength(AppSettings.device.width, 4, margin)

  return (
    <View style={styles.wrapper}>
      {
        props.list.map((n, i) => {
          return (
            <Gear
              key={i}
              number={n}
              sideLength={sideLength}
              margin={margin}
            />
          )
        })
      }
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  }
})

GearList.propTypes = {
  list: PropTypes.array.isRequired
}

export default GearList