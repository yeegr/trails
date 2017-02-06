'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Alert,
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import Moment from 'moment'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../redux/actions/eventsActions'
import * as newEventActions from '../../redux/actions/newEventActions'
import * as loginActions from '../../redux/actions/loginActions'

import Card from '../shared/Card'
import CallToAction from '../shared/CallToAction'
import Loading from '../shared/Loading'
import Header from '../shared/Header'
import ImagePath from '../shared/ImagePath'
import ListItem from '../shared/ListItem'
import SimpleContact from '../shared/SimpleContact'
import OrderedList from '../shared/OrderedList'
import GearList from '../shared/GearList'
import WebViewWrapper from '../shared/WebViewWrapper'
import TagList from '../shared/TagList'
import TextView from '../shared/TextView'
import Toolbar from '../shared/Toolbar'
import CommentPreview from '../shared/CommentPreview'
import UserLink from '../user/UserLink'
import TrailList from '../trail/TrailList'

import styles from '../../styles/main'

import {
  CONSTANTS,
  LANG,
  UTIL,
  Graphics
} from '../../settings'

class EventDetail extends Component {
  constructor(props) {
    super(props)
    this.props.navigator.__editEvent = this._editEvent.bind(this)
    this._submitEvent = this._submitEvent.bind(this)

    this.state = {
      destinationHeight: 0,
      eventNoteHeight: 0
    }
  }

  componentWillMount() {
    if (!this.props.isPreview) {
      this.props.eventsActions.getEvent(this.props.id)
    }
  }

  componentWillUnmount() {
    if (!this.props.isPreview) {
      this.props.eventsActions.clearEvent()
    }
  }

  _editEvent() {
    let event = (this.props.isPreview) ? this.props.newEvent : this.props.event

    if (event.status === 'editing') {
      this.props.navigator.push({
        id: 'EditEvent',
        title: LANG.t('event.EditEvent'),
        passProps: {
          event: this.props.event
        }
      })
    } else {
      Alert.alert(
        LANG.t('event.edit.ReEditAlert.title'),
        LANG.t('event.edit.ReEditAlert.description'),
        [
          {
            text: LANG.t('event.edit.ReEditAlert.okay')
          }
        ]
      )
    }
  }

  _submitEvent() {
    Alert.alert(
      LANG.t('event.edit.SubmitAlert.title'),
      LANG.t('event.edit.SubmitAlert.description'),
      [
        {
          text: LANG.t('event.edit.SubmitAlert.confirm'),
          onPress: this.props.newEventActions.submitEvent()
        },
        {
          text: LANG.t('event.edit.SubmitAlert.cancel')
        }
      ]
    )
  }

