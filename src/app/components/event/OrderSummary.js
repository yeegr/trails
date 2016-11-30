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
  LANG,
  Lang
} from '../../settings'

const OrderSummary = (props) => {
  const {event, selectedGroup, signUp} = props,
  {payment} = signUp

  return (
    <View style={styles.global.wrapper}>
      <ScrollView style={styles.editor.scroll}>
        <View style={styles.detail.section}>
          <TextView class={'h2'} text={LANG.t('event.EventInfo')} />
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
              label={LANG.t('order.SignUpPerson')}
              value={signUp.name}
            />
          </View>
        </View>
        <View style={styles.detail.section}>
          <TextView class={'h2'} text={Lang.InsuranceExplicate} />
          <View style={styles.detail.group}>
            <InfoItem
              align={'right'}
              label={LANG.t('order.insurance.BaseRate')}
              value={LANG.l('currency', payment.baseRate)}
            />
            <InfoItem
              align={'right'}
              labelWidth={240}
              label={LANG.t('order.insurance.UserLevelCoef') + '：' + Lang.userLevelArray[payment.userLevel]}
              noColon={true}
              value={LANG.l('currency', payment.userLevelCoef)}
            />
            <InfoItem
              align={'right'} 
              labelWidth={240}
              label={LANG.t('order.insurance.TrailDifficultyCoef') + '：' + payment.difficultyIndex + Lang.Level}
              noColon={true}
              value={LANG.l('currency', payment.difficultyLevel)}
            />
            <InfoItem
              align={'right'} 
              labelWidth={240}
              label={LANG.t('order.insurance.EventDurationCoef') + '：' + Lang.eventDurationArray[payment.durationIndex]}
              noColon={true}
              value={LANG.l('percent', payment.durationCoef)}
            />
            <InfoItem
              align={'right'} 
              labelWidth={240}
              label={LANG.t('order.insurance.EventGroupSizeCoef') + '：' + Lang.eventGroupSizeArray[payment.groupSizeIndex]}
              noColon={true}
              value={payment.groupSizeCoef.toString()}
            />
          </View>
          <InfoItem
            align={'right'} 
            label={LANG.t('order.insurance.TotalFee')}
            noColon={true}
            value={LANG.l('currency', payment.insurance)}
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