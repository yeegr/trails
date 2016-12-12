'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Image,
  ListView,
  TouchableOpacity,
  View
} from 'react-native'

import ImagePath from '../shared/ImagePath'
import InfoItem from '../shared/InfoItem'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  CONSTANTS,
  LANG,
  UTIL,
  Graphics
} from '../../settings'

const OrderList = (props) => {
  const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  }),

  selectOrder = (order) => {
    props.navigator.push({
      id: 'OrderDetail',
      title: LANG.t('order.OrderDetail'),
      passProps: {
        event: order.event,
        order
      }
    })
  },

  renderRow = (order, sectionId, rowId) => {
    const {event} = order,
    dates = UTIL.formatDateSpan(order.startDate, order.daySpan),
    infoStyles = {
      wrapper: {
        paddingLeft: 0,
        paddingVertical: 0
      }
    }, 
    names = [],
    heroUri = ImagePath({type: 'thumb', path: CONSTANTS.CONSTANTS.ASSET_FOLDERS.EVENT + '/' + event._id + '/' + event.hero})

    order.signUps.map((signUp) => {
      names.push(signUp.name)
    })

    return (
      <TouchableOpacity key={rowId} onPress={() => selectOrder(order)}>
        <View style={[styles.list.item, styles.list.borders]}>
          <Image
            style={styles.list.thumb}
            source={{uri: heroUri}}
          />
          <View style={styles.list.content}>
            <View style={styles.list.title}>
              <TextView
                style={{fontWeight: '400', marginBottom: 2}}
                fontSize={'L'}
                text={order.title} 
              />
              <TextView
                textColor={Graphics.textColors.endnote}
                text={dates} 
              />
            </View>
            <View>
              <InfoItem styles={infoStyles} labelWidth={75} label={LANG.t('order.SignUps')} value={names.join('，')} />
              <InfoItem styles={infoStyles} labelWidth={75} label={LANG.t('order.Total')} value={LANG.l('currency', order.subTotal)} />
              <InfoItem styles={infoStyles} labelWidth={75} label={LANG.t('order.PayTime')} value={UTIL.getTimeFromId(order._id).format('YYYY-MM-DD HH:mm:ss')} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ListView
      enableEmptySections={true}
      scrollEnabled={false}
      dataSource={dataSource.cloneWithRows(props.orders)}
      renderRow={renderRow}
      onEndReached={() => console.log('ended')}
    />
  )
}

OrderList.propTypes = {
  navigator: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired
}

export default OrderList
