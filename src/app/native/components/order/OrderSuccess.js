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

import InfoItem from '../shared/InfoItem'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  UTIL,
  LANG,
  Lang,
  AppSettings,
  Graphics
} from '../../settings'

class OrderSuccess extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {event, order, navigator} = this.props,
      dates = UTIL.formatEventGroupLabel(event, order.group)

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={{flex: 1, paddingTop: 64}}>
          <View style={styles.detail.article}>
            <View style={styles.detail.section}>
              <TextView class={'h2'} text={LANG.t('event.EventInfo')} />
              <View style={styles.detail.group}>
                <InfoItem label={LANG.t('event.EventTitle')} value={
                  <TouchableOpacity onPress={this.navToEvent}>
                    <TextView 
                      textColor={Graphics.textColors.link} 
                      text={event.title}
                    />
                  </TouchableOpacity>
                } />
                <InfoItem label={LANG.t('event.EventDates')} value={dates} />
              </View>
            </View>
            <View style={styles.detail.section}>
              <TextView class={'h2'} text={LANG.t('order.SignUpInfo')} />
              <View style={styles.detail.group}>
              {
                order.signUps.map((signUp, index) => {
                  let payment = UTIL.calculateInsurance(event, signUp)
                  signUp.payment = payment
                  signUp.cost = payment.cost

                  return (
                    <InfoItem
                      key={index}
                      align={'right'}
                      noColon={true}
                      label={signUp.name}
                      value={payment.cost.toString() + Lang.Yuan}
                      more={{
                        label: Lang.Detail,
                        onPress: () => {
                          navigator.push({
                            id: 'OrderSummary',
                            title: Lang.OrderSummary,
                            passProps: {
                              event,
                              selectedGroup: order.group,
                              signUp
                            }
                          })
                        }
                      }}
                    />
                  )
                })
              }
              </View>
            </View>
            <View style={styles.detail.section}>
              <TextView class={'h2'} text={LANG.t('order.OrderInfo')} />
              <View style={styles.detail.group}>
                <InfoItem label={LANG.t('order.OrderId')} value={order._id} />
                <InfoItem label={LANG.t('order.PayTime')} value={UTIL.getTimeFromId(order._id).format(AppSettings.defaultDateTimeFormat)} />
                <InfoItem label={LANG.t('order.TotalCost')} value={order.subTotal + Lang.Yuan} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

OrderSuccess.propTypes = {
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

/*
function mapDispatchToProps(dispatch) {
  return {
  }
}
*/

export default connect(mapStateToProps)(OrderSuccess)