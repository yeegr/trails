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
import * as eventsActions from '../../../redux/actions/eventsActions'

import InfoItem from '../shared/InfoItem'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  AppSettings,
  Graphics
} from '../../../../common/__'

class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.navToEvent = this.navToEvent.bind(this)
  }

  navToEvent() {
    this.props.navigator.push({
      id: 'EventDetail',
      title: LANG.t('event.EventDetail'),
      passProps: {
        id: this.props.event.id
      }
    })
  }

  render() {
    const {navigator, event, order} = this.props,
      dates = UTIL.formatEventGroupLabel(event, order.group)

    let contacts = []
    event.contacts.map((person) => {
      contacts.push(person.title)
    })

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
                <InfoItem label={LANG.t('event.Contacts')} value={contacts.join(', ')} />
              </View>
            </View>
            <View style={styles.detail.section}>
              <TextView class={'h2'} text={LANG.t('order.SignUpInfo')} />
              <View style={styles.detail.group}>
                {
                  order.signUps.map((signUp, index) => {
                    return (
                      <InfoItem
                        key={index}
                        align={'right'}
                        noColon={true}
                        label={signUp.name}
                        value={LANG.t('number.currency', {amount: signUp.cost})}
                        more={{
                          label: LANG.t('glossary.Detail'),
                          onPress: () => {
                            navigator.push({
                              id: 'OrderSummary',
                              title: LANG.t('order.OrderSummary'),
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
                <InfoItem label={LANG.t('order.SubTotal')} value={LANG.t('number.currency', {amount: order.subTotal})} />
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