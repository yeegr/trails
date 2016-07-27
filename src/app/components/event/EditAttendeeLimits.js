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
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newEventActions from '../../containers/actions/newEventActions'

import styles from '../../styles/main'

class EditAttendeeLimits extends Component {
  constructor(props) {
    super(props)

    this.state = {
      maxValue: this.props.maxValue.toString(),
      minValue: this.props.minValue.toString()
    }
  }

  componentWillUnmount() {
    const minValue = parseInt(this.state.minValue),
      maxValue = parseInt(this.state.maxValue)

    if (minValue <= maxValue) {
      this.props.newEventActions.setAttendeeLimits(minValue, maxValue)
    }
  }

  render() {
    return (
      <View style={styles.detail.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <View style={[styles.editor.link, {height: 44}]}>
              <View style={styles.editor.label}>
                <Text>{Lang.MinimumAttendees}</Text>
              </View>
              <View style={styles.editor.value}>
                <TextInput
                  autoFocus={true}
                  autoCorrect={false}
                  keyboardType='numeric'
                  maxLength={3}
                  style={styles.editor.numberInput}
                  onChangeText={(value) => this.setState({minValue: value})}
                  value={this.state.minValue}
                />
                <Text>{Lang.Persons}</Text>
              </View>
            </View>
            <View style={[styles.editor.link, {height: 44}]}>
              <View style={styles.editor.label}>
                <Text>{Lang.MaximumAttendees}</Text>
              </View>
              <View style={styles.editor.value}>
                <TextInput
                  autoCorrect={false}
                  keyboardType='numeric'
                  maxLength={3}
                  style={styles.editor.numberInput}
                  onChangeText={(value) => this.setState({maxValue: value})}
                  value={this.state.maxValue}
                />
                <Text>{Lang.Persons}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditAttendeeLimits.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    maxValue: state.newEvent.maxAttendee,
    minValue: state.newEvent.minAttendee
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAttendeeLimits)