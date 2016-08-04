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
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../containers/actions/eventsActions'

import Intro from '../shared/Intro'
import InfoItem from '../shared/InfoItem'
import TextView from '../shared/TextView'
import Icon from '../shared/Icon'
import CallToAction from '../shared/CallToAction'
import {formatTime, formatEndTime, calculateInsurance} from '../../../common'
import styles from '../../styles/main'

class EventPayment extends Component {
  constructor(props) {
    super(props)
    this.confirm = this.confirm.bind(this)

    this.state = {
      //paymentMethods: [{label: Lang.Alipay, value: 0}, {label: Lang.WechatPay, value: 1}],
      paymentMethods: [{label: Lang.Alipay, value: 0}],
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
          backgroundSource={{uri: AppSettings.assetUri + event.hero}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
              align='bottom'
              title={event.title}
              excerpt={event.excerpt}
            />
          )}>
          <View style={{backgroundColor: Graphics.colors.background}}>
            <View style={styles.detail.section}>
              <TextView class='h2' text={Lang.EventInfo} />
              <InfoItem label={Lang.EventDates} value={startDate + '-' + endDate} />
              <InfoItem label={Lang.PerHead} value={event.expenses.perHead.toString() + Lang.Yuan} />
            </View>
            <View style={styles.detail.section}>
              <TextView class='h2' text={Lang.SignUps} />
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
              <TextView class='h2' text={Lang.PaymentMethod} />
              <View style={styles.editor.group}>
                {
                  this.state.paymentMethods.map((method, index) => {
                    const checkmark = (method.value === this.state.paymentMethod) ? (
                      <Icon 
                        backgroundColor={Graphics.colors.transparent} 
                        fillColor={Graphics.colors.primary} 
                        sideLength='36'
                        type='checkmark'
                      />
                    ) : null

                    return (
                      <TouchableOpacity 
                        key={index} 
                        onPress={() => this.setState({paymentMethod: method.value})}>
                        <View style={[styles.editor.link, {}]}>
                          <View style={styles.editor.label}>
                            <TextView text={method.label} />
                          </View>
                          <View style={styles.editor.value}>
                            {checkmark}
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
          backgroundColor={Graphics.colors.primary}
          label={Lang.Confirm}
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