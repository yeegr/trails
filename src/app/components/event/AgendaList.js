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
import * as newEventActions from '../../containers/actions/newEventActions'

import Loading from '../shared/Loading'
import Agenda from '../shared/Agenda'
import DayList from '../shared/DayList'
import CallToAction from '../shared/CallToAction'
import {isNumeric} from '../../../common'
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
      minDays: 1,
      maxDays: 20,
      days: 1,
      schedule: this.props.schedule
    }
  }

  componentDidUpdate() {
    this.props.newEventActions.setEventScheduleDays(this.state.days)
  }

  addToDays() {
    if (this.state.days < this.state.maxDays) {
      this.setState({
        days: this.state.days + 1 
      })
    }
  }

  reduceDays() {
    if (this.state.days > this.state.minDays) {
      this.setState({
        days: this.state.days - 1 
      })
    }
  }

  setDays(str) {
    let days = isNumeric(parseInt(str)) ? parseInt(str) : 1
    this.setState({days})
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

  render() {
    let dayView = []

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <View style={styles.editor.link}>
              <View style={styles.editor.label}>
                <Text>{Lang.NumberOfDays}</Text>
              </View>
              <View style={[styles.editor.value, {alignItems: 'flex-end'}]}>
                <TouchableOpacity onPress={this.reduceDays}>
                  <View style={[styles.editor.numberButton, styles.editor.numberButtonLeft]}>
                    <Text style={styles.editor.numberButtonText}>-</Text>
                  </View>
                </TouchableOpacity>
                <TextInput
                  autoFocus={true}
                  autoCorrect={false}
                  keyboardType='numeric'
                  min={this.state.minDays}
                  max={this.state.maxDays}
                  style={{paddingVertical: 2, textAlign: 'center', width: 30}}
                  value={this.state.days.toString()}
                  onChangeText={(days) => this.setDays(days)}
                />
                <TouchableOpacity onPress={this.addToDays}>
                  <View style={[styles.editor.numberButton, styles.editor.numberButtonRight]}>
                    <Text style={styles.editor.numberButtonText}>+</Text>
                  </View>
                </TouchableOpacity>
                <Text style={{marginLeft: 5, marginRight: 10, paddingBottom: 3}}>{Lang.Days}</Text>
              </View>
            </View>
          </View>          
          <View style={styles.editor.group}>
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
/*
const DayList = (props) => {
  const day = props.day,
    dayIndex = props.index

  if (day.length < 1) {
    return null
  }

  return (
    <View style={styles.detail.list}>
      <Text>{Lang.DayCountPrefix + Lang.dayArray[dayIndex] + Lang.DayCountPostfix}</Text>
      <View>
      {
        day.map(function(agenda, i) {
          return (
            <Agenda key={i} agenda={agenda} onPress={() => props.itemPressed(dayIndex, i, agenda)} />
          )
        })
      }
      </View>
    </View>
  )
}
*/
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

