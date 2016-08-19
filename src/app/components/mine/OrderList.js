'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Image,
  ListView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'

import Loading from '../shared/Loading'
import TextView from '../shared/TextView'
import InfoItem from '../shared/InfoItem'
import {formatEventGroupLabel, formatDateSpan, getTimeFromId} from '../../../util/common'
import styles from '../../styles/main'

const OrderList = (props) => {
  const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  }),

  selectOrder = (order) => {
    props.navigator.push({
      id: 'OrderDetail',
      title: Lang.OrderDetail,
      passProps: {
        event: order.event,
        order
      }
    })
  },

  renderRow = (order, sectionId, rowId) => {
    const {event} = order,
    dates = formatDateSpan(order.startDate, order.daySpan),
    infoStyles = {
      wrapper: {
        paddingLeft: 0,
        paddingVertical: 0
      }
    }, 
    names = []

    order.signUps.map((signUp) => {
      names.push(signUp.name)
    })

    return (
      <TouchableOpacity key={rowId} onPress={() => selectOrder(order)}>
        <View style={[styles.list.item, styles.list.borders]}>
          <Image
            style={styles.list.thumb}
            source={{uri: AppSettings.assetUri + order.hero}}
          />
          <View style={styles.list.content}>
            <View style={styles.list.title}>
              <TextView
                style={{fontWeight: '400', marginBottom: 2}}
                fontSize='L'
                text={order.title} 
              />
              <TextView
                textColor={Graphics.textColors.endnote}
                text={dates} 
              />
            </View>
            <View>
              <InfoItem styles={infoStyles} labelWidth={75} label={Lang.SignUps} value={names.join('，')} />
              <InfoItem styles={infoStyles} labelWidth={75} label={Lang.Total} value={order.total + Lang.Yuan} />
              <InfoItem styles={infoStyles} labelWidth={75} label={Lang.PayTime} value={getTimeFromId(order._id).format('YYYY-MM-DD HH:mm:ss')} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  },

  {orders} = props.user

  return (
    <ListView
      enableEmptySections={true}
      scrollEnabled={false}
      dataSource={dataSource.cloneWithRows(orders)}
      renderRow={renderRow}
    />
  )
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps)(OrderList)
