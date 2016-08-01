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
  ListView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Svg, {
  Circle
} from 'react-native-svg'

import ParallaxView from 'react-native-parallax-view'
import RadioForm from 'react-native-simple-radio-button'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../containers/actions/eventsActions'

import Intro from '../shared/Intro'
import InfoItem from '../shared/InfoItem'
import CallToAction from '../shared/CallToAction'
import {formatTime, formatEndTime, calculateInsurance} from '../../../common'
import styles from '../../styles/main'

class EventPayment extends Component {
  constructor(props) {
    super(props)
    this.confirm = this.confirm.bind(this)

    this.state = {
      paymentMethods: [{label: Lang.Alipay, value: 0}, {label: Lang.WechatPay, value: 1}],
      paymentMethod: 0
    }
  }

  confirm() {
  }

  render() {
    const event = this.props.event,
      startDate = formatTime(event.gatherTime),
      endDate = formatEndTime(event.gatherTime, event.schedule.length)
      //deposit = (event.expenses.deposit) ? <InfoItem label={Lang.Deposit} value={event.expenses.deposit + Lang.Yuan} /> : null

    let total = 0
      
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
              <Text style={styles.detail.h2}>{Lang.SignUps}</Text>
              <View style={styles.detail.infoList}>
                {
                  this.props.signUps.map((signUp, index) => {
                    let payment = calculateInsurance(event, signUp)
                    total += payment

                    return (
                      <InfoItem key={index} label={signUp.realName} value={payment + Lang.Yuan} align="right" noColon={true} />
                    )
                  })
                }
              </View>
              <View style={{marginTop: 5}}>
                <InfoItem label={Lang.Total} value={total.toString() + Lang.Yuan} align="right" />
              </View>
            </View>
            <View style={styles.detail.section}>
              <Text style={styles.detail.h2}>{Lang.PaymentMethod}</Text>
              <View style={styles.editor.group}>
                {
                  this.state.paymentMethods.map((method, index) => {
                    return (
                      <TouchableOpacity 
                        key={index} 
                        onPress={() => this.setState({paymentMethod: method.value})}>
                        <View style={[styles.editor.link, {}]}>
                          <View style={styles.editor.label}>
                            <Text>{method.label}</Text>
                          </View>
                          <View style={styles.editor.value}>
                            <Text>{(method.value === this.state.paymentMethod).toString()}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>
          </View>
        </ParallaxView>
        <CallToAction
          backgroundColor={AppSettings.color.primary}
          label={Lang.Pay}
          onPress={this.confirm}
        />
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