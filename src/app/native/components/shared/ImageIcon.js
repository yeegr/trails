'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import TextView from './TextView'

import {
  AppSettings,
  Graphics
} from '../../../../common/__'

const ImageIcon = (props) => {
  const sideLength = AppSettings.device.width / 2,
    styles = StyleSheet.create({
      wrapper: {
        height: sideLength,
        width: sideLength
      },
      image: {
        alignItems: 'center',
        justifyContent: 'center',
        height: sideLength,
        width: sideLength
      },
      info: {
        backgroundColor: Graphics.colors.overcast,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: sideLength,
        width: sideLength,
        paddingTop: sideLength / 2
      }
    })

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.wrapper}>
      <Image
        source={props.source}
        style={styles.image}
      />
      <View style={styles.info}>
        <TextView
          fontSize={'XL'}
          textColor={Graphics.colors.overlay}
          text={props.text}
        />
      </View>
    </TouchableOpacity>
  )
}

ImageIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  source: PropTypes.number.isRequired,
  text: PropTypes.string
}

export default ImageIcon
