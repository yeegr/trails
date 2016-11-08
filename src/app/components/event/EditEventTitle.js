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

import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  AppSettings,
  Lang,
} from '../../settings'

class EditEventTitle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title
    }
  }

  componentWillUnmount() {
    let title = this.state.title.trim()

    if (title.length >= AppSettings.minEventTitleLength) {
      this.props.newEventActions.setEventTitle(title)
    }
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
          <View style={{paddingHorizontal: 15}}>
            <TextView
              class={'h5'}
              text={Lang.MinEventTitleLength}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditEventTitle.propTypes = {
  title: PropTypes.string.isRequired,
  newEventActions: PropTypes.string.isRequired
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