'use strict'

import React, {
  PropTypes
} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ordersActions from '../../redux/actions/ordersActions'

import InfoItem from '../shared/InfoItem'

import {
  UTIL,
  LANG
} from '../../settings'

const OrderSummary = (props) => {
  const {event, order} = props,
    selectedGroup = props.routeParams.selectedGroup,
    selectedSignUp = props.routeParams.selectedSignUp,
    signUp = order.signUps[selectedSignUp],
    {payment} = signUp

  return (
    <detail>
      <main>
        <section>
          <h2>{LANG.t('event.EventInfo')}</h2>
          <group>
            <InfoItem
              label={LANG.t('event.EventTitle')}
              value={event.title}
            />
            <InfoItem
              label={LANG.t('event.EventDates')}
              value={UTIL.formatEventGroupLabel(event, selectedGroup)}
            />
            <InfoItem
              label={LANG.t('order.SignUps')}
              value={signUp.name}
            />
          </group>
        </section>
        <section>
          <h2>{LANG.t('order.InsuranceExplicate')}</h2>
          <group>
            <InfoItem
              align={'right'}
              label={LANG.t('order.insurance.BaseRate')}
              value={LANG.t('number.web', {amount: payment.baseRate})}
            />
            <InfoItem
              align={'right'}
              labelWidth={240}
              label={LANG.t('order.insurance.UserLevelCoef', {level: LANG.t('user.levels.' + payment.userLevel)})}
              noColon={true}
              value={payment.userLevelCoef.toString()}
            />
            <InfoItem
              align={'right'} 
              labelWidth={240}
              label={LANG.t('order.insurance.TrailDifficultyCoef', {level: payment.difficultyIndex})}
              noColon={true}
              value={payment.difficultyLevel.toString()}
            />
            <InfoItem
              align={'right'} 
              labelWidth={240}
              label={LANG.t('order.insurance.EventDurationCoef', {days: LANG.t('order.insurance.EventDurationArray.' + payment.durationIndex)})}
              noColon={true}
              value={(payment.durationCoef * 100) + '%'}
            />
            <InfoItem
              align={'right'} 
              labelWidth={240}
              label={LANG.t('order.insurance.EventGroupSizeCoef', {size: LANG.t('order.insurance.EventGroupSizeArray.' + payment.groupSizeIndex)})}
              noColon={true}
              value={payment.groupSizeCoef.toString()}
            />
          </group>
        </section>
        <section>
          <list>
            <InfoItem
              align={'right'} 
              label={LANG.t('order.insurance.TotalFee')}
              noColon={true}
              value={LANG.t('number.web', {amount: payment.insurance})}
            />
          </list>
        </section>
      </main>
    </detail>
  )
}

OrderSummary.propTypes = {
  routeParams: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    event: state.events.event,
    order: state.orders.order
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ordersActions: bindActionCreators(ordersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)
