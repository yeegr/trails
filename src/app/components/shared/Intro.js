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
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {TagList} from '../shared/Tag'

const Intro = (props) => {
  let excerpt = (props.excerpt) ? (
      <Text style={styles.excerpt}>{props.excerpt}</Text>
    ) : null,
    tags = (props.tags) ? (
      <TagList tags={props.tags} />
    ) : null, 
    view = (
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>{props.title}</Text>
          {excerpt}
          {tags}
        </View>
      </View>
    )

  return view
}

Intro.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  tags: PropTypes.array
}

const styles = StyleSheet.create({
  wrapper: {
    height: AppSettings.heroImageHeight,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
    padding: 15,
  },
  title: Object.assign({},
    AppSettings.textStyles.extraLarge,
    {
      color: AppSettings.color.textOverlay,
    }),
  excerpt: Object.assign({},
    AppSettings.textStyles.normal,
    {
      color: AppSettings.color.textOverlay,
      marginVertical: 5
    })
})

export default Intro