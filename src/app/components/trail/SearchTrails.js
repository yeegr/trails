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

export default class SearchTrails extends Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
    this.typePressed = this.typePressed.bind(this)

    this.state = {
      keywords: '',
      types: [],
      difficultyLevel: 1,
      totalDistance: 10,
      averageRating: 3
    }
  }

  search() {
    let keywords = 'keywords=' + this.state.keywords,
      types = '&types=' + this.state.types,
      minDifficultyLevel = '&minDifficulty=' + (this.state.difficultyLevel - 1).toString(),
      maxDifficultyLevel = '&maxDifficulty=' + (this.state.difficultyLevel + 1).toString(),
      minDistance = '&minDistance=' + (this.state.totalDistance - 5).toString(),
      maxDistance = '&maxDistance=' + (this.state.totalDistance + 5).toString(),
      //minRating = '&minRating=' + (this.state.averageRating - 1).toString(),
      //maxRating = '&maxRating=' + (this.state.averageRating + 1).toString(),
      query = '?' + keywords + types + minDifficultyLevel + maxDifficultyLevel + minDistance + maxDistance// + minRating + maxRating

    this.props.navigator.push({
      id: 'TrailList',
      title: Lang.SearchResults,
      passProps: {
        query: query
      }
    })
  }

  typePressed(value) {
    let types = this.state.types

    if (types.indexOf(value) < 0) {
      types.push(value)
    } else {
      types.splice(types.indexOf(value), 1)
    }

    this.setState({
      types
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
              placeholder={Lang.sampleAreasKeywords}
              style={styles.search.textInput}
              onChangeText={(keywords) => this.setState({keywords})}
            />
          </View>
          <View style={[styles.search.section, styles.search.expand]}>
            <Text style={styles.search.label}>{Lang.TrailTypes}</Text>
            <View style={styles.search.grid}>
            {
              AppSettings.trailTypes.map((i) => {
                return (
                  <TouchableOpacity key={i} style={{marginRight: 12}} onPress={() => this.typePressed(i)}>
                    <Icon
                      backgroundColor={(this.state.types.indexOf(i) > -1) ? AppSettings.color.primary : AppSettings.color.midGray} 
                      type={i.toString()} 
                      label={Lang.tagArray[i]}
                    />
                  </TouchableOpacity>
                )
              })
            }
            </View>
          </View>
          <View style={styles.search.section}>
            <Text style={styles.search.label}>{Lang.DifficultyLevel}</Text>
            <View style={styles.search.row}>
              <Text style={styles.search.value}>{this.state.difficultyLevel.toString()}</Text>
              <Slider
                style={styles.search.slider}
                maximumValue={5}
                minimumValue={1}
                step={1}
                value={this.state.difficultyLevel}
                onValueChange={(value) => this.setState({difficultyLevel: value})}
              />
              <Text></Text>
            </View>
          </View>
          <View style={styles.search.section}>
            <Text style={styles.search.label}>{Lang.TotalDistance}</Text>
            <View style={styles.search.row}>
              <Text style={styles.search.value}>{this.state.totalDistance.toString()}</Text>
              <Slider
                style={styles.search.slider}
                maximumValue={100}
                minimumValue={0}
                step={1}
                value={this.state.totalDistance}
                onValueChange={(value) => this.setState({totalDistance: value})}
              />
            </View>
          </View>
        </View>
        <CallToAction onPress={this.search} label={Lang.Search} backgroundColor={AppSettings.color.primary} />
      </View>
    )
  }
}
          /*
          <View style={styles.search.section}>
            <Text style={styles.search.label}>{Lang.AverageRating}</Text>
            <View style={styles.search.row}>
              <Text style={styles.search.value}>{this.state.averageRating.toString()}</Text>
              <Slider
                style={styles.search.slider}
                maximumValue={5}
                minimumValue={1}
                step={1}
                value={this.state.averageRating}
                onValueChange={(value) => this.setState({averageRating: value})}
              />
            </View>
          </View>
          */
