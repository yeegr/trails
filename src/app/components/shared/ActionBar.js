'use strict'

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

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {AppSettings} from '../../settings'

import Toolbar from '../shared/Toolbar'

const ActionBar = (props) => {
  return (
    <View style={styles.actionBar}>
      <Toolbar type={props.type} data={props.data} showLabel={props.showLabel} />
      <TouchableOpacity style={styles.actionButton} onPress={props.buttonEvent}>
        <Text style={styles.actionText}>{props.buttonText}</Text>
      </TouchableOpacity>
    </View>
  )
},
styles = StyleSheet.create({
  actionBar: {
    backgroundColor: '#fff',
    flex: 0,
    flexDirection: 'row',
    height: 60,
    overflow: 'hidden',
  },
  actionButton: {
    backgroundColor: AppSettings.color.primary,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actionText: {
    color: AppSettings.color.textOverlay,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 60,
  }
})

ActionBar.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  showLabel: PropTypes.bool.isRequired
}

export default ActionBar