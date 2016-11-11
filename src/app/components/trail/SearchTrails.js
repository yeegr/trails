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
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

class SearchTrails extends Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
    this.typePressed = this.typePressed.bind(this)

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
      difficultyRange = this.refs.difficultyRange.getRange(),
      distanceRange = this.refs.distanceRange.getRange(),
      minDifficultyLevel = '&minDifficulty=' + difficultyRange[0].toString(),
      maxDifficultyLevel = '&maxDifficulty=' + difficultyRange[1].toString(),
      minDistance = '&minDistance=' + distanceRange[0].toString(),
      maxDistance = '&maxDistance=' + distanceRange[1].toString(),
      //ratingRange = this.refs.ratingRange.getRange(),
      //minRating = '&minRating=' + ratingRange[0].toString(),
      //maxRating = '&maxRating=' + ratingRange[1].toString(),
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
          <View style={[styles.search.section, styles.search.expand]}>
            <TextView
              text={Lang.TrailTypes}
            />
            <View style={styles.search.grid}>
            {
              AppSettings.trailTypes.map((i) => {
                const color = (this.state.types.indexOf(i) > -1) ? Graphics.colors.primary : Graphics.colors.midGray

                return (
                  <TouchableOpacity key={i} onPress={() => this.typePressed(i)}>
                    <View style={{marginBottom: 15, marginRight: 10}}>
                      <Icon
                        backgroundColor={color}
                        stack={'vertical'} 
                        valueColor={color}
                        type={i.toString()} 
                        value={Lang.tagArray[i]}
                      />
                    </View>
                  </TouchableOpacity>
                )
              })
            }
            </View>
          </View>
          <View style={styles.search.section}>
            <TextView
              text={Lang.DifficultyLevel}
            />
            <View style={styles.search.row}>
              <RangeSlider
                ref="difficultyRange"
                minimumValue={1}
                maximumValue={5}
                minimumRange={1}
                lowerValue={this.state.difficultyLevelLower}
                upperValue={this.state.difficultyLevelUpper}
              />
            </View>
          </View>
          <View style={styles.search.section}>
            <TextView
              text={Lang.TotalDistance}
            />
            <View style={styles.search.row}>
              <RangeSlider
                ref="distanceRange"
                minimumValue={1}
                maximumValue={150}
                minimumRange={5}
                lowerValue={this.state.totalDistanceLower}
                upperValue={this.state.totalDistanceUpper}
              />
            </View>
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

SearchTrails.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default SearchTrails