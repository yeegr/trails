'use strict'

import {
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'
import * as navbarActions from '../../redux/actions/navbarActions'

import EditLink from '../shared/EditLink'
import ActionPicker from '../shared/ActionPicker'
import TypePicker from '../shared/TypePicker'
import DateTimePicker from '../shared/DateTimePicker'
import DurationPicker from '../shared/DurationPicker'
import SearchPoi from '../shared/SearchPoi'
import TrailPicker from './TrailPicker'
import Icon from '../shared/Icon'
import CallToAction from '../shared/CallToAction'
import {formatMinutes, formatDuration} from '../../../util/common'
import styles from '../../styles/main'

class EditAgenda extends Component {
  constructor(props) {
    super(props)
    this.back = this.back.bind(this)
    this.cancel = this.cancel.bind(this)

    this.setKey = this.setKey.bind(this)
    this.saveAgenda = this.saveAgenda.bind(this)
    this.deleteAgenda = this.deleteAgenda.bind(this)

    let agenda = this.props.agenda || {
      id: null,
      type: null,
      startTime: null,
      startPoi: {},
      endTime: null,
      endPoi: {},
      duration: 120,
      trail: null
    }

    this.state = {
      agenda,
      day: this.props.day || 0,
      index: this.props.index,
      showDayPicker: false,
      showTypePicker: false,
      showStartTimePicker: false,
      showStartPoiPicker: false,
      showEndTimePicker: false,
      showDurationPicker: false,
      showEndPoiPicker: false,
      showTrailPicker: false
    }
  }

  setKey(key, value) {
    let agenda = this.state.agenda
    agenda[key] = value

    this.setState({
      agenda,
      showDayPicker: false,
      showTypePicker: false,
      showTrailPicker: false
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
      this.props.newEventActions.setEventAgenda(this.state.day, this.state.index, agenda)
      this.back()    
    }
  }

  deleteAgenda() {
    this.props.newEventActions.deleteEventAgenda(this.state.day, this.state.index)
    this.back()    
  }

  back() {
    this.props.navbarActions.agendaSaved()
    this.props.navigator.replacePreviousAndPop({
      id: 'AgendaList',
      title: Lang.DetailSchedule
    })
  }

  cancel() {
    this.props.navigator.pop(0)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.savingEventAgenda) {
      this.saveAgenda()
    }
  }

  render() {
    let dayLabels = [],
      trailView = null,
      endView = null,
      agenda = this.state.agenda

    for (let i = 0; i < this.props.schedule.length; i++) {
      dayLabels.push(Lang.DayCountPrefix + Lang.dayArray[i] + Lang.DayCountPostfix)
    }

    if (agenda.type !== null && agenda.type > -1 && agenda.type < 90) {
      trailView = (
        <View style={styles.editor.group}>
          <EditLink 
            label={Lang.SelectTrail}
            onPress={() => this.setState({showTrailPicker: true})}
            value={(agenda.trail && agenda.trail.id) ? agenda.trail.title : ''}
          />
        </View>
      )
    }

    if (agenda.type > 79 && agenda.type < 100) {
      endView = (
        <View style={styles.editor.group}>
          <EditLink
            label={Lang.EndTime}  
            onPress={() => this.setState({showEndTimePicker: true})}
            value={(agenda.endTime) ? formatMinutes(agenda.endTime) : ''}
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

    let deleteButton = null

    if (this.props.mode !== 'new') {
      deleteButton = (
        <CallToAction 
          label={Lang.DELETE}
          backgroundColor={Graphics.colors.warning} 
          onPress={this.deleteAgenda}
        />
      )
    }

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <EditLink 
              label={Lang.AgendaDay} 
              required={true}
              validated={(this.state.day > -1)}
              onPress={() => this.setState({showDayPicker: true})}
              value={Lang.DayCountPrefix + Lang.dayArray[agenda.day || 0] + Lang.DayCountPostfix}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={Lang.AgendaType}
              required={true}
              validated={(agenda.type !== null)}
              onPress={() => this.setState({showTypePicker: true})}
              value={Lang.tagArray[agenda.type]} 
            />
            <EditLink 
              required={true}
              label={Lang.StartTime} 
              validated={(agenda.startTime !== null)}
              onPress={() => this.setState({showStartTimePicker: true})}
              value={(agenda.startTime) ? formatMinutes(agenda.startTime) : ''}
            />
            <EditLink 
              required={true}
              label={Lang.StartLocation}
              validated={(agenda.startPoi.name && agenda.startPoi.name.length > 0)}
              onPress={() => this.setState({showStartPoiPicker: true})} 
              value={agenda.startPoi.name}
            />
          </View>
          {trailView}
          {endView}
        </ScrollView>
        {deleteButton}
        <ActionPicker 
          title={Lang.SelectDay}
          showPicker={this.state.showDayPicker}
          cancelText={Lang.Cancel} 
          confirmText={Lang.Confirm}
          onConfirm={(value) => this.setState({'day': value})}
          onCancel={() => this.setState({showDayPicker: false})}
          selectedValue={this.state.day}
          labels={dayLabels}
        />
        <TypePicker 
          visible={this.state.showTypePicker} 
          selectedIndex={agenda.type} 
          onPress={(value) => this.setKey('type', value)}
          onCancel={() => this.setState({showTypePicker: false})}
        />
        <DateTimePicker
          cancelText={Lang.Cancel} 
          confirmText={Lang.Confirm}
          datetime={agenda.startTime}
          mode="time"
          showPicker={this.state.showStartTimePicker}
          title={Lang.StartTime}
          onConfirm={(value) => this.setKey('startTime', value)}
          onCancel={() => this.setState({showStartTimePicker: false})}
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
        <TrailPicker
          showPicker={this.state.showTrailPicker}
          onPress={(value) => this.setKey('trail', value)}
          onCancel={() => this.setState({showTrailPicker: false})}
          trail={(agenda.trail) ? agenda.trail : null}
        />
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    schedule: state.newEvent.schedule,
    savingEventAgenda: state.navbar.savingEventAgenda
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch),
    navbarActions: bindActionCreators(navbarActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAgenda)

