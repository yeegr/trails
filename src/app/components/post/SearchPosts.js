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
  View,
  Text,
  TextInput,
  Slider,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import {HOME_TABS} from '../../../constants'
import Tag from '../shared/Tag'
import styles from '../../styles/main'

export default class SearchPosts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      keywords: '',
    }
  }

  render() {
    return (
      <View style={styles.search.wrapper}>
        <View style={styles.search.section}>
          <Text style={styles.search.label}
          >
            {Lang.Keywords}
          </Text>
          <TextInput
            autoCorrect={false}
            autoFocus={true}
            maxLength={50}
            placeholder={Lang.sampleAreasKeywords}
            style={styles.search.textInput}
            onChangeText={(keywords) => this.setState({keywords})}
          />
        </View>

      </View>
    )
  }
}