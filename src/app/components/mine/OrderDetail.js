'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../redux/actions/eventsActions'

import InfoItem from '../shared/InfoItem'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  UTIL,
  Lang,
  Graphics
} from '../../settings'

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
    dates = UTIL.formatEventGroupLabel(event, order.group)

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={{flex: 1, paddingTop: 64}}>
          <View style={styles.detail.article}>
            <View style={styles.detail.section}>
              <TextView class={'h2'} text={Lang.EventInfo} />
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
              <TextView class={'h2'} text={Lang.SignUpInfo} />
              <View style={styles.detail.group}>
                {
                  order.signUps.map((signUp, index) => {
                    return (
                      <InfoItem
                        key={index}
                        align={'right'}
                        noColon={true}
                        label={signUp.name}
                        value={signUp.cost.toString() + Lang.Yuan}
                      />
                    )
                  })
                }
              </View>
            </View>
            <View style={styles.detail.section}>
              <TextView class={'h2'} text={Lang.OrderInfo} />
              <View style={styles.detail.group}>
                <InfoItem label={Lang.OrderId} value={order._id} />
                <InfoItem label={Lang.PayTime} value={UTIL.getTimeFromId(order._id).format('YYYY-MM-DD HH:mm:ss')} />
                <InfoItem label={Lang.Total} value={order.subTotal + Lang.Yuan} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

OrderDetail.propTypes = {
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
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