'use strict'

import React, {
  PropTypes
} from 'react'

import {
  SegmentedControlIOS,
  StyleSheet
} from 'react-native'

import {
  Graphics
} from '../../../../common/__'

const SegmentedControl = (props) => {
  return (
    <SegmentedControlIOS
      enabled={props.enabled || true}
      selectedIndex={props.selectedIndex || 0}
      tintColor={props.tintColor || Graphics.colors.overlay}
      values={props.values}
      onChange={props.onChange}
      style={[style, props.style]}
    />
  )
},
style = StyleSheet.create({
  marginHorizontal: 15,
  width: 240
})

SegmentedControl.propTypes = {
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number,
  tintColor: PropTypes.string,
  enabled: PropTypes.bool,
  style: PropTypes.object
}

export default SegmentedControl
