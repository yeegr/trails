'use strict'

import {
  AppSettings,
  Lang
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  Text,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../containers/actions/newEventActions'

import EditLink from '../shared/EditLink'
import ActionPicker from '../shared/ActionPicker'
import TypePicker from '../shared/TypePicker'
import DateTimePicker from '../shared/DateTimePicker'
import DurationPicker from '../shared/DurationPicker'
import SearchPoi from '../shared/SearchPoi'
import Icon from '../shared/Icon'
import CallToAction from '../shared/CallToAction'
import {formatMinutes,formatDuration} from '../../../util/common'
import styles from '../../styles/main'

class EditAgenda extends Component {
  constructor(props) {
    super(props)
    this.back = this.back.bind(this)
    this.cancel = this.cancel.bind(this)
    this.showDayPicker = this.showDayPicker.bind(this)
    this.showTypePicker = this.showTypePicker.bind(this)

    this.setKey = this.setKey.bind(this)
    this.setType = this.setType.bind(this)
    this.saveAgenda = this.saveAgenda.bind(this)
    this.deleteAgenda = this.deleteAgenda.bind(this)

    let now = new Date(),
    nowMinutes = now.getHours() * 60 + now.getMinutes(), 
    agenda = this.props.agenda || {
      type: null,
      startTime: nowMinutes,
      startPoi: {},
      endTime: nowMinutes,
      endPoi: {},
      duration: 120,
      trail: null,
      difficultyLevel: null
    }

    this.state = {
      day: this.props.day || 0,
      index: this.props.index, 
      agenda,
      showDayPicker: false,
      showTypePicker: false,
      showStartTimePicker: false,
      showStartPoiPicker: false,
      showEndTimePicker: false,
      showDurationPicker: false,
      showEndPoiPicker: false
    }
  }

  showDayPicker() {
    this.setState({
      showDayPicker: true
    })
  }

  setKey(key, value) {
    let agenda = this.state.agenda
    agenda[key] = value
    this.setState({agenda})
  }

  showTypePicker() {
    this.setState({
      showTypePicker: true
    })
  }

  setType(value) {
    let agenda = this.state.agenda
    agenda.type = value

    this.setState({
      agenda,
      showTypePicker: false
    })
  }

  saveAgenda() {
    let agenda = this.state.agenda, 
      errors = []

    if (agenda.type === null) {
      errors.push('type error')
    }

    if (agenda.startPoi === null) {
      errors.push('need start poi')
    }

    if ((agenda.type > 89 && agenda.type < 100)) {
      if (agenda.endTime === null) {
        errors.push('need end time')
      }

      if (agenda.endPoi === null) {
        errors.push('need end poi')
      }
    } else {
      if (agenda.duration === null) {
        errors.push('need agenda duration')
      }
    }

    if (errors.length === 0) {
      this.props.newEventActions.setEventSchedule(this.state.day, this.state.index, agenda)
      this.back()    
    }
  }

  deleteAgenda() {
    this.props.newEventActions.deleteEventAgenda(this.state.agenda)
    this.back()    
  }

  back() {
    this.props.navigator.replacePreviousAndPop({
      id: 'AgendaList',
      title: Lang.DetailSchedule
    })
  }

  cancel() {
    this.props.navigator.pop(0)
  }

  render() {
    let dayLabels = [],
      endView = null,
      agenda = this.state.agenda

    for (let i = 0; i < this.props.days; i++) {
      dayLabels.push(Lang.DayCountPrefix + Lang.dayArray[i] + Lang.DayCountPostfix)
    }

    if (agenda.type > 79 && agenda.type < 100) {
      endView = (
        <View style={styles.editor.group}>
          <EditLink
            label={Lang.EndTime}  
            onPress={() => this.setState({showEndTimePicker: true})} 
            value={formatMinutes(agenda.endTime)} 
          />
          <EditLink
            label={Lang.EndLocation}
            onPress={() => this.setState({showEndPoiPicker: true})}
            value={agenda.endPoi.name}
          />
        </View>
      )
    } else if (agenda.type !== null) {
      endView = (
        <View style={styles.editor.group}>
          <EditLink
            label={Lang.ApproxDuration} 
            onPress={() => this.setState({showDurationPicker: true})}
            value={formatDuration(agenda.duration * 60)}
          />
        </View>
      )
    }

    let cancelButton = (
      <CallToAction 
        label={Lang.DELETE}
        backgroundColor={Graphics.color.warning} 
        onPress={this.deleteAgenda}
      />
    )

    if (this.props.mode === 'new') {
      cancelButton = (
        <CallToAction 
          label={Lang.Cancel}
          backgroundColor={Graphics.color.warning} 
          onPress={this.cancel}
        />
      )
    }

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <EditLink 
              label={Lang.AgendaDay} 
              onPress={() => this.showDayPicker()}
              value={Lang.DayCountPrefix + Lang.dayArray[this.state.day] + Lang.DayCountPostfix}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={Lang.AgendaType} 
              onPress={() => this.showTypePicker()}
              value={Lang.tagArray[agenda.type]} 
            />
            <EditLink 
              label={Lang.StartTime} 
              onPress={() => this.setState({showStartTimePicker: true})}
              value={formatMinutes(agenda.startTime)}
            />
            <EditLink 
              label={Lang.StartLocation}
              onPress={() => this.setState({showStartPoiPicker: true})} 
              value={agenda.startPoi.name}
            />
          </View>
          {endView}
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            {cancelButton}
          </View>
          <View style={{flex: 3}}>
            <CallToAction 
              label={Lang.Save}
              backgroundColor={Graphics.colors.primary} 
              onPress={this.saveAgenda}
            />
          </View>
        </View>
        <ActionPicker 
          title={Lang.SelectDay}
          showPicker={this.state.showDayPicker}
          cancelText={Lang.Cancel} 
          confirmText={Lang.Confirm}
          onConfirm={(value) => this.setKey('day', value)}
          onCancel={() => this.setState({showDayPicker: false})}
          selectedValue={this.state.day}
          labels={dayLabels}
        />
        <TypePicker 
          visible={this.state.showTypePicker} 
          selectedIndex={this.state.agenda.type} 
          onPress={(value) => this.setType(value)}
        />
        <DateTimePicker
          mode="time"
          showPicker={this.state.showStartTimePicker}
          title={Lang.StartTime}
          cancelText={Lang.Cancel} 
          confirmText={Lang.Confirm}
          onConfirm={(value) => this.setKey('startTime', value)}
          onCancel={() => this.setState({showStartTimePicker: false})}
          datetime={agenda.startTime}
        />
        <SearchPoi 
          showPicker={this.state.showStartPoiPicker} 
          value={this.state.startPoi} 
          onConfirm={(value) => this.setKey('startPoi', value)}
          onCancel={() => this.setState({showStartPoiPicker: false})}
        />
        <DateTimePicker
          mode="time"
          showPicker={this.state.showEndTimePicker}
          title={Lang.EndTime}
          cancelText={Lang.Cancel} 
          confirmText={Lang.Confirm}
          onConfirm={(value) => this.setKey('endTime', value)}
          onCancel={() => this.setState({showEndTimePicker: false})}
          datetime={agenda.endTime}
        />
        <SearchPoi
          showPicker={this.state.showEndPoiPicker}
          value={this.state.endPoi}
          onConfirm={(value) => this.setKey('endPoi', value)}
          onCancel={() => this.setState({showEndPoiPicker: false})}
        />
        <DurationPicker
          showPicker={this.state.showDurationPicker}
          title={Lang.Duration}
          cancelText={Lang.Cancel} 
          confirmText={Lang.Confirm}
          onConfirm={(value) => this.setKey('duration', value)}
          onCancel={() => this.setState({showDurationPicker: false})}
          interval={15}
          duration={agenda.duration}
        />
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    schedule: state.newEvent.schedule
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAgenda)

