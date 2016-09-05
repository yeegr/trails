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
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import Loading from '../shared/Loading'
import Agenda from '../shared/Agenda'
import TextView from '../shared/TextView'
import DayList from '../shared/DayList'
import CallToAction from '../shared/CallToAction'
import {isNumeric} from '../../../util/common'
import styles from '../../styles/main'

class AgendaList extends Component {
  constructor(props) {
    super(props)
    this.addToDays = this.addToDays.bind(this)
    this.reduceDays = this.reduceDays.bind(this)
    this.setDays = this.setDays.bind(this)
    this.addAgenda = this.addAgenda.bind(this)
    this.editAgenda = this.editAgenda.bind(this)

    this.state = {
      schedule: this.props.newEvent.schedule
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      schedule: nextProps.newEvent.schedule
    })
  }

  addToDays() {
    if (this.state.schedule.length < AppSettings.maxEventScheduleDays) {
      this.props.newEventActions.setEventScheduleDays(this.state.schedule.length + 1)
    }
  }

  reduceDays() {
    if (this.state.schedule.length > 1) {
      this.props.newEventActions.setEventScheduleDays(this.state.schedule.length - 1)
    }
  }

  setDays(str) {
    let days = isNumeric(parseInt(str)) ? parseInt(str) : 1
    this.props.newEventActions.setEventScheduleDays(days)
  }

  addAgenda() {
    this.props.navigator.push({
      id: 'EditAgenda',
      title: Lang.Add + Lang.Agenda,
      passProps: {
        mode: 'new',
        days: this.state.days
      }
    })
  }

  editAgenda(day, index, agenda) {
    this.props.newEventActions.editEventSchedule()

    this.props.navigator.push({
      id: 'EditAgenda',
      title: Lang.Edit + Lang.Agenda,
      passProps: {
        mode: 'edit',
        days: this.state.days,
        day,
        index,
        agenda
      }
    })
  }
/*
                <TextInput
                  autoFocus={true}
                  autoCorrect={false}
                  keyboardType='numeric'
                  min={this.state.minDays}
                  max={this.state.maxDays}
                  style={{paddingVertical: 2, textAlign: 'center', width: 30}}
                  value={this.props.schedule.length.toString()}
                  onChangeText={(days) => this.setDays(days)}
                />
*/

  render() {
    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <View style={styles.editor.link}>
              <View style={styles.editor.label}>
                <TextView text={Lang.NumberOfDays} />
              </View>
              <View style={[styles.editor.value, {alignItems: 'center'}]}>
                <TouchableOpacity onPress={this.reduceDays}>
                  <View style={[styles.editor.numberButton, styles.editor.numberButtonLeft]}>
                    <Text style={styles.editor.numberButtonText}>-</Text>
                  </View>
                </TouchableOpacity>
                <TextView
                  style={{width: 30, textAlign: 'center'}}
                  text={this.state.schedule.length.toString()}
                />
                <TouchableOpacity onPress={this.addToDays}>
                  <View style={[styles.editor.numberButton, styles.editor.numberButtonRight]}>
                    <Text style={styles.editor.numberButtonText}>+</Text>
                  </View>
                </TouchableOpacity>
                <TextView
                  style={{marginHorizontal: 5}}
                  text={Lang.Days}
                />
              </View>
            </View>
          </View>          
          <View style={[styles.editor.group, {paddingTop: 10}]}>
            <View style={styles.detail.list}>
              <DayList schedule={this.state.schedule} itemPressed={this.editAgenda} />
            </View>
          </View>
        </ScrollView>
        <CallToAction onPress={this.addAgenda} label={Lang.Add + Lang.Agenda} backgroundColor={Graphics.colors.primary} />
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    newEvent: state.newEvent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList)

