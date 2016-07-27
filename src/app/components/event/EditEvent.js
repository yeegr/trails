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
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Moment from 'moment'
import Immutable from 'immutable'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../containers/actions/newEventActions'

import EditLink from '../shared/EditLink'
import TypePicker from '../shared/TypePicker'
import DateTimePicker from '../shared/DateTimePicker'
import styles from '../../styles/main'

class EditEvent extends Component {
  constructor(props) {
    super(props)
    this.showContacts = this.showContacts.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.setType = this.setType.bind(this)

    this.state = {
      mobileNumbers: this.props.newEvent.mobileNumbers,
      showTypePicker: false,
      showDateTimePicker: false
    }
  }

  componentWillMount() {
  //    this.props.newEventActions.resetEvent()
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
      case 'title':
        id = 'EditEventTitle',
        title = Lang.EventTitle
      break;

      case 'location':
        id = 'EditEventDescription',
        title = Lang.EventType
      break;

      case 'contacts':
        id = 'EditEventContacts',
        title = Lang.Contacts
      break;

      case 'desc':
        id = 'EditEventDescription',
        title = Lang.EventType
      break;

      case 'limits':
        id = 'EditAttendeeLimits',
        title = Lang.AttendeeLimits
      break;

      case 'agenda':
        id = 'AgendaList',
        title = Lang.DetailSchedule
      break;

      case 'expenses':
        id = 'EditEventExpenses',
        title = Lang.EventExpenses
      break;

      case 'gears':
        id = 'EditEventGears',
        title = Lang.GearsToBring
      break;

      case 'destination':
        id = 'EditEventDestination',
        title = Lang.Destination
      break;

      case 'notes':
        id = 'EditEventNotes',
        title = Lang.EventNotes
      break;
    }

    this.props.navigator.push({
      id,
      title,
      passProps: {
        preview: (type === 'preview')
      }
    })
  }

  resetNavigation() {
    this.props.navigator.resetTo({
      id: 'Home',
      title: ''
    })
  }

  setType(type) {
    this.props.newEventActions.setEventType(type)

    this.setState({
      showTypePicker: false
    })
  }

  render() {
    return (
      <View style={styles.detail.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <View style={styles.editor.link}>
              <View style={styles.editor.label}>
                <Text>{Lang.PrivacySetting}</Text>
              </View>
              <View style={styles.editor.value}>
                <Text style={[styles.editor.valueText, {marginRight: 10}]}>
                {(this.props.newEvent.isPublic) ? Lang.Public : Lang.Private}
                </Text>
                <Switch
                  onValueChange={(value) => this.props.newEventActions.setEventPrivacy(value)}
                  value={this.props.newEvent.isPublic}
                />
              </View>
            </View>
          </View>
          <View style={styles.editor.group}>
            <EditLink onPress={() => this.nextPage('hero')} value={(this.props.newEvent.hero !== '') ? '' : ''} required={true} label={Lang.HeroImage} />
            <EditLink onPress={() => this.nextPage('title')} value={this.props.newEvent.title} required={true} label={Lang.EventTitle} />
            <EditLink onPress={() => this.setState({showTypePicker: true})} value={Lang.tagArray[this.props.newEvent.type]} required={true} label={Lang.EventType} />
            <EditLink onPress={() => this.setState({showDateTimePicker: true})} value={Moment(this.props.newEvent.gatherTime).format('YYYY-MM-DD HH:mm')} label={Lang.GatherTime} />
            <EditLink onPress={() => this.nextPage('location')} value={this.props.newEvent.gatherLocation.name} label={Lang.GatherLocation} />
            <EditLink onPress={() => this.nextPage('contacts')} value={this.showContacts()} label={Lang.Contacts} />
            <EditLink onPress={() => this.nextPage('limits')} value={this.props.newEvent.minAttendee.toString() + ' - ' + this.props.newEvent.maxAttendee.toString() + Lang.Persons} label={Lang.AttendeeLimits} />
          </View>
          <View style={styles.editor.group}>
            <EditLink onPress={() => this.nextPage('agenda')} label={Lang.DetailSchedule} required={true} />
          </View>
          <View style={styles.editor.group}>
            <EditLink onPress={() => this.nextPage('expenses')} label={Lang.EventExpenses} required={true} />
            <EditLink onPress={() => this.nextPage('gears')} value={this.props.newEvent.gears.images.length} label={Lang.GearsToBring} />
          </View>
          <View style={styles.editor.group}>
            <EditLink onPress={() => this.nextPage('destination')} label={Lang.Destination} />
            <EditLink onPress={() => this.nextPage('notes')} label={Lang.EventNotes} />
          </View>
          <View style={styles.editor.group}>
            <EditLink onPress={() => this.nextPage('preview')} label={Lang.EventPreview} />
          </View>
        </ScrollView>
        <TypePicker 
          visible={this.state.showTypePicker} 
          selectedIndex={this.props.newEvent.type} 
          onPress={(value) => this.setType(value)}
        />
        <DateTimePicker
          datetime={this.props.newEvent.gatherTime}
          showPicker={this.state.showDateTimePicker}
          cancelText={Lang.Cancel} 
          confirmText={Lang.Confirm}
          onConfirm={(value) => this.props.newEventActions.setGatherTime(value)}
          onCancel={() => this.setState({showDateTimePicker: false})}
          minimumDate={new Date()}
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

