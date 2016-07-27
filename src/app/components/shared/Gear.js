'use strict'

import {
  AppSettings,
  Lang
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {hex2rgb} from '../../../common'

const Gear = (props) => {
  let selected = (props.selected) ? styles.gearSelected : null, 
    gear = (
      <Image style={styles.gear}
        source={{uri: AppSettings.assetUri + 'gears/' + props.number + '.jpg'}}
      >
        <View style={[styles.gearCaption, selected]}>
          <Text style={styles.gearLabel}>{Lang.gearArray[props.number]}</Text>
        </View>
      </Image>
    )

    return gear
}

Gear.propTypes = {
  number: PropTypes.number.isRequired
}

export const GearList = (props) => {
  return (
    <View style={styles.gearList}>
    {
      props.list.map(function(n, i) {
        return (
          <Gear key={i} number={n} />
        )
      })
    }
    </View>
  )
}

GearList.propTypes = {
  list: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  gear: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 10,
    height: 60,
    width: 60,
  },
  gearCaption: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  gearSelected: {
    backgroundColor: hex2rgb(AppSettings.color.primary, .5)
  },
  gearLabel: {
    color: AppSettings.color.textOverlay,
    fontSize: 10,
  },
  gearList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  }
})

export default Gear