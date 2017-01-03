'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import Moment from 'moment'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../redux/actions/eventsActions'
import * as navbarActions from '../../redux/actions/navbarActions'
import * as loginActions from '../../redux/actions/loginActions'

import TextView from '../shared/TextView'
import Loading from '../shared/Loading'
import Header from '../shared/Header'
import ImagePath from '../shared/ImagePath'
import Intro from '../shared/Intro'
import ListItem from '../shared/ListItem'
import SimpleContact from '../shared/SimpleContact'
import DayList from '../shared/DayList'
import OrderedList from '../shared/OrderedList'
import GearList from '../shared/GearList'
import WebViewWrapper from '../shared/WebViewWrapper'
import TagList from '../shared/TagList'
import Toolbar from '../shared/Toolbar'
import CommentPreview from '../shared/CommentPreview'
import UserLink from '../user/UserLink'

import styles from '../../styles/main'

import {
  UTIL,
  CONSTANTS,
  Lang,
  Graphics
} from '../../settings'

class EventDetail extends Component {
  constructor(props) {
    super(props)
    this.signUp = this.signUp.bind(this)

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.navbar.nav_to_signup_event === true) {
      this.signUp()
    }
  }

  componentWillUnmount() {
    if (!this.props.isPreview) {
      this.props.eventsActions.clearEvent()
    }
  }

  signUp() {
    if (this.props.user) {
      let event = this.props.event, 
        id = 'OrderEvent',
        title = Lang.SignUp

      if (event.groups.length > 1) {
        id = 'SelectOrderGroup',
        title = Lang.SelectOrderGroup
      } 

      this.props.navigator.push({
        id,
        title,
        passProps: {
          event
        }
      })
    } else {
      this.props.loginActions.showLogin()
    }
  }

  render() {
    const event = (this.props.isPreview) ? this.props.newEvent : this.props.event,
      {navigator} = this.props

    if (!event) {
      return <Loading />
    }

    let creator = this.props.user, 
      toolbar = null

    if (!this.props.isPreview) {
      creator = event.creator,
      toolbar = (
        <View style={styles.detail.toolbar}>
          <Toolbar
            navigator={navigator}
            type={CONSTANTS.ACTION_TARGETS.EVENT}
            data={event}
          />
        </View>
      )
    }

    const eventBackgroundUrl = ImagePath({type: 'background', path: CONSTANTS.ASSET_FOLDERS.EVENT + '/' + event._id + '/' + event.hero}),
      eventGroups = (event.groups.length > 1) ? (
        <ListItem icon={'calendar'}
          label={Lang.EventGroups + ' 共' + event.groups.length + Lang.Groups}
          value={Moment(event.groups[0].startDate).format('LL') + '-' + Moment(event.groups[event.groups.length-1].startDate).format('LL')}
        />
      ) : null,
      gatherTime = (event.groups.length > 1) ? UTIL.formatMinutes(event.gatherTime) : Moment(event.groups[0]).format('ll') + UTIL.formatMinutes(event.gatherTime),
      expensesDetail = (event.expenses.detail && event.expenses.detail.length > 0) ? (
        <View style={styles.detail.section}>
          <TextView class={'h3'} text={Lang.ExpensesDetail} />
          <View style={styles.detail.list}>
            <OrderedList content={event.expenses.detail} />
          </View>
        </View>
      ) : null,
      expensesInclude = (event.expenses.include && event.expenses.include.length > 0) ? (
        <View style={styles.detail.section}>
          <TextView class={'h3'} text={Lang.ExpensesInclude} />
          <View style={styles.detail.list}>
            <OrderedList content={event.expenses.include} />
          </View>
        </View>
      ) : null,
      expensesExclude = (event.expenses.exclude && event.expenses.exclude.length > 0) ? (
        <View style={styles.detail.section}>
          <TextView class={'h3'} text={Lang.ExpensesExclude} />
          <View style={styles.detail.list}>
            <OrderedList content={event.expenses.exclude} />
          </View>
        </View>
      ) : null,
      eventDestination = (event.destination && event.destination.length > 0) ? (
        <View ref="eventDestination" style={styles.detail.section}>
          <TextView class={'h2'} text={Lang.Destination} />
          <WebViewWrapper html={'<div>' + event.destination + '</div>'} />
        </View>
      ) : null,
      eventGears = (event.gears.images && event.gears.images.length > 0) ? (
        <View ref="eventGears" style={styles.detail.section}>
          <Header text={Lang.GearsToBring} />
          <View style={[styles.detail.content, {paddingHorizontal: 12}]}>
            <GearList list={event.gears.images} />
          </View>
          {otherGears}
        </View>
      ) : null,
      otherGears = (event.gears.tags && event.gears.tags.length > 0) ? (
        <View style={styles.detail.subsection}>
          <TextView class={'h3'} text={Lang.OtherGears} />
          <View style={[styles.detail.content, {paddingLeft: 15}]}>
            <TagList tags={event.gears.tags} />
          </View>
        </View>
      ) : null,
      gearNotes = (event.gears.notes && event.gears.notes.length > 0) ? (
        <View style={styles.detail.subsection}>
          <TextView class={'h3'} text={Lang.OtherGears} />
          <View style={[styles.detail.content, {paddingLeft: 15}]}>
            <OrderedList content={event.gears.notes} />
          </View>
        </View>
      ) : null,
      eventNotes = (event.notes && event.notes.length > 0) ? (
        <View ref="eventNotes" style={styles.detail.section}>
          <Header text={Lang.EventNotes} />
          <WebViewWrapper html={event.notes} />
        </View>
      ) : null,
      commentsPreview = (event.comments.length > 0) ? (
        <CommentPreview 
          navigator={navigator}
          type={CONSTANTS.ACTION_TARGETS.EVENT}
          data={event}
        />
      ) : null

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView
          backgroundSource={{uri: eventBackgroundUrl}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
              align={'bottom'}
              title={event.title}
              excerpt={event.excerpt}
            />
          )}>
          <View style={styles.detail.article}>
            <View ref="eventInfo" style={styles.detail.section}>
              <Header text={Lang.EventInfo} />
              <View style={styles.detail.list}>
                <ListItem icon={event.type.toString()}
                  label={Lang.EventTitle}
                  value={event.title}
                />
                {eventGroups}
                <ListItem icon="clock"
                  label={Lang.GatherTime}
                  value={gatherTime}
                />
                <ListItem icon={'pin'}
                  label={Lang.GatherLocation}
                  value={event.gatherLocation.name}
                />
                <View style={{marginBottom: 20}}>
                  <UserLink user={creator} navigator={navigator} />
                </View>
                <ListItem icon={'phone'}
                  label={Lang.Contacts}
                  value={
                    <View style={{marginTop: 5}}>
                      {
                        event.contacts.map((contact, index) => {
                          return (
                            <SimpleContact key={index} label={contact.title} number={contact.mobileNumber} fontSize={'L'} />
                          )
                        })
                      }
                    </View>
                  }
                />
                <ListItem icon={'group'}
                  label={Lang.AttendeeLimits}
                  value={event.minAttendee + '-' + event.maxAttendee + Lang.Persons}
                />
              </View>
            </View>
            <View ref="eventSchedule" style={styles.detail.section}>
              <Header text={Lang.DetailSchedule} />
              <View style={styles.detail.list}>
                <DayList
                  navigator={navigator}
                  schedule={event.schedule}
                />
              </View>
            </View>
            <View ref="eventExpenses" style={styles.detail.section}>
              <Header text={Lang.EventExpenses} />
              {expensesDetail}
              {expensesInclude}
              {expensesExclude}
            </View>
            {eventDestination}
            {eventGears}
            {eventNotes}
            {commentsPreview}
          </View>
        </ParallaxView>
        {toolbar}
      </View>
    )
  }
}

EventDetail.propTypes = {
  navigator: PropTypes.object.isRequired,
  eventsActions: PropTypes.object.isRequired,
  navbarActions: PropTypes.object.isRequired,
  loginActions: PropTypes.object.isRequired,
  id: PropTypes.string,
  event: PropTypes.object,
  newEvent: PropTypes.object,
  user: PropTypes.object,
  isPreview: PropTypes.bool
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
    navbarActions: bindActionCreators(navbarActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