  render() {
    const {navigator, isPreview, isReview} = this.props,
      event = (isPreview) ? this.props.newEvent : this.props.event

    if (!event) {
      return <Loading />
    }

    let schedule = event.schedule.map((agenda) => {
      return agenda.trail
    })

    const creator = (isPreview || isReview) ? this.props.user : event.creator,
      eventHeroUri = ImagePath({type: 'background', path: UTIL.getEventHeroPath(event)}),
      eventGroups = (event.groups.length > 1) ? (
        <ListItem icon={'calendar'}
          label={LANG.t('event.EventDates') + ' ' + LANG.t('event.EventGroups', {count: event.groups.length})}
          value={Moment(event.groups[0].startDate).format('LL') + '-' + Moment(event.groups[event.groups.length-1].startDate).format('LL')}
        />
      ) : null,
      gatherTime = UTIL.formatMinutes(event.gatherTime),
      gatherDateTime = (event.groups.length > 1) ? gatherTime : Moment(event.groups[0]).format('ll') + gatherTime,
      eventTrails = (schedule.length > 0) ? (
        <View ref="eventSchedule" style={styles.detail.section}>
          <Header
            text={LANG.t('event.EventTrails')}
          />
          <View>
            <TrailList
              navigator={navigator}
              query={'?in=[' + schedule + ']'}
            />
          </View>
        </View>
      ) : null,
      perHead = event.expenses.perHead,
      expensesDetail = (event.expenses.detail && event.expenses.detail.length > 0) ? (
        <View style={styles.detail.section}>
          <TextView
            class={'h3'}
            text={LANG.t('event.ExpensesDetails')}
          />
          <View style={styles.detail.list}>
            <OrderedList
              content={event.expenses.detail}
            />
          </View>
        </View>
      ) : null,
      expensesIncludes = (event.expenses.includes && event.expenses.includes.length > 0) ? (
        <View style={styles.detail.section}>
          <TextView
            class={'h3'}
            text={LANG.t('event.ExpensesIncludes')}
          />
          <View style={styles.detail.list}>
            <OrderedList
              content={event.expenses.includes}
            />
          </View>
        </View>
      ) : null,
      expensesExcludes = (event.expenses.excludes && event.expenses.excludes.length > 0) ? (
        <View style={styles.detail.section}>
          <TextView
            class={'h3'}
            text={LANG.t('event.ExpensesExcludes')}
          />
          <View style={styles.detail.list}>
            <OrderedList 
              content={event.expenses.excludes}
            />
          </View>
        </View>
      ) : null,
      otherGears = (event.gears.tags && event.gears.tags.length > 0) ? (
        <View style={styles.detail.subsection}>
          <TextView
            class={'h3'}
            text={LANG.t('event.OtherGears')}
          />
          <View style={[styles.detail.content, {paddingLeft: 15}]}>
            <TagList
              tags={event.gears.tags}
              type={'pill'}
              backgroundColor={Graphics.colors.tag}
            />
          </View>
        </View>
      ) : null,
      gearNotes = (event.gears.notes && event.gears.notes.length > 0) ? (
        <View style={styles.detail.subsection}>
          <TextView
            class={'h3'}
            text={LANG.t('event.GearNotes')}
          />
          <View style={[styles.detail.content, {paddingLeft: 15}]}>
            <OrderedList
              content={event.gears.notes}
            />
          </View>
        </View>
      ) : null,
      gearImages = (event.gears.images && event.gears.images.length > 0) ? (
        <View style={[styles.detail.content, {paddingLeft: 15}]}>
          <GearList
            list={event.gears.images}
          />
        </View>
      ) : null,
      eventGears = (event.gears.images.length > 0 || event.gears.tags.length > 0 || event.gears.notes.length > 0) ? (
        <View ref="eventGears" style={styles.detail.section}>
          <Header
            text={LANG.t('event.GearsToBring')}
          />
          {gearImages}
          {otherGears}
          {gearNotes}
        </View>
      ) : null,
      eventDestination = (event.destination && event.destination.length > 0) ? (
        <View ref="eventDestination" style={styles.detail.section}>
          <Header
            text={LANG.t('event.DestinationDescription')}
          />
          <View style={[styles.detail.content, {paddingLeft: 15}]}>
            <WebViewWrapper
              html={event.destination}
              uri={'events/' + event._id}
            />
          </View>
        </View>
      ) : null,
      eventNotes = (event.notes && event.notes.length > 0) ? (
        <View style={styles.detail.section}>
          <Header
            text={LANG.t('event.EventNotes')}
          />
          <View style={[styles.detail.content, {paddingLeft: 15}]}>
            <OrderedList
              content={event.notes}
            />
          </View>
        </View>
      ) : null,
      commentsPreview = (event.comments.length > 0) ? (
        <CommentPreview 
          navigator={navigator}
          type={CONSTANTS.ACTION_TARGETS.EVENT}
          data={event}
        />
      ) : null,
      toolbar = (
        <View style={styles.detail.toolbar}>
          <Toolbar
            navigator={navigator}
            type={CONSTANTS.ACTION_TARGETS.EVENT}
            data={event}
          />
        </View>
      ),
      submit = (
        <CallToAction
          disabled={!newEventActions.validateEvent(event)}
          label={LANG.t('event.edit.SubmitForReview')}
          onPress={this._submitEvent}
        />
      )

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView
          backgroundSource={{uri: eventHeroUri}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Card
              align={'bottom'}
              title={event.title}
              excerpt={event.excerpt}
            />
          )}>
          <View style={styles.detail.article}>
            <View ref="eventInfo" style={styles.detail.section}>
              <Header
                text={LANG.t('event.EventInfo')}
              />
              <View style={styles.detail.list}>
                {eventGroups}
                <ListItem icon="clock"
                  label={LANG.t('event.GatherTime')}
                  value={gatherDateTime}
                />
                <ListItem icon={'pin'}
                  label={LANG.t('event.GatherLocation')}
                  value={event.gatherLocation.name}
                />
                <View style={{marginBottom: 20}}>
                  <UserLink
                    navigator={navigator}
                    user={creator}
                  />
                </View>
                <ListItem icon={'phone'}
                  label={LANG.t('event.Contacts')}
                  value={
                    <View style={{marginTop: 5}}>
                      {
                        event.contacts.map((contact, index) => {
                          return (
                            <SimpleContact
                              key={index}
                              label={contact.title}
                              number={contact.mobileNumber}
                              fontSize={'L'}
                            />
                          )
                        })
                      }
                    </View>
                  }
                />
                <ListItem icon={'group'}
                  label={LANG.t('event.AttendeeLimits')}
                  value={LANG.t('event.Attendees', {min: event.minAttendee.toString(), max: event.maxAttendee.toString()})}
                />
              </View>
            </View>
            {eventTrails}
            <View ref="eventExpenses" style={styles.detail.section}>
              <Header
                text={LANG.t('event.EventExpenses')}
              />
              <View style={styles.detail.list}>
                <ListItem icon="yuan"
                  label={LANG.t('event.FeePerHead')}
                  value={(perHead > 0) ? LANG.l('currency', perHead) : LANG.t('event.ExpenseFree')}
                />
              </View>
              {(perHead > 0) ? expensesDetail : null}
              {(perHead > 0) ? expensesIncludes : null}
              {(perHead > 0) ? expensesExcludes : null}
            </View>
            {eventDestination}
            {eventGears}
            {eventNotes}
            {(!isPreview && !isReview) ? commentsPreview : null}
          </View>
        </ParallaxView>
        {(!isPreview && !isReview) ? toolbar : null}
        {(isPreview || (isReview && event.status === 'editing')) ? submit : null}
      </View>
    )
  }
}

EventDetail.propTypes = {
  navigator: PropTypes.object.isRequired,
  eventsActions: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  loginActions: PropTypes.object.isRequired,
  id: PropTypes.string,
  event: PropTypes.object,
  newEvent: PropTypes.object,
  user: PropTypes.object,
  isPreview: PropTypes.bool,
  isReview: PropTypes.bool
}

function mapStateToProps(state, ownProps) {
  return {
    navbar: state.navbar,
    event: state.events.event,
    newEvent: state.newEvent,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch),
    newEventActions: bindActionCreators(newEventActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
