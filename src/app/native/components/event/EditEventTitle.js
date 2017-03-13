'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import StringInput from '../shared/StringInput'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings
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
        <View style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <StringInput
              autoFocus={true}
              autoCorrect={false}
              placeholder={LANG.t('event.EventTitle')}
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
            />
          </View>
          <View style={{paddingHorizontal: 15}}>
            <TextView
              class={'h5'}
              text={LANG.t('event.edit.MinEventTitleLength', {min: AppSettings.minEventTitleLength})}
            />
          </View>
        </View>
      </View>
    )
  }
}

EditEventTitle.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
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