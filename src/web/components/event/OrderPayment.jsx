'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  hashHistory,
  Link
} from 'react-router'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as ordersActions from '../../redux/actions/ordersActions'

import CallToAction from '../shared/CallToAction'
import Card from '../shared/Card'
import Hero from '../shared/Hero'
import InfoItem from '../shared/InfoItem'

import {
  CONSTANTS,
  LANG,
  UTIL,
  AppSettings
} from '../../settings'

class OrderPayment extends Component {
  constructor(props) {
    super(props)
    this._confirm = this._confirm.bind(this)
    this._pay = this._pay.bind(this)

    this.state = {
      paymentMethod: AppSettings.defaultPaymentMethod
    }
  }

  componentWillReceiveProps(nextProps) {
    let {order} = nextProps

    if (order !== null && order.subTotal > 0 && order.status === 'pending') {
      this._pay(order)
    } else if (order !== null && order.status === 'success') {
      hashHistory.push(`events/${this.props.event._id}/${this.props.routeParams.selectedGroup}/success`)
    }
  }

  _confirm(subTotal) {
    subTotal = (subTotal > 0) ? 0.02 : subTotal

    let {user, event} = this.props,
      {selectedGroup} = this.props.routeParams,
      order = {
        type: CONSTANTS.ORDER_TYPES.WEB,
        creator: user.id,
        event: event.id,
        group: selectedGroup,
        title: event.title,
        body: UTIL.formatEventGroupLabel(event, selectedGroup),
        hero: event.hero,
        startDate: event.groups[selectedGroup].startDate,
        daySpan: event.schedule.length, 
        method: this.state.paymentMethod,
        signUps: this.props.order.signUps,
        subTotal,
        status: (subTotal === 0) ? 'success' : 'pending'
      }

    this.props.ordersActions.createOrder(order)
  }

  _pay(order) {
    let {method} = order,
      url = CONSTANTS.PAY_REQUEST_URLS[method] + order[method]

    console.log(url)

    //document.location = url
  }

  render() {
    const {event, order} = this.props,
      selectedGroup = this.props.routeParams.selectedGroup,
      imagePath = (event.hero.indexOf('default/') === 0) ? event.hero : event._id + '/' + event.hero,
      imageUri = CONSTANTS.ASSET_FOLDERS.EVENT + '/' + imagePath,
      dates = UTIL.formatEventGroupLabel(event, selectedGroup)

    let subTotal = 0

    return (
      <detail>
        <Hero
          imageUri={imageUri}
          card={
            <Card
              title={event.title}
              excerpt={event.excerpt}
              tags={event.tags}
            />
          }
        />
        <main>
          <section>
            <h2>{LANG.t('event.EventInfo')}</h2>
            <group>
              <InfoItem
                label={LANG.t('event.EventDates')}
                value={dates}
              />
              <InfoItem
                label={LANG.t('event.PerHead')}
                value={LANG.t('number.web', {amount: event.expenses.perHead})}
              />
            </group>
          </section>
          <section>
            <h2>{LANG.t('order.SignUps')}</h2>
            <group>
            {
              order.signUps.map((signUp, index) => {
                let payment = UTIL.calculateInsurance(event, signUp)
                signUp.payment = payment
                signUp.cost = payment.cost
                subTotal += payment.cost

                return (
                  <InfoItem
                    key={index}
                    align={'right'}
                    noColon={true}
                    label={signUp.name}
                    value={LANG.t('number.web', {amount: payment.cost})}
                    more={
                      <Link className="detail" to={`events/${event._id}/${selectedGroup}/signups/${index}`}>
                        {LANG.t('order.Detail')}
                      </Link>
                    }
                  />
                )
              })
            }
            </group>
          </section>
          <section>
            <list>
              <InfoItem
                align={'right'} 
                label={LANG.t('order.SubTotal')}
                value={LANG.t('number.web', {amount: subTotal})}
                more={
                  <div className="detail">
                    &emsp;&emsp;
                  </div>
                }
              />
            </list>
          </section>
        </main>
        <CallToAction
          onPress={() => this._confirm(subTotal)}
          label={LANG.t('order.ConfirmOrder')}
        />
      </detail>
    )
  }
}

OrderPayment.propTypes = {
  routeParams: PropTypes.object.isRequired,
  ordersActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  order: PropTypes.object,
  signUps: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    event: state.events.event,
    order: state.orders.order
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ordersActions: bindActionCreators(ordersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPayment)
