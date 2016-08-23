'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import NMSlider from 'react-native-nmrangeslider-ios'

import {Graphics} from '../../settings'

import TextView from './TextView'

class RangeSlider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lowerValue: this.props.lowerValue,
      upperValue: this.props.upperValue
    }
  }

  getRange() {
    return [
      this.state.lowerValue,
      this.state.upperValue
    ]
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TextView
          style={{textAlign: 'center', width: 30}}
          text={this.state.lowerValue.toString()}
        />
        <NMSlider
          minimumValue={this.props.minimumValue}
          maximumValue={this.props.maximumValue}
          minimumRange={this.props.minimumRange}
          lowerValue={this.state.lowerValue}
          upperValue={this.state.upperValue}
          trackColor={Graphics.colors.primary}
          onChange={(range) => this.setState({
            lowerValue: range[0],
            upperValue: range[1]
          })}
          style={styles.slider}
        />
        <TextView
          style={{textAlign: 'center', width: 30}}
          text={this.state.upperValue.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  slider: {
    height: 50,
    width: 270
  },
  value: {
    width: 30
  }
})

RangeSlider.propTypes = {
  minimumValue: PropTypes.number.isRequired,
  maximumValue: PropTypes.number.isRequired,
  minimumRange: PropTypes.number,
  lowerValue: PropTypes.number,
  upperValue: PropTypes.number
}

export default RangeSlider