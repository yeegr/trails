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

import ImagePath from '../shared/ImagePath'
import Intro from '../shared/Intro'
import {AppSettings, Graphics} from '../../settings'

const Hero = (props) => {
  const url = ImagePath({type: 'hero', path: props.imageUri})

  let view = (
      <View style={styles.wrapper}>
        <Image 
          style={styles.image}
          source={{uri: url}}
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
    backgroundColor: Graphics.heroImage.backgroundColor,
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