'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import CallToAction from '../shared/CallToAction'
import Icon from '../shared/Icon'
import RangeSlider from '../shared/RangeSlider'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  CONSTANTS,
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

class SearchPosts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      keywords: '',
    }
  }

  render() {
    return (
      <View style={styles.search.wrapper}>
        <View style={styles.search.scroll}>
          <View style={styles.search.section}>
            <TextView
              text={Lang.Keywords}
            />
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
        <CallToAction
          backgroundColor={Graphics.colors.primary} 
          label={Lang.Search}
          onPress={this.search}
        />
      </View>
    )
  }
}

SearchPosts.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default SearchPosts