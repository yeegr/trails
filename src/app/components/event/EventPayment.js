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
  Alert,
  ListView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'

import Svg, {
  Circle
} from 'react-native-svg'

import ParallaxView from 'react-native-parallax-view'
import RadioForm from 'react-native-simple-radio-button'
import {formatTime, formatEndTime} from '../../../common'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../containers/actions/eventsActions'

import Intro from '../shared/Intro'
import InfoItem from '../shared/InfoItem'
import CallToAction from '../shared/CallToAction'
import styles from '../../styles/main'

class EventPayment extends Component {
  constructor(props) {
    super(props)
    this.confirm = this.confirm.bind(this)
  }

  confirm() {
  }

  render() {
    const event = this.props.event,
      startDate = formatTime(event.gatherTime),
      endDate = formatEndTime(event.gatherTime, event.schedule.length)

      //deposit = (event.expenses.deposit) ? <InfoItem label={Lang.Deposit} value={event.expenses.deposit + Lang.Yuan} /> : null
      
    return(
      <View style={styles.detail.wrapper}>
        <ParallaxView style={{flex: 1}}
          ref='scrollView'
          backgroundSource={{uri: AppSettings.assetUri + event.hero}}
          windowHeight={240}
          header={(
            <Intro title={event.title} excerpt={event.excerpt} />
          )}>
          <View ref='scrollContent' style={{backgroundColor: AppSettings.color.background}}>
            <View style={styles.detail.section}>
              <Text style={styles.detail.h2}>{Lang.EventInfo}</Text>
              <InfoItem label={Lang.EventDates} value={startDate + '-' + endDate} />
              <InfoItem label={Lang.PerHead} value={event.expenses.perHead.toString() + Lang.Yuan} />
            </View>
            <View style={styles.detail.section}>
              <View style={styles.detail.group}>
                {
                  this.props.signUps.map((signUp, index) => {
                    return (
                      <Text key={index}>{signUp.realName}</Text>
                    )
                  })
                }
              </View>
            </View>
          </View>
        </ParallaxView>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 3}}>
          </View>
          <View style={{flex: 2}}>
            <CallToAction
              backgroundColor={AppSettings.color.primary}
              label={Lang.SignUp}
              onPress={this.confirm}
            />
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPayment)