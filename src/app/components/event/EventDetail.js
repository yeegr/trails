'use strict'

import {
  AppSettings,
  Lang,
  Graphics,
  WebViewCSS
} from '../../settings'

import React, {
  Component
} from 'react'

import {
  ScrollView,
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

import {ACTION_TARGETS} from '../../../constants'
import Loading from '../shared/Loading'
import Hero from '../shared/Hero'
import Intro from '../shared/Intro'
import ActionBar from '../shared/ActionBar'
import Header from '../shared/Header'
import Agenda from '../shared/Agenda'
import Icon from '../shared/Icon'
import OrderedList from '../shared/OrderedList'
import {GearList} from '../shared/Gear'
import {TagList} from '../shared/Tag'
import UserLink from '../user/UserLink'
import {formatTime} from '../../../common'
import WebViewWrapper from '../shared/WebViewWrapper'
import styles from '../../styles/main'

export default class EventDetail extends Component {
  constructor(props) {
    super(props)
    this._cutoffY = 320 - 64,
    this._cutoffMin = this._cutoffY - 10,
    this._cutoffMax = this._cutoffY + 10,
    this.handleScroll = this.handleScroll.bind(this)
    this.measure = this.measure.bind(this)
    this.scrollTo = this.scrollTo.bind(this)

    let heroHeight = 240, 
      marginTop = 64

    this.offsetY = heroHeight - marginTop

    this.state = {
      loading: true,
      scrollTop: heroHeight,
      showInner: true,
      selectedSectionIndex: 0,
      destinationHeight: 0,
      eventNoteHeight: 0,
      showInside: true
    }
  }

  fetchData(id) {
    fetch(AppSettings.apiUri + 'events/' + id)
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        loading: false,
        data: response
      })

      setTimeout(() => this.measure(), 500)
    })
    .catch((error) => {
      console.warn(error)
    })
  }

  componentDidMount() {
    this.fetchData(this.props.id)
  }

  measure() {
    let posArray = [], 
      refArray = ['eventInfo', 'eventSignUps', 'eventSchedule', 'eventExpenses', 'eventDestination', 'eventGears', 'eventNotes']

    refArray.map((ref) => {
      if (this.refs[ref]) {
        this.refs[ref].measure((fx, fy, width, height, px, py) => {
          posArray.push(Math.floor(py) - 80)
        })
      }
    })

    setTimeout(() => this.setState({posArray}), 100)
  }

  handleScroll(evt) {
    let y = evt.nativeEvent.contentOffset.y,
      posArray = this.state.posArray,
      index = 0

    if (y < posArray[1]) {
      index = 0
    } else if (y >= posArray[1] && y < posArray[2]) {
      index = 1
    } else if (y >= posArray[2] && y < posArray[3]) {
      index = 2
    } else if (y >= posArray[3] && y < posArray[4]) {
      index = 3
    } else if (y >= posArray[4] && y < posArray[5]) {
      index = 4
    } else if (y >= posArray[5]) {
      index = 5
    }

    this.setState({selectedSectionIndex: index})
  }

  scrollTo(index) {
    this.refs.scroll.scrollTo({x: 0, y: this.state.posArray[index], animated: false})
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    const event = this.state.data,
      navigator = this.props.navigator,
      avatarRadius = 20

    var expensesDetail = (event.expenses.detail && event.expenses.detail.length > 0) ? (
        <View style={styles.detail.section}>
          <Text style={styles.detail.h3}>{Lang.ExpensesDetail}</Text>
          <View style={styles.detail.list}>
            <OrderedList content={event.expenses.detail} />
          </View>
        </View>
      ) : null,
      expensesInclude = (event.expenses.include && event.expenses.include.length > 0) ? (
        <View style={styles.detail.section}>
          <Text style={styles.detail.h3}>{Lang.ExpensesInclude}</Text>
          <View style={styles.detail.list}>
            <OrderedList content={event.expenses.include} />
          </View>
        </View>
      ) : null,
      expensesExclude = (event.expenses.exclude && event.expenses.exclude.length > 0) ? (
        <View style={styles.detail.section}>
          <Text style={styles.detail.h3}>{Lang.ExpensesExclude}</Text>
          <View style={styles.detail.list}>
            <OrderedList content={event.expenses.exclude} />
          </View>
        </View>
      ) : null,
      eventDestination = (event.destination && event.destination.length > 0) ? (
        <View ref="eventDestination" style={styles.detail.section}>
          <Text style={styles.detail.h2}>{Lang.Destination}</Text>
          <WebViewWrapper html={'<div>' + event.destination + '</div>'} />
        </View>
      ) : null,
      eventGears = (event.gears.images && event.gears.images.length > 0) ? (
        <View ref="eventGears" style={styles.detail.section}>
          <Text style={styles.detail.h2}>{Lang.GearsToBring}</Text>
          <View style={[styles.detail.content, {paddingLeft: 15}]}>
            <GearList list={event.gears.images} />
          </View>
          {otherGears}
        </View>
      ) : null,
      otherGears = (event.gears.tags && event.gears.tags.length > 0) ? (
        <View style={styles.detail.subsection}>
          <Text style={styles.detail.h3}>{Lang.OtherGears}</Text>
          <View style={[styles.detail.content, {paddingLeft: 15}]}>
            <TagList tags={event.gears.tags} />
          </View>
        </View>
      ) : null,
      eventNotes = (event.notes && event.notes.length > 0) ? (
        <View ref="eventNotes" style={styles.detail.section}>
          <Text style={styles.detail.h2}>{Lang.EventNotes}</Text>
          <WebViewWrapper html={event.notes} />
        </View>
      ) : null

    return (
      <View style={styles.detail.wrapper}>
        <ScrollView ref="scroll" style={styles.detail.wrapper} onScroll={this.handleScroll} scrollEventThrottle={200}>
          <View style={{height: this.state.scrollTop}}>
            <Hero imageUri={event.hero} title={event.title} excerpt={event.excerpt} />
          </View>
          <View style={styles.detail.binder}>
            <View style={[styles.detail.article, {marginLeft: 80}]}>
              <View ref="eventInfo" style={styles.detail.section}>
                <Text style={styles.detail.h2}>{Lang.EventInfo}</Text>
                <View style={styles.detail.list}>
                  <ListItem icon={event.type}
                    label={Lang.EventTitle}
                    text={event.title} />
                  <ListItem icon="clock"
                    label={Lang.GatherTime}
                    text={formatTime(event.gatherTime, 'lll')} />
                  <ListItem icon="pin"
                    label={Lang.GatherLocation}
                    text={event.gatherLocation.name} />
                  <UserLink user={event.creator} navigator={navigator} />
                  <ListItem icon="phone"
                    label={Lang.Contacts}
                    contacts={event.contacts} />
                  <ListItem icon="group"
                    label={Lang.AttendeeLimits}
                    maxAttendee={event.minAttendee}
                    minAttendee={event.maxAttendee} />
                </View>
              </View>
              <View ref="eventSignUps" style={styles.detail.section}>
                <Text style={styles.detail.h2}>{Lang.SignUps}</Text>
                <View style={styles.detail.content}>
                  <View style={styles.detail.row}>
                    <View style={styles.detail.row}>
                    </View>
                    <TouchableOpacity style={styles.detail.user}>
                      
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View ref="eventSchedule" style={styles.detail.section}>
                <Text style={styles.detail.h2}>{Lang.DetailSchedule}</Text>
                <View style={styles.detail.list}>
                {
                  event.schedule.map(function(day, i) {
                    return (
                      <View key={i}>
                      {
                        day.map(function(agenda, j) {
                          return (
                            <Agenda day={i} key={j} agenda={agenda} />
                          )
                        })
                      }
                      </View>
                    )
                  })
                }
                </View>
              </View>
              <View ref="eventExpenses" style={styles.detail.section}>
                <Text style={styles.detail.h2}>{Lang.EventExpenses}</Text>
                {expensesDetail}
                {expensesInclude}
                {expensesExclude}
              </View>
              {eventDestination}
              {eventGears}
              {eventNotes}
            </View>
          </View>
        </ScrollView>
        <Sidebar offsetY={64} visible={true} selectedIndex={this.state.selectedSectionIndex} onPress={(value) => this.scrollTo(value)} />
        <ActionBar type={ACTION_TARGETS.EVENT} data={event} buttonText={Lang.SignUpNow} buttonEvent={null} />
      </View>
    )
  }
}

