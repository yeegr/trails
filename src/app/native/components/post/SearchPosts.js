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
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  CONSTANTS,
  AppSettings,
  Lang,
  Graphics
} from '../../../../common/__'

class SearchPosts extends Component {
  constructor(props) {
    super(props)

    this._search = this._search.bind(this)

    this.state = {
      keywords: '',
    }
  }

  _search() {

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
          onPress={this._search}
        />
      </View>
    )
  }
}

SearchPosts.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default SearchPosts