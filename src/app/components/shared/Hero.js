'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Intro from '../shared/Intro'
import {AppSettings, Graphics} from '../../settings'

const Hero = (props) => {
  let view = (
      <View style={styles.wrapper}>
        <Image 
          style={styles.image}
          source={{uri: AppSettings.assetUri + props.imageUri}}
        />
        <Intro 
          title={props.title}
          excerpt={props.excerpt}
          tags={props.tags}
          bottomLeft={props.bottomLeft}
          bottomRight={props.bottomRight}
          topLeft={props.topLeft}
          topRight={props.topRight}
        />
      </View>
    ),
    wrapper = (props.onPress) ? (<TouchableOpacity onPress={props.onPress}>{view}</TouchableOpacity>) : view

  return wrapper
},
styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000000',
    flex: 1,
    height: Graphics.heroImage.height
  },
  image: {
    bottom: 0,
    left: 0,
    opacity: Graphics.heroImage.opacity,
    resizeMode: 'cover',
    right: 0,
    position: 'absolute',
    top: 0
  }
})

Hero.propTypes = {
  imageUri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  tags: PropTypes.array,
  onPress: PropTypes.func
}

export default Hero