const Sidebar = (props) => {
  if (!props.visible) {
    return null
  }

  let pathArray = [
    "M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 30h-4V22h4v12zm0-16h-4v-4h4v4z",
    "M32 22c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm-16 0c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm0 4c-4.67 0-14 2.34-14 7v5h28v-5c0-4.66-9.33-7-14-7zm16 0c-.58 0-1.23.04-1.93.11C32.39 27.78 34 30.03 34 33v5h12v-5c0-4.66-9.33-7-14-7z",
    "M34 24H24v10h10V24zM32 2v4H16V2h-4v4h-2c-2.21 0-3.98 1.79-3.98 4L6 38c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4h-2V2h-4zm6 36H10V16h28v22z",
    "M28,24h6v4h-7v4h7v4h-7v6h-6v-6h-7v-4h7v-4h-7v-4h6L9.6,6h8L24,17.1L30.4,6h8L28,24z",
    "M9,21v14h6V21H9z M21,21v14h6V21H21z M5,45h38v-6H5V45z M33,21v14h6V21H33z M24,3L5,13v4h38v-4L24,3z",
    "M38 12h-4c0-5.52-4.48-10-10-10S14 6.48 14 12h-4c-2.21 0-3.98 1.79-3.98 4L6 40c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V16c0-2.21-1.79-4-4-4zM24 6c3.31 0 6 2.69 6 6H18c0-3.31 2.69-6 6-6zm0 20c-5.52 0-10-4.48-10-10h4c0 3.31 2.69 6 6 6s6-2.69 6-6h4c0 5.52-4.48 10-10 10z",
    "M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 34h-4v-4h4v4zm4.13-15.49l-1.79 1.84C26.9 25.79 26 27 26 30h-4v-1c0-2.21.9-4.21 2.34-5.66l2.49-2.52C27.55 20.1 28 19.1 28 18c0-2.21-1.79-4-4-4s-4 1.79-4 4h-4c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.76-.71 3.35-1.87 4.51z"
  ],
  labelArray = [
    'EventInfo',
    'SignUps',
    'DetailSchedule',
    'EventExpenses',
    'Destination',
    'GearsToBring',
    'EventNotes'
  ]

  return (
    <ScrollView style={[styles.detail.sidebar, {top: props.offsetY}]}>
    {
      pathArray.map((path, index) => {
        return (
          <Tab key={index} 
            path={path}
            label={Lang[labelArray[index]]}
            index={index}
            selected={props.selectedIndex === index}
            onPress={(value) => props.onPress(value)}
          />
        )
      })
    }
    </ScrollView>
  )
}

