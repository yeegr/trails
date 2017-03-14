'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import CallToAction from '../shared/CallToAction'
import Toolbar from '../shared/Toolbar'

import {
  Graphics
} from '../../../../common/__'

const ActionBar = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={{flex:1}}>
        <Toolbar type={props.type} data={props.data} />
      </View>
      <View style={{flex:1}}>
        <CallToAction
          onPress={props.buttonEvent}
          label={props.buttonText}
        />
      </View>
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.actionBar.backgroundColor,
    flexDirection: 'row',
    height: Graphics.actionBar.height,
    overflow: 'hidden',
  }
})

ActionBar.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  buttonEvent: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  showLabel: PropTypes.bool.isRequired
}

export default ActionBar