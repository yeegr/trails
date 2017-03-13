'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Slider,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

//import RangeSlider from 'react-native-nmrangeslider-ios'

import Icon from '../shared/Icon'
import CallToAction from '../shared/CallToAction'
import styles from '../../styles/main'

export default class SearchEvents extends Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this)

    this.state = {
      keywords: ''
    }
  }

  search() {
    let keywords = 'keywords=' + this.state.keywords,
      query = '?' + keywords

    this.props.navigator.push({
      id: 'EventList',
      title: Lang.SearchResults,
      passProps: {
        query: query
      }
    })
  }

  render() {
    return (
      <View style={styles.search.wrapper}>
        <View style={styles.search.scroll}>
          <View style={styles.search.section}>
            <Text style={styles.search.label}>{Lang.Keywords}</Text>
            <TextInput
              autoCorrect={false}
              autoFocus={true}
              maxLength={50}
              placeholder={Lang.SampleAreasKeywords}
              style={styles.search.textInput}
              onChangeText={(keywords) => this.setState({keywords})}
            />
          </View>
        </View>
        <CallToAction onPress={this.search} label={Lang.Search} backgroundColor={Graphics.colors.primary} />
      </View>
    )
  }
}