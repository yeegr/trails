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
  TextInput,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newEventActions from '../../containers/actions/newEventActions'

import styles from '../../styles/main'

class EditEventDestination extends Component {
  constructor(props) {
    super(props)

    this.state = {
      destination: this.props.destination
    }
  }

  componentWillUnmount() {
    let destination = this.state.destination.trim()
    this.props.newEventActions.setEventDestination(destination)
  }

  render() {
    return (
      <View style={styles.detail.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <TextInput
              autoFocus={true}
              autoCorrect={false}
              multiline={true}
              style={[styles.editor.textInput, {height: 240}]}
              placeholder={Lang.Destination}
              onChangeText={(destination) => this.setState({destination})}
              value={this.state.destination}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditEventDestination.propTypes = {
  destination: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    destination: state.newEvent.destination
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventDestination)