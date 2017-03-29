'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ScrollView,
  View,
} from 'react-native'

import InfoItem from '../shared/InfoItem'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  UTIL,
  LANG
} from '../../../../common/__'

const OrderSummary = (props) => {
  const {event, selectedGroup, signUp} = props,
  {payment} = signUp

  return (
    <View style={styles.global.wrapper}>
      <ScrollView style={styles.editor.scroll}>
        <View style={styles.detail.section}>
          <TextView
            class={'h2'}
            text={LANG.t('event.EventInfo')}
          />
          <View style={styles.detail.group}>
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
          </View>
        </View>
        <View style={styles.detail.section}>
          <TextView
            class={'h2'}
            text={LANG.t('order.InsuranceExplicate')}
          />
          <View style={styles.detail.group}>
            <InfoItem
              align={'right'}
              label={LANG.t('order.insurance.BaseRate')}
              value={LANG.t('number.currency', {amount: payment.baseRate})}
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
          </View>
        </View>
        <View style={styles.detail.section}>
          <InfoItem
            align={'right'} 
            label={LANG.t('order.insurance.TotalFee')}
            noColon={true}
            value={LANG.t('number.currency', {amount: payment.insurance})}
          />
        </View>
      </ScrollView>
    </View>
  )
}

OrderSummary.propTypes = {
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  selectedGroup: PropTypes.number.isRequired,
  signUp: PropTypes.object.isRequired
}

export default OrderSummary