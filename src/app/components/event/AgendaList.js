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
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newEventActions from '../../containers/actions/newEventActions'

import Loading from '../shared/Loading'
import Agenda from '../shared/Agenda'
import CallToAction from '../shared/CallToAction'
import styles from '../../styles/main'

class AgendaList extends Component {
  constructor(props) {
    super(props)
    this.addAgenda = this.addAgenda.bind(this)
    this.editAgenda = this.editAgenda.bind(this)

    this.state = {
      schedule: this.props.schedule
    }
  }

  addAgenda() {
    this.props.navigator.push({
      id: 'EditAgenda',
      title: Lang.Add + Lang.Agenda,
      passProps: {
        mode: 'new'
      }
    })
  }

  editAgenda(agenda) {
    this.props.newEventActions.editEventSchedule()

    this.props.navigator.push({
      id: 'EditAgenda',
      title: Lang.Edit + Lang.Agenda,
      passProps: {
        mode: 'edit',
        agenda
      }
    })
  }

  render() {
    let dayView = [],
      that = this

    return (
      <View style={styles.detail.wrapper}>
        <ScrollView style={styles.editor.scroll}>
        {
          this.state.schedule.map((day, index) => {
            return (
              <DayList key={index} day={day} index={index} itemPressed={this.editAgenda} />
            )
          })
        }
        </ScrollView>
        <CallToAction onPress={this.addAgenda} label={Lang.Add + Lang.Agenda} backgroundColor={AppSettings.color.primary} />
      </View>
    )
  }
}

const DayList = (props) => {
  const day = props.day,
    index = props.index

  if (day.length < 1) {
    return null
  }

  return (
    <View style={styles.detail.list}>
      <Text style={styles.global.pretitle}>{Lang.DayCountPrefix + Lang.dayArray[index] + Lang.DayCountPostfix}</Text>
      <View>
      {
        day.map(function(agenda, i) {
          return (
            <Agenda day={i} key={i} agenda={agenda} onPress={() => props.itemPressed(agenda)} />
          )
        })
      }
      </View>
    </View>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    isEditing: state.newEvent.isEditing,
    schedule: state.newEvent.schedule
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList)

