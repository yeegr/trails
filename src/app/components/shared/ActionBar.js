'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Toolbar from '../shared/Toolbar'
import CallToAction from '../shared/CallToAction'

import {
  Graphics
} from '../../settings'

const ActionBar = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={{flex:1}}>
        <Toolbar type={props.type} data={props.data} />
      </View>
      <View style={{flex:1}}>
        <CallToAction onPress={props.buttonEvent} label={props.buttonText} />
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
  showLabel: PropTypes.bool.isRequired
}

export default ActionBar