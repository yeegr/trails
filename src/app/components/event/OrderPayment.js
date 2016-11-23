'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  TouchableOpacity,
  View,
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as ordersActions from '../../redux/actions/ordersActions'

import CallToAction from '../shared/CallToAction'
import ImagePath from '../shared/ImagePath'
import Icon from '../shared/Icon'
import InfoItem from '../shared/InfoItem'
import Intro from '../shared/Intro'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  CONSTANTS,
  UTIL,
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

class OrderPayment extends Component {
  constructor(props) {
    super(props)
    this.confirm = this.confirm.bind(this)

    this.state = {
      signUps: this.props.signUps,
      paymentMethod: AppSettings.defaultPaymentMethod,
      total: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.order === null && nextProps.order !== null && nextProps.order.status === 'pending') {
      let order = nextProps.order

      this.props.navigator.push({
        id: 'PayCountdown',
        title: Lang.PayCountdown,
        passProps: {
          event: this.props.event,
          order
        }
      })
    }
  }

  componentWillUnmount() {
    this.props.ordersActions.resetOrder()
  }

  confirm(subTotal) {
    let {user, event, selectedGroup} = this.props,
      order = {
      creator: user.id,
      event: event.id,
      group: selectedGroup,
      title: event.title,
      body: UTIL.formatEventGroupLabel(event, selectedGroup),
      hero: event.hero,
      startDate: event.groups[selectedGroup].startDate,
      daySpan: event.schedule.length, 
      method: this.state.paymentMethod,
      signUps: this.state.signUps,
      subTotal: 0.02 
    }

    this.props.ordersActions.createOrder(order)
  }

  render() {
    const {event, navigator} = this.props,
      eventBackgroundUrl = ImagePath({type: 'background', path: CONSTANTS.ASSET_FOLDERS.Event + '/' + event._id + '/' + event.hero}),
      selectedGroup = this.props.selectedGroup,
      dates = UTIL.formatEventGroupLabel(event, selectedGroup)
      //deposit = (event.expenses.deposit) ? <InfoItem label={Lang.Deposit} value={event.expenses.deposit + Lang.Yuan} /> : null

    const paymentMethodSelector = (event.expenses.perHead > 0) ? (
      <View style={styles.detail.section}>
        <TextView class={'h2'} text={Lang.PaymentMethod} />
        <View style={styles.editor.group}>
        {
          AppSettings.paymentMethods.map((method, index) => {
            const checkmark = (method.value === this.state.paymentMethod) ? (
              <Icon 
                backgroundColor={Graphics.colors.transparent} 
                fillColor={Graphics.colors.primary} 
                sideLength={36}
                type={'checkmark'}
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
    ) : null

    let total = 0

    return(
      <View style={styles.global.wrapper}>
        <ParallaxView
          backgroundSource={{uri: eventBackgroundUrl}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
              align={'bottom'}
              title={event.title}
              excerpt={event.excerpt}
            />
          )}>
          <View style={styles.detail.article}>
            <View style={styles.detail.section}>
              <TextView class={'h2'} text={Lang.EventInfo} />
              <View style={styles.detail.group}>
                <InfoItem label={Lang.EventDates} value={dates} />
                <InfoItem label={Lang.PerHead} value={event.expenses.perHead.toString() + Lang.Yuan} />
              </View>
            </View>
            <View style={styles.detail.section}>
              <TextView class={'h2'} text={Lang.SignUps} />
              <View style={[styles.detail.group, {marginBottom: 0}]}>
                {
                  this.state.signUps.map((signUp, index) => {
                    let payment = UTIL.calculateInsurance(event, signUp)
                    signUp.payment = payment
                    signUp.cost = payment.cost
                    total += payment.cost

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
                                selectedGroup,
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
              <View style={{marginTop: 5}}>
                <InfoItem
                  align={'right'} 
                  label={Lang.Total}
                  value={UTIL.formatCurrency(total).toString() + Lang.Yuan}
                  more={{label: '　　'}}
                />
              </View>
            </View>
            {paymentMethodSelector}
          </View>
        </ParallaxView>
        <CallToAction
          backgroundColor={Graphics.colors.primary}
          label={Lang.Confirm}
          onPress={() => this.confirm(total)}
        />
      </View>
    )
  }
}

OrderPayment.propTypes = {
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  selectedGroup: PropTypes.number.isRequired,
  signUps: PropTypes.array.isRequired,
  order: PropTypes.object,
  ordersActions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    order: state.orders.order
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ordersActions: bindActionCreators(ordersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPayment)