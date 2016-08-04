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

import InfoItem from '../shared/InfoItem'
import TextView from '../shared/TextView'
import {formatEventGroupLabel} from '../../../common'
import styles from '../../styles/main'

class OrderDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const event = this.props.event,
      order = this.props.order,
      dates = formatEventGroupLabel(event, order.group)

    return (
      <View style={styles.detail.wrapper}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.detail.article}>
            <View style={styles.detail.section}>
              <TextView class='h2' text={Lang.EventInfo} />
              <InfoItem label={Lang.EventTitle} value={event.title} />
              <InfoItem label={Lang.EventDates} value={dates} />
              <InfoItem label={Lang.Contacts} value={dates} />
            </View>
            <View style={styles.detail.section}>
              <TextView class='h2' text={Lang.SignUpInfo} />
                {
                  order.signUps.map((signUp, index) => {
                    <infoItem key={index} label={signUp.name} value={signUp.payment} />
                  })
                }
            </View>
          
            <View>
              <TextView text={'order id: ' + this.props.order._id} />
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