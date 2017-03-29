'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {Link} from 'react-router'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ordersActions from '../../../redux/actions/ordersActions'

import InfoItem from '../shared/InfoItem'

import {
  UTIL,
  LANG,
  AppSettings
} from '../../../../common/__'

class OrderSuccess extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.ordersActions.getOrder(this.props.routeParams.id)
  }

  render() {
    const {order} = this.props

    if (UTIL.isNullOrUndefined(order)) {
      return (
        <detail data-loading />
      )
    }

    const event = order.event,
      dates = UTIL.formatEventGroupLabel(event, order.group)

    return (
      <detail>
        <scroll>
          <main>
            <section>
              <h2>{LANG.t('event.EventInfo')}</h2>
              <group>
                <InfoItem
                  label={LANG.t('event.EventTitle')}
                  value={
                    <Link to={`events/{event._id}`}>
                      {event.title}
                    </Link>
                  }
                />
                <InfoItem
                  label={LANG.t('event.EventDates')}
                  value={dates}
                />
              </group>
            </section>
            <section>
              <group>
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
                        value={payment.cost.toString() + LANG.t('number.currency_postfix')}
                        more={{
                          label: LANG.t('order.Detail')
                        }}
                      />
                    )
                  })
                }
              </group>
            </section>
            <section>
              <h2>{LANG.t('order.OrderInfo')}</h2>
              <group>
                <InfoItem
                  label={LANG.t('order.OrderId')}
                  value={order._id}
                />
                <InfoItem
                  label={LANG.t('order.PayTime')}
                  value={UTIL.getTimeFromId(order._id).format(AppSettings.defaultDateTimeFormat)}
                />
                <InfoItem
                  label={LANG.t('order.TotalCost')}
                  value={order.subTotal.toString() + LANG.t('number.currency_postfix')}
                />
              </group>
            </section>
          </main>
        </scroll>
      </detail>
    )
  }
}

OrderSuccess.propTypes = {
  ordersActions: PropTypes.object.isRequired,
  order: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccess)
