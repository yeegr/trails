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
  Device
} from '../../settings'

const GearList = (props) => {
  const marginRight = 15,
    sideLength = Math.floor((Device.width - marginRight * 6) / 5)

  return (
    <View style={styles.wrapper}>
      {
        props.list.map((n, i) => {
          return (
            <Gear
              key={i}
              number={n}
              sideLength={sideLength}
              marginRight={marginRight}
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