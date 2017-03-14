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
import * as newTrailActions from '../../../redux/actions/newTrailActions'

import styles from '../../styles/main'

import {
  LANG
} from '../../../../common/__'

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
              placeholder={LANG.t('trail.TrailDescription')}
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
  navigator: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
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