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

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import styles from '../../styles/main'

class EditTrailDescription extends Component {
  constructor(props) {
    super(props)

    this.state = {
      description: this.props.description
    }
  }

  componentWillUnmount() {
    let description = this.state.description.trim()
    this.props.newTrailActions.setTrailDescription(description)
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
              placeholder={Lang.Description}
              onChangeText={(description) => this.setState({description})}
              value={this.state.description}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditTrailDescription.propTypes = {
  description: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    description: state.newTrail.description
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTrailDescription)