'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  TabBarIOS,
  Text,
  View,
  StyleSheet
} from 'react-native'

import styles from '../styles/main'

class Test extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('render testing')
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{height: 300, backgroundColor:'green'}} />
          <View style={{height: 300, backgroundColor:'yellow'}} />
          <View style={{height: 300, backgroundColor:'blue'}} />
          <View style={{height: 300, backgroundColor:'red'}} />
        </ScrollView>
      </View>
    )
  }
}

export default Test