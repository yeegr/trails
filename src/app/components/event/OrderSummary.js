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
  Lang
} from '../../settings'

const OrderSummary = (props) => {
  const {event, selectedGroup, signUp} = props,
    {payment} = signUp

  return (
    <View style={styles.global.wrapper}>
      <ScrollView style={styles.editor.scroll}>
        <View style={styles.detail.section}>
          <TextView class={'h2'} text={Lang.EventInfo} />
          <View style={styles.detail.group}>
            <InfoItem
              label={Lang.EventTitle}
              value={event.title}
            />
            <InfoItem
              label={Lang.EventDates}
              value={UTIL.formatEventGroupLabel(event, selectedGroup)}
            />
            <InfoItem
              label={Lang.SignUpPerson}
              value={signUp.name}
            />
          </View>
        </View>
        <View style={styles.detail.section}>
          <TextView class={'h2'} text={Lang.InsuranceExplicate} />
          <View style={styles.detail.group}>
            <InfoItem
              align={'right'}
              label={Lang.Insurance.BaseRate}
              value={payment.baseRate.toString() + Lang.Yuan}
            />
            <InfoItem
              align={'right'}
              labelWidth={240}
              label={Lang.Insurance.UserLevelCoef + '：' + Lang.userLevelArray[payment.userLevel]}
              noColon={true}
              value={payment.userLevelCoef.toString()}
            />
            <InfoItem
              align={'right'} 
              labelWidth={240}
              label={Lang.Insurance.TrailDifficultyCoef + '：' + payment.difficultyIndex + Lang.Level}
              noColon={true}
              value={payment.difficultyLevel.toString()}
            />
            <InfoItem
              align={'right'} 
              labelWidth={240}
              label={Lang.Insurance.EventDurationCoef + '：' + Lang.eventDurationArray[payment.durationIndex]}
              noColon={true}
              value={(payment.durationCoef * 100).toString() + '%'}
            />
            <InfoItem
              align={'right'} 
              labelWidth={240}
              label={Lang.Insurance.EventGroupSizeCoef + '：' + Lang.eventGroupSizeArray[payment.groupSizeIndex]}
              noColon={true}
              value={payment.groupSizeCoef.toString()}
            />
          </View>
          <InfoItem
            align={'right'} 
            label={Lang.InsuranceFee}
            noColon={true}
            value={payment.insurance.toString() + Lang.Yuan}
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