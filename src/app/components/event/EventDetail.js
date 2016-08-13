'use strict'

import {
  AppSettings,
  Lang,
  Graphics,
  WebViewCSS
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  WebView
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import ParallaxView from 'react-native-parallax-view'
import Communications from 'react-native-communications'

import Moment from 'moment'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../containers/actions/eventsActions'
import {ACTION_TARGETS} from '../../../constants'

import TextView from '../shared/TextView'
import Loading from '../shared/Loading'
import Header from '../shared/Header'
import Intro from '../shared/Intro'
import ListItem from '../shared/ListItem'
import SimpleContact from '../shared/SimpleContact'
import DayList from '../shared/DayList'
import Icon from '../shared/Icon'
import OrderedList from '../shared/OrderedList'
import GearList from '../shared/GearList'
import WebViewWrapper from '../shared/WebViewWrapper'
import TagList from '../shared/TagList'
import Toolbar from '../shared/Toolbar'
import CallToAction from '../shared/CallToAction'
import {CommentsPreview} from '../shared/Comments'
import UserLink from '../user/UserLink'
import {formatMinutes} from '../../../common'
import styles from '../../styles/main'

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
    this.props.eventsActions.getEvent(this.props.id)
  }

  signUp() {
    let event = this.props.event, 
      id = 'EventOrder',
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
  }

  render() {
    const {event, navigator} = this.props

    if (!event) {
      return <Loading />
    }

    const avatarRadius = 20,
      eventGroups = (event.groups.length > 1) ? (
        <ListItem icon="calendar"
          label={Lang.EventGroups + ' 共' + event.groups.length + Lang.Groups}
          value={Moment(event.groups[0].startDate).format('LL') + '-' + Moment(event.groups[event.groups.length-1].startDate).format('LL')}
        />
      ) : null,
      gatherTime = (event.groups.length > 1) ? formatMinutes(event.gatherTime) : Moment(event.groups[0]).format('ll') + formatMinutes(event.gatherTime),
      expensesDetail = (event.expenses.detail && event.expenses.detail.length > 0) ? (
        <View style={styles.detail.section}>
          <TextView class='h3' text={Lang.ExpensesDetail} />
          <View style={styles.detail.list}>
            <OrderedList content={event.expenses.detail} />
          </View>
        </View>
      ) : null,
      expensesInclude = (event.expenses.include && event.expenses.include.length > 0) ? (
        <View style={styles.detail.section}>
          <TextView class='h3' text={Lang.ExpensesInclude} />
          <View style={styles.detail.list}>
            <OrderedList content={event.expenses.include} />
          </View>
        </View>
      ) : null,
      expensesExclude = (event.expenses.exclude && event.expenses.exclude.length > 0) ? (
        <View style={styles.detail.section}>
          <TextView class='h3' text={Lang.ExpensesExclude} />
          <View style={styles.detail.list}>
            <OrderedList content={event.expenses.exclude} />
          </View>
        </View>
      ) : null,
      eventDestination = (event.destination && event.destination.length > 0) ? (
        <View ref="eventDestination" style={styles.detail.section}>
          <TextView class='h2' text={Lang.Destination} />
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
          <TextView class='h3' text={Lang.OtherGears} />
          <View style={[styles.detail.content, {paddingLeft: 15}]}>
            <TagList tags={event.gears.tags} />
          </View>
        </View>
      ) : null,
      gearNotes = (event.gears.notes && event.gears.notes.length > 0) ? (
        <View style={styles.detail.subsection}>
          <TextView class='h3' text={Lang.OtherGears} />
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
        <CommentsPreview 
          navigator={navigator}
          type={ACTION_TARGETS.EVENT}
          data={event}
        />
      ) : null

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView style={{flex: 1}}
          ref='scrollView'
          backgroundSource={{uri: AppSettings.assetUri + event.hero}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
              align='bottom' 
              title={event.title}
              excerpt={event.excerpt}
            />
          )}>
          <View style={styles.detail.article}>
            <View style={styles.detail.toolbar}>
              <Toolbar
                navigator={navigator}
                type={ACTION_TARGETS.EVENT}
                data={event}
              />
            </View>
            <View ref="eventInfo" style={styles.detail.section}>
              <Header text={Lang.EventInfo} />
              <View style={styles.detail.list}>
                <ListItem icon={event.type}
                  label={Lang.EventTitle}
                  value={event.title}
                />
                {eventGroups}
                <ListItem icon="clock"
                  label={Lang.GatherTime}
                  value={gatherTime}
                />
                <ListItem icon="pin"
                  label={Lang.GatherLocation}
                  value={event.gatherLocation.name}
                />
                <View style={{marginBottom: 20}}>
                  <UserLink user={event.creator} navigator={navigator} />
                </View>
                <ListItem icon="phone"
                  label={Lang.Contacts}
                  value={
                    <View style={{marginTop: 5}}>
                      {
                        event.contacts.map((contact, index) => {
                          return (
                            <SimpleContact key={index} label={contact.title} number={contact.mobileNumber} fontSize='L' />
                          )
                        })
                      }
                    </View>
                  }
                />
                <ListItem icon="group"
                  label={Lang.AttendeeLimits}
                  value={event.minAttendee + '-' + event.maxAttendee + Lang.Persons}
                />
              </View>
            </View>
            <View ref="eventSignUps" style={styles.detail.section}>
              <Header text={Lang.SignUps} />
              <View style={styles.detail.content}>
              </View>
            </View>
            <View ref="eventSchedule" style={styles.detail.section}>
              <Header text={Lang.DetailSchedule} />
              <View style={styles.detail.list}>
                <DayList schedule={event.schedule} />
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
        <CallToAction
          disabled={(this.props.user === null)}
          label={Lang.SignUpNow}
          onPress={this.signUp}
        />
      </View>
    )
  }
}

EventDetail.propTypes = {
  id: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    event: state.events.event,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
