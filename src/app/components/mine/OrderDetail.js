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
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../containers/actions/eventsActions'

import TextView from '../shared/TextView'
import InfoItem from '../shared/InfoItem'
import SimpleContact from '../shared/SimpleContact'
import {formatEventGroupLabel, getTimeFromId} from '../../../common'
import styles from '../../styles/main'

class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.navToEvent = this.navToEvent.bind(this)
  }

  navToEvent() {
    this.props.navigator.push({
      id: 'EventDetail',
      title: Lang.EventDetail,
      passProps: {
        id: this.props.event.id
      }
    })
  }

  render() {
    const event = this.props.event,
    order = this.props.order,
    dates = formatEventGroupLabel(event, order.group)

    return (
      <View style={styles.detail.wrapper}>
        <ScrollView style={{flex: 1, paddingTop: 64}}>
          <View style={styles.detail.article}>
            <View style={styles.detail.section}>
              <TextView class='h2' text={Lang.EventInfo} />
              <View style={styles.detail.group}>
                <InfoItem label={Lang.EventTitle} value={
                  <TouchableOpacity onPress={this.navToEvent}>
                    <TextView 
                      textColor={Graphics.textColors.link} 
                      text={event.title}
                    />
                  </TouchableOpacity>
                } />
                <InfoItem label={Lang.EventDates} value={dates} />
              </View>
            </View>
            <View style={styles.detail.section}>
              <TextView class='h2' text={Lang.SignUpInfo} />
              <View style={styles.detail.group}>
                {
                  order.signUps.map((signUp, index) => {
                    return (
                      <InfoItem
                        key={index}
                        align='right'
                        noColon={true}
                        label={signUp.name}
                        value={signUp.payment.toString() + Lang.Yuan}
                      />
                    )
                  })
                }
              </View>
            </View>
            <View style={styles.detail.section}>
              <TextView class='h2' text={Lang.OrderInfo} />
              <View style={styles.detail.group}>
                <InfoItem label={Lang.OrderId} value={order._id} />
                <InfoItem label={Lang.PayTime} value={getTimeFromId(order._id).format('YYYY-MM-DD HH:mm:ss')} />
                <InfoItem label={Lang.Total} value={order.total + Lang.Yuan} />
              </View>
            </View>
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)