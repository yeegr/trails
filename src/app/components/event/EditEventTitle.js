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
import * as newEventActions from '../../redux/actions/newEventActions'

import styles from '../../styles/main'

class EditEventTitle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title
    }
  }

  componentWillUnmount() {
    let title = this.state.title.trim()
    this.props.newEventActions.setEventTitle(title)
  }

  render() {
    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <TextInput
              autoFocus={true}
              autoCorrect={false}
              maxLength={50}
              style={styles.editor.textInput}
              placeholder={Lang.EventTitle}
              onChangeText={(value) => this.setState({title: value})}
              value={this.state.title}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditEventTitle.propTypes = {
  title: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    title: state.newEvent.title
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventTitle)