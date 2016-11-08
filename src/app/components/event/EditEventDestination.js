'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  TextInput,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import styles from '../../styles/main'

import {
  Lang
} from '../../settings'

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
      <View style={styles.global.wrapper}>
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
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
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