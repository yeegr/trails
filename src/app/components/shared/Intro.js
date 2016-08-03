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

import TextView from '../shared/TextView'
import TagList from '../shared/TagList'

const Intro = (props) => {
  let align = (props.align === 'bottom') ? {paddingTop: Graphics.titleBar.height, paddingBottom: 5} : null, 
    excerpt = (props.excerpt) ? (
      <View style={styles.section}>
        <TextView
          style={{textAlign: 'center'}}
          textColor={Graphics.textColors.overlay}
          text={props.excerpt}
        />
      </View>
    ) : null,
    tags = (props.tags) ? (
      <View style={styles.section}>
        <TagList tags={props.tags} />
      </View>
    ) : null,
    bottomLeft = (props.bottomLeft) ? (
      <View style={[styles.corner, styles.cornerBottomLeft]}>
        {props.bottomLeft}
      </View>
    ) : null,
    bottomRight = (props.bottomRight) ? (
      <View style={[styles.corner, styles.cornerBottomRight]}>
        {props.bottomRight}
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
            <TextView
              fontSize='XXXL'
              style={{textAlign: 'center'}}
              textColor={Graphics.textColors.overlay}
              text={props.title}
            />
          </View>
          {excerpt}
          {tags}
        </View>
        {bottomLeft}
        {bottomRight}
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
    height: Graphics.heroImageHeight,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 30,
  },
  section: {
    marginTop: 5
  },
  corner: {
    position: 'absolute'
  },
  cornerBottomLeft: {
    left: 0,
    bottom: 0
  },
  cornerBottomRight: {
    right: 0,
    bottom: 0
  },
  cornerTopLeft: {
    left: 0,
    top: 0
  },
  cornerTopRight: {
    right: 0,
    top: 0
  }
})

Intro.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  tags: PropTypes.array
}
export default Intro