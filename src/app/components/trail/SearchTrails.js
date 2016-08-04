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

import RangeSlider from 'react-native-nmrangeslider-ios'

import Icon from '../shared/Icon'
import CallToAction from '../shared/CallToAction'
import styles from '../../styles/main'

export default class SearchTrails extends Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
    this.typePressed = this.typePressed.bind(this)
    this.onDifficultyChange = this.onDifficultyChange.bind(this)
    this.onDistanceChange = this.onDistanceChange.bind(this)

    this.state = {
      keywords: '',
      types: [],
      difficultyLevelLower: 1,
      difficultyLevelUpper: 3,
      totalDistanceLower: 5,
      totalDistanceUpper: 40,
      averageRatingLower: 3,
      averageRatingUpper: 5
    }
  }

  search() {
    let keywords = 'keywords=' + this.state.keywords,
      types = '&types=' + this.state.types,
      minDifficultyLevel = '&minDifficulty=' + this.state.difficultyLevelLower.toString(),
      maxDifficultyLevel = '&maxDifficulty=' + this.state.difficultyLevelUpper.toString(),
      minDistance = '&minDistance=' + this.state.totalDistanceLower.toString(),
      maxDistance = '&maxDistance=' + this.state.totalDistanceUpper.toString(),
      //minRating = '&minRating=' + this.state.averageRatingLower.toString(),
      //maxRating = '&maxRating=' + this.state.averageRatingUpper.toString(),
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

  onDifficultyChange(range) {
    this.setState({
      difficultyLevelLower: range[0],
      difficultyLevelUpper: range[1],
    })
  }

  onDistanceChange(range) {
    this.setState({
      totalDistanceLower: range[0],
      totalDistanceUpper: range[1],
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
                  <TouchableOpacity key={i} style={{height: 75}} onPress={() => this.typePressed(i)}>
                    <View style={{marginRight: 12}}>
                      <Icon
                        backgroundColor={(this.state.types.indexOf(i) > -1) ? Graphics.colors.primary : AppSettings.color.midGray} 
                        type={i.toString()} 
                        label={Lang.tagArray[i]}
                      />
                    </View>
                  </TouchableOpacity>
                )
              })
            }
            </View>
          </View>
          <View style={styles.search.section}>
            <Text style={styles.search.label}>{Lang.DifficultyLevel}</Text>
            <View style={styles.search.row}>
              <Text style={styles.search.value}>{this.state.difficultyLevelLower.toString()}</Text>
              <View>
                <RangeSlider
                  minimumValue={1}
                  maximumValue={5}
                  minimumRange={1}
                  lowerValue={this.state.difficultyLevelLower}
                  upperValue={this.state.difficultyLevelUpper}
                  trackColor={Graphics.colors.primary}
                  onChange={this.onDifficultyChange}
                  style={styles.search.slider}
                />
              </View>
              <Text style={styles.search.value}>{this.state.difficultyLevelUpper.toString()}</Text>
            </View>
          </View>
          <View style={styles.search.section}>
            <Text style={styles.search.label}>{Lang.TotalDistance}</Text>
            <View style={styles.search.row}>
              <Text style={styles.search.value}>{this.state.totalDistanceLower.toString()}</Text>
              <View>
                <RangeSlider
                  minimumValue={1}
                  maximumValue={150}
                  minimumRange={3}
                  lowerValue={this.state.totalDistanceLower}
                  upperValue={this.state.totalDistanceUpper}
                  trackColor={Graphics.colors.primary}
                  onChange={this.onDistanceChange}
                  style={styles.search.slider}
                />
              </View>
              <Text style={styles.search.value}>{this.state.totalDistanceUpper.toString()}</Text>
            </View>
          </View>
        </View>
        <CallToAction onPress={this.search} label={Lang.Search} backgroundColor={Graphics.colors.primary} />
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
