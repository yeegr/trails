'use strict'

import {
  AppSettings,
  Graphics
} from '../../settings'

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

const Hero = (props) => {
  let view = (
      <Image
        style={[styles.hero]}
        source={{uri: AppSettings.assetUri + props.imageUri}}
      >
        <Intro title={props.title} excerpt={props.excerpt} tags={props.tags} />
      </Image>
    ),
    wrapper = (props.onPress) ? (<TouchableOpacity onPress={props.onPress}>{view}</TouchableOpacity>) : view

  return wrapper
}

Hero.propTypes = {
  imageUri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  tags: PropTypes.array,
  onPress: PropTypes.func
}

const styles = StyleSheet.create({
  hero: {
    height: AppSettings.heroImageHeight,
    flex: 1,
  },
})

export default Hero