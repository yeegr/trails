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

import Moment from 'moment'
import Immutable from 'immutable'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import TextView from '../shared/TextView'
import EditLink from '../shared/EditLink'
import CityPicker from '../shared/CityPicker'
import TypePicker from '../shared/TypePicker'
import DateTimePicker from '../shared/DateTimePicker'
import SearchPoi from '../shared/SearchPoi'
import styles from '../../styles/main'

class EditEvent extends Component {
  constructor(props) {
    super(props)
    this.convertTimeToDatetime = this.convertTimeToDatetime.bind(this)
    this.showContacts = this.showContacts.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.setCity = this.setCity.bind(this)
    this.setType = this.setType.bind(this)

    this.state = {
      showCityPicker: false,
      showTypePicker: false,
      showDateTimePicker: false,
      showGatherLocationPicker: false
    }
  }

  componentWillMount() {
    if (!this.props.event) {
      this.props.newEventActions.createEvent()
    }
  }

  componentWillUnmount() {

  }

  convertTimeToDatetime(minutes) {
    let today = new Date(),
      hrs = Math.floor(minutes / 60),
      min = minutes % 60

    today.setHours(hrs),
    today.setMinutes(min)

    return today
  }

  showContacts() {
    let mobileNumbers = []

    this.props.newEvent.contacts.map((contact, index) => {
      mobileNumbers.push(contact.mobileNumber)
    })

    return mobileNumbers.join(',')
  }

  nextPage(type) {
    let id = null,
      title = null

    switch (type) {
      case 'hero':
        id = 'EditEventHero',
        title = Lang.HeroImage
      break

      case 'title':
        id = 'EditEventTitle',
        title = Lang.EventTitle
      break

      case 'groups':
        id = 'EditEventGroups',
        title = Lang.EventGroups
      break

      case 'location':
        id = 'EditEventLocation',
        title = Lang.GatherLocation
      break

      case 'contacts':
        id = 'EditEventContacts',
        title = Lang.Contacts
      break

      case 'desc':
        id = 'EditEventDescription',
        title = Lang.EventType
      break

      case 'limits':
        id = 'EditAttendeeLimits',
        title = Lang.AttendeeLimits
      break

      case 'agenda':
        id = 'AgendaList',
        title = Lang.DetailSchedule
      break

      case 'expenses':
        id = 'EditEventExpenses',
        title = Lang.EventExpenses
      break

      case 'gears':
        id = 'EditEventGears',
        title = Lang.GearsToBring
      break

      case 'destination':
        id = 'EditEventDestination',
        title = Lang.Destination
      break

      case 'notes':
        id = 'EditEventNotes',
        title = Lang.EventNotes
      break

      case 'photos':
        id = 'EditEventGallery',
        title = Lang.Photos
      break

      case 'preview':
        const event = this.props.newEvent

        console.log(event.title.length)
        console.log(event.hero.length)
        console.log(event.schedule.length > 0 && event.schedule[0].length > 0)
        //id = 'EventDetail',
        //title = Lang.EventDetail
      break
    }

    if (id !== null && title !== null) {
      this.props.navigator.push({
        id,
        title,
        passProps: {
          preview: (type === 'preview')
        }
      })
    }
  }

  resetNavigation() {
    this.props.navigator.resetTo({
      id: 'Home',
      title: ''
    })
  }

  setCity(city) {
    this.props.newEventActions.setDepartCity(city)
    this.setState({showCityPicker: false})
  }

  setType(type) {
    this.props.newEventActions.setEventType(type)
    this.setState({showTypePicker: false})
  }

  setLocation(poi) {
    this.props.newEventActions.setEventGatherLocation(poi)
    this.setState({showGatherLocationPicker: false})
  }

  render() {
    const event = this.props.newEvent

// saved for future
/*
    const privacy = (
          <View style={styles.editor.group}>
            <View style={styles.editor.link}>
              <View style={styles.editor.label}>
                <TextView
                  textColor={Graphics.colors.primary}
                  text={Lang.PrivacySetting}
                />
              </View>
              <View style={styles.editor.value}>
                <TextView
                  style={{marginRight: 10}}
                  text={(event.isPublic) ? Lang.Public : Lang.Private}
                />
                <Switch
                  onValueChange={(value) => this.props.newEventActions.setEventPrivacy(value)}
                  value={event.isPublic}
                />
              </View>
            </View>
          </View>
    )
*/

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <EditLink
              label={Lang.EventTitle}
              required={true}
              validated={(event.title.length >= AppSettings.minEventTitleLength)}
              onPress={() => this.nextPage('title')}
              value={(event.title.length >= AppSettings.minEventTitleLength) ? event.title : Lang.Unnamed}
            />
            <EditLink
              label={Lang.DepartCity}
              required={true}
              validated={(event.city !== null)}
              onPress={() => this.setState({showCityPicker: true})}
              value={Lang.cities[event.city]}
            />
            <EditLink
              label={Lang.HeroImage}
              required={true}
              validated={(event.hero.length > 0 && event.hero !== AppSettings.assetUri)}
              onPress={() => this.nextPage('hero')}
              value={(event.hero !== AppSettings.assetUri) ? '' : ''}
            />
            <EditLink
              label={Lang.EventType}
              required={true}
              validated={(event.type > -1)}
              onPress={() => this.setState({showTypePicker: true})}
              value={Lang.tagArray[event.type]}
            />
            <EditLink
              label={Lang.EventGroups}
              required={true}
              validated={(event.groups.length > 0)}
              onPress={() => this.nextPage('groups')}
              value={event.groups.length.toString()}
            />
            <EditLink
              label={Lang.GatherTime}
              onPress={() => this.setState({showDateTimePicker: true})}
              value={(event.gatherTime) ? Moment(this.convertTimeToDatetime(event.gatherTime)).format('HH:mm') : ''}
            />
            <EditLink
              label={Lang.GatherLocation}
              onPress={() => this.setState({showGatherLocationPicker: true})}
              value={event.gatherLocation.name}
            />
            <EditLink
              label={Lang.Contacts}
              onPress={() => this.nextPage('contacts')}
              value={this.showContacts()}
            />
            <EditLink
              label={Lang.AttendeeLimits}
              onPress={() => this.nextPage('limits')}
              value={event.minAttendee.toString() + ' - ' + event.maxAttendee.toString() + Lang.Persons}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={Lang.DetailSchedule}
              required={true}
              validated={(event.schedule.length > 0 && event.schedule[0].length > 0)}
              onPress={() => this.nextPage('agenda')}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={Lang.EventExpenses}
              required={true}
              validated={(event.expenses.perHead !== null && event.expenses.perHead > -1)}
              onPress={() => this.nextPage('expenses')}
              value={event.expenses.perHead + Lang.Yuan}
            />
            <EditLink
              label={Lang.GearsToBring}
              onPress={() => this.nextPage('gears')}
              value={event.gears.images.length.toString()}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={Lang.Destination}
              onPress={() => this.nextPage('destination')}
            />
            <EditLink
              label={Lang.EventNotes}
              onPress={() => this.nextPage('notes')}
            />
            <EditLink
              label={Lang.Photos}
              onPress={() => this.nextPage('photos')}
              value={event.photos.length}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={Lang.EventPreview}
              onPress={() => this.nextPage('preview')}
            />
          </View>
        </ScrollView>
        <CityPicker 
          visible={this.state.showCityPicker}
          selectedIndex={event.city} 
          onPress={(value) => this.setCity(value)}
          onCancel={() => this.setState({showCityPicker: false})}
        />
        <TypePicker 
          visible={this.state.showTypePicker}
          selectedIndex={event.type} 
          onPress={(value) => this.setType(value)}
          onCancel={() => this.setState({showTypePicker: false})}
        />
        <DateTimePicker
          mode="time"
          datetime={event.gatherTime || new Date()}
          showPicker={this.state.showDateTimePicker}
          cancelText={Lang.Cancel} 
          confirmText={Lang.Confirm}
          onConfirm={(value) => this.props.newEventActions.setGatherTime(value)}
          onCancel={() => this.setState({showDateTimePicker: false})}
          minimumDate={new Date()}
        />
        <SearchPoi
          showPicker={this.state.showGatherLocationPicker}
          value={this.state.gatherLocation}
          onConfirm={(value) => this.setKey('gatherLocation', value)}
          onCancel={() => this.setState({showGatherLocationPicker: false})}
        />
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)