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
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {TagList} from '../shared/Tag'

const Intro = (props) => {
  let align = (props.align === 'bottom') ? {paddingTop: AppSettings.titleBar.height} : null, 
    excerpt = (props.excerpt) ? (
      <View style={styles.section}>
        <Text style={styles.excerpt}>{props.excerpt}</Text>
      </View>
    ) : null,
    tags = (props.tags) ? (
      <View style={styles.section}>
        <TagList tags={props.tags} />
      </View>
    ) : null,
    bottomLeft = (props.bottomLeft) ? (
      <View style={[styles.corner, styles.cornerBottomLeft]}>
        {props.topLeft}
      </View>
    ) : null,
    bottomRight = (props.bottomRight) ? (
      <View style={[styles.corner, styles.cornerBottomRight]}>
        {props.topRight}
      </View>
    ) : null,
    topLeft = (props.topLeft) ? (
      <View style={[styles.corner, styles.cornerTopLeft]}>
        {props.topLeft}
      </View>
    ) : null,
    topRight = (props.topRight) ? (
      <View style={[styles.corner, styles.cornerTopRight]}>
        {props.topRight}
      </View>
    ) : null,
    view = (
      <View style={styles.wrapper}>
        <View style={[styles.content, align]}>
          <View style={styles.section}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          {excerpt}
          {tags}
        </View>
        {topLeft}
        {topRight}
      </View>
    )

  return view
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    height: AppSettings.heroImageHeight,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 15,
  },
  title: Object.assign({},
    AppSettings.textStyles.xxxLarge,
    {
      color: AppSettings.color.textOverlay,
    }),
  excerpt: Object.assign({},
    AppSettings.textStyles.large,
    {
      color: AppSettings.color.textOverlay,
      marginVertical: 5
    }),
  section: {
    marginTop: 5
  },
  corner: {
    backgroundColor: 'white',
    position: 'absolute'
  },
  cornerBottomLeft: {
    left: 15,
    bottom: 15
  },
  cornerBottomRight: {
    right: 15,
    bottom: 15
  },
  cornerTopLeft: {
    left: 15,
    top: 15
  },
  cornerTopRight: {
    right: 15,
    top: 15
  }
})

Intro.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  tags: PropTypes.array
}
export default Intro