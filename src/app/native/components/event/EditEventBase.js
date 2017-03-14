'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  View
} from 'react-native'

import moment from 'moment'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../../redux/actions/newEventActions'

import CityPicker from '../shared/CityPicker'
import DateTimePicker from '../shared/DateTimePicker'
import EditLink from '../shared/EditLink'
import SearchPoi from '../shared/SearchPoi'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  AppSettings
} from '../../../../common/__'

class EditEventBase extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)
    this._showContacts = this._showContacts.bind(this)
    this._setCity = this._setCity.bind(this)
    this._setLocation = this._setLocation.bind(this)

    this.state = {
      showCityPicker: false,
      showTypePicker: false,
      showDateTimePicker: false,
      showGatherLocationPicker: false
    }
  }

  _nextPage(type) {
    let id = null,
      title = null,
      props = {}

    switch (type) {
      case 'title':
        id = 'EditEventTitle',
        title = LANG.t('event.EventTitle')
      break

      case 'difficulty':
        id = 'EditEventDifficulty',
        title = LANG.t('event.DifficultyLevel')
      break

      case 'dates':
        id = 'EditEventDates',
        title = LANG.t('event.EventDates')
      break

      case 'location':
        id = 'EditEventLocation',
        title = LANG.t('event.GatherLocation')
      break

      case 'contacts':
        id = 'EditEventContacts',
        title = LANG.t('event.Contacts')
      break

      case 'limits':
        id = 'EditAttendeeLimits',
        title = LANG.t('event.AttendeeLimits')
      break
    }

    if (id !== null && title !== null) {
      this.props.navigator.push({
        id,
        title,
        passProps: Object.assign({}, props, {
          isPreview: (type === 'preview')
        }) 
      })
    }
  }

  _showContacts() {
    let mobileNumbers = []

    this.props.newEvent.contacts.map((contact, index) => {
      mobileNumbers.push(contact.mobileNumber)
    })

    return mobileNumbers.join(',')
  }

  _setCity(city) {
    this.props.newEventActions.setDepartCity(city)
    this.setState({showCityPicker: false})
  }

  _setLocation(poi) {
    this.props.newEventActions.setGatherLocation(poi)
    this.setState({showGatherLocationPicker: false})
  }

  render() {
    const event = this.props.newEvent

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('event.EventTitle')}
              required={true}
              validated={(event.title.length >= AppSettings.minEventTitleLength)}
              onPress={() => this._nextPage('title')}
              value={(event.title.length >= AppSettings.minEventTitleLength) ? event.title : LANG.t('event.edit.Untitled')}
            />
            <EditLink
              label={LANG.t('event.DifficultyLevel')}
              required={true}
              validated={(event.difficultyLevel >= 2 && event.difficultyLevel <= 10)}
              onPress={() => this._nextPage('difficulty')}
              value={UTIL.showDifficultyLevel(event.difficultyLevel)}
            />
            <EditLink
              label={LANG.t('event.DepartCity')}
              required={true}
              validated={(event.city !== null)}
              onPress={() => this.setState({showCityPicker: true})}
              value={LANG.t('cities.byCode.' + event.city)}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('event.EventDates')}
              required={true}
              validated={(event.groups.length > 0)}
              onPress={() => this._nextPage('dates')}
              value={(event.groups.length > 1) ? LANG.t('event.EventGroups', {count: event.groups.length}) : moment(event.groups[0].startDate).format('LL')}
            />
            <EditLink
              label={LANG.t('event.GatherTime')}
              required={true}
              validated={(event.gatherTime !== null)}
              onPress={() => this.setState({showDateTimePicker: true})}
              value={(event.gatherTime) ? UTIL.formatMinutes(event.gatherTime) : ''}
            />
            <EditLink
              label={LANG.t('event.GatherLocation')}
              required={true}
              validated={(event.gatherLocation.name.length > 0)}
              onPress={() => this.setState({showGatherLocationPicker: true})}
              value={event.gatherLocation.name}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('event.Contacts')}
              required={true}
              validated={(event.contacts.length > 0)}
              onPress={() => this._nextPage('contacts')}
              value={this._showContacts()}
            />
            <EditLink
              label={LANG.t('event.AttendeeLimits')}
              onPress={() => this._nextPage('limits')}
              value={LANG.t('event.Attendees', {min: event.minAttendee.toString(), max: event.maxAttendee.toString()})}
            />
          </View>
        </ScrollView>
        <CityPicker 
          visible={this.state.showCityPicker}
          selectedIndex={event.city} 
          onPress={(value) => this._setCity(value)}
          onCancel={() => this.setState({showCityPicker: false})}
        />
        <DateTimePicker
          mode={'time'}
          datetime={event.gatherTime}
          showPicker={this.state.showDateTimePicker}
          title={LANG.t('event.GatherTime')}
          cancelText={LANG.t('glossary.Cancel')} 
          confirmText={LANG.t('glossary.Confirm')}
          onConfirm={(value) => this.props.newEventActions.setGatherTime(value)}
          onCancel={() => this.setState({showDateTimePicker: false})}
        />
        <SearchPoi
          showPicker={this.state.showGatherLocationPicker}
          value={this.state.gatherLocation}
          onConfirm={(value) => this._setLocation(value)}
          onCancel={() => this.setState({showGatherLocationPicker: false})}
        />
      </View>
    )
  }
}

EditEventBase.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  newEvent: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEventBase)
