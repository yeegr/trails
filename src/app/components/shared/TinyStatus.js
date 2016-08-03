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

const TinyStatus = (props) => {
  const data = props.data,
    likeIcon = (data.likeCount > 0) ? (
      <Icon 
        path={Graphics.button.like}
        value={data.likeCount}
      />
    ) : null,
    saveIcon = (data.saveCount > 0) ? (
      <Icon 
        path={Graphics.button.save}
        value={data.saveCount}
      />
    ) : null,
    shareIcon = (data.shareCount > 0) ? (
      <Icon 
        path={Graphics.button.share}
        value={data.shareCount}
      />
    ) : null
  
  return (
    <View style={styles.statusBar}>
      {likeIcon}
      {saveIcon}
      {shareIcon}
    </View>
  )
},
Icon = (props) => {
  const statusBar = Graphics.statusBar,
    iconScale = statusBar.iconScale,
    sideLength = statusBar.sideLength,
    fillColor = props.fillColor || statusBar.fillColor,
    textColor = props.textColor || statusBar.textColor

  return (
    <View style={styles.icon}>
      <Svg width={sideLength} height={sideLength}>
        <Path scale={iconScale} fill={fillColor} d={props.path} />
      </Svg>
      <Text style={[styles.value, {color: textColor}]}>{props.value.toString()}</Text>
    </View>
  )
},
styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'flex-end'
  },
  icon: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Graphics.actionButton.sideLength,
    marginLeft: 5
  },
  value: {
    marginLeft: 2
  },
})

TinyStatus.propTypes = {
  data: PropTypes.object.isRequired
}

Icon.propTypes = {
  path: PropTypes.string.isRequired,
  value: PropTypes.number
}

export default TinyStatus
