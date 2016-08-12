'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Image,
  StyleSheet,
  View,
} from 'react-native'

import TextView from './TextView'
import {hex2rgb} from '../../../common'
import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

const Gear = (props) => {
  let selected = (props.selected) ? styles.selected : null

  return (
    <Image style={styles.wrapper}
      source={{uri: AppSettings.assetUri + 'gears/' + props.number + '.jpg'}}
    >
      <View style={[styles.caption, selected]}>
        <TextView fontSize='XXS' textColor={Graphics.textColors.overlay} text={Lang.gearArray[props.number]} />
      </View>
    </Image>
  )
},
styles = StyleSheet.create({
  wrapper: {
    borderRadius: 4,
    flexDirection: 'column',
    height: Graphics.gear.sideLength,
    justifyContent: 'flex-end',
    marginBottom: 10,
    overflow: 'hidden',
    width: Graphics.gear.sideLength,
  },
  caption: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selected: {
    backgroundColor: hex2rgb(Graphics.colors.primary, .5)
  }
})

Gear.propTypes = {
  number: PropTypes.number.isRequired
}

export default Gear