'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import Icon from './Icon'

import {
  Graphics
} from '../../../../common/__'

const Stat = (props) => {
  const icon = Graphics.tinyStatus.icon

  return (
    <View style={styles.stat}>
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={icon.fillColor}
        scale={icon.scale}
        sideLength={icon.sideLength}
        stack={'horizontal'}
        valueColor={icon.textColor}
        viewBox={icon.viewBox}
        path={props.path}
        value={props.value.toString()}
      />
    </View>
  )
},
styles = StyleSheet.create({
  stat: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Graphics.toolbar.icon.sideLength,
    marginLeft: 10
  }
})

Stat.propTypes = {
  path: PropTypes.string.isRequired,
  value: PropTypes.number
}

export default Stat
