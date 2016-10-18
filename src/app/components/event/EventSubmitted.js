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
  Switch,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import TextView from '../shared/TextView'

import styles from '../../styles/main'

class EventSubmitted extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.global.main}>
        <View style={{padding: 15}}>
          <TextView
            style={{textAlign: 'center'}}
            text={Lang.EventSubmittedDetail}
          />
          <TouchableOpacity onPress={() => this.props.navigator.push({
            id: 'EventManager',
            title: Lang.ManageEvents
          })}>
            <TextView
              style={{textAlign: 'center'}}
              text={Lang.JumpToEventManager}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    newEvent: state.newEvent,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSubmitted)