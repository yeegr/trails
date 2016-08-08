'use strict'

import {
  Lang,
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

import Svg, {
  Path
} from 'react-native-svg'

import Icon from './Icon'

const TinyStatus = (props) => {
  const data = props.data,
    likeIcon = (data.likeCount > 0) ? (
      <Stat 
        path={Graphics.toolbar.like}
        value={data.likeCount}
      />
    ) : null,
    saveIcon = (data.saveCount > 0) ? (
      <Stat 
        path={Graphics.toolbar.save}
        value={data.saveCount}
      />
    ) : null,
    shareIcon = (data.shareCount > 0) ? (
      <Stat 
        path={Graphics.toolbar.share}
        value={data.shareCount}
      />
    ) : null,
    commentIcon = (data.commentCount > 0) ? (
      <Stat 
        path={Graphics.toolbar.comment}
        value={data.commentCount}
      />
    ) : null
  
  return (
    <View style={styles.wrapper}>
      {likeIcon}
      {saveIcon}
      {shareIcon}
    </View>
  )
},
Stat = (props) => {
  const icon = Graphics.tinyStatus.icon

  return (
    <View style={styles.stat}>
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={icon.fillColor}
        scale={icon.scale}
        sideLength={icon.sideLength}
        stack="horizontal"
        valueColor={icon.textColor}
        viewBox={icon.viewBox}
        path={props.path}
        value={props.value.toString()}
      />
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'flex-end'
  },
  stat: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Graphics.toolbar.icon.sideLength,
    marginLeft: 10
  },
  value: {
    marginLeft: 2
  },
})

TinyStatus.propTypes = {
  data: PropTypes.object.isRequired
}

Stat.propTypes = {
  path: PropTypes.string.isRequired,
  value: PropTypes.number
}

export default TinyStatus
