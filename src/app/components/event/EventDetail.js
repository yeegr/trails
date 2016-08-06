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
import TagList from '../shared/TagList'
import UserLink from '../user/UserLink'
import WebViewWrapper from '../shared/WebViewWrapper'
import Toolbar from '../shared/Toolbar'
import CallToAction from '../shared/CallToAction'
import {ACTION_TARGETS} from '../../../constants'
import {formatMinutes} from '../../../common'
import styles from '../../styles/main'

export default class EventDetail extends Component {
  constructor(props) {
    super(props)
    this.signUp = this.signUp.bind(this)

    this.state = {
      loading: true,
      destinationHeight: 0,
      eventNoteHeight: 0
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
    })
    .catch((error) => {
      console.warn(error)
    })
  }

  componentDidMount() {
    this.fetchData(this.props.id)
  }

  signUp() {
    let event = this.state.data, 
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
    if (this.state.loading) {
      return <Loading />
    }

    const event = this.state.data,
      navigator = this.props.navigator,
      avatarRadius = 20,
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
          <View style={[styles.detail.content, {paddingLeft: 15}]}>
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
      ) : null

    return (
      <View style={styles.detail.wrapper}>
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
            <Toolbar
              navigator={this.props.navigator}
              type={ACTION_TARGETS.EVENT}
              data={event}
            />
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
          </View>
        </ParallaxView>
        <CallToAction
          label={Lang.SignUpNow}
          onPress={this.signUp}
        />
      </View>
    )
  }
}
/*
const SimpleContact = (props) => {
  const number = props.number.toString(),
  styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      marginBottom: 5
    },
    label: {
      width: 100
    }
  })

  return (
    <View style={styles.wrapper}>
      <View style={styles.label}>
        <TextView fontSize='L' text={props.label} />
      </View>
      <TouchableOpacity onPress={() => Communications.phonecall({number}, true)}>
        <TextView fontSize='L' textColor={Graphics.textColors.mobileNumber} text={number} />
      </TouchableOpacity>
    </View>
  )
}
*/
/*

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


<Sidebar offsetY={64} visible={true} selectedIndex={this.state.selectedSectionIndex} onPress={(value) => this.scrollTo(value)} />

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
    foreground = Graphics.colors.midGray

  if (props.selected === true) {
    background = {backgroundColor: Graphics.colors.background, borderColor: Graphics.colors.primary },
    foreground = Graphics.colors.primary
  }

  return (
    <TouchableOpacity onPress={() => props.onPress(props.index)}>
      <View style={[binder.tab, background]}>
        <Svg scale={0.5} width="24" height="24" style={binder.icon}>
          <Path scale={0.5} fill={foreground} d={props.path}/>
        </Svg>
        <Text style={[binder.label, {color: foreground}]}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  )
}


const bind = StyleSheet.create({
  tab: {
    backgroundColor: 'transparent',
    borderLeftWidth: 4,
    borderColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 80,
    width: 80,
  },
  icon: {
    marginTop: 15,
    marginBottom: 10
  },
  label: {
    fontSize: 12,
  }
})
*/