const Tab = (props) => {
  var background = null,
    foreground = AppSettings.color.midGray

  if (props.selected === true) {
    background = {backgroundColor: AppSettings.color.background, borderColor: AppSettings.color.primary },
    foreground = AppSettings.color.primary
  }

  return (
    <TouchableOpacity onPress={() => props.onPress(props.index)}>
      <View style={[styles.binder.tab, background]}>
        <Svg scale={0.5} width="24" height="24" style={styles.binder.icon}>
          <Path scale={0.5} fill={foreground} d={props.path}/>
        </Svg>
        <Text style={[styles.binder.label, {color: foreground}]}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  )
}

const ListItem = (props) => {
  var content = null

  if (props.contacts !== undefined) {
    content = (<View style={{flexDirection: 'column'}}>
    {
      props.contacts.map(function(contact, index) {
        const number = contact.mobileNumber

        return (
          <View key={index} style={{flexDirection:'row', marginBottom: 5}}>
            <Text style={[styles.global.title, {marginTop: 7, marginRight: 20}]}>{contact.title}</Text>
            <TouchableOpacity onPress={() => Communications.phonecall({number}, true)}>
              <Text style={styles.global.title}>{contact.mobileNumber}</Text>
            </TouchableOpacity>
          </View>
        )
      })
    }
    </View>)
  } else if (props.minAttendee !== undefined && props.maxAttendee !== undefined) {
    content = <Text style={styles.global.title}>{props.minAttendee} - {props.maxAttendee}{Lang.Persons}</Text>
  } else {
    content = <Text style={styles.global.title}>{props.text}</Text>
  }

  return (
    <View style={styles.detail.row}>
      <Icon type={props.icon} />
      <View style={styles.detail.hgroup}>
        <Text style={styles.global.pretitle}>{props.label}</Text>
        {content }
      </View>
    </View>
  )
}

