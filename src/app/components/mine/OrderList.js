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

import {connect} from 'react-redux'

import ImagePath from '../shared/ImagePath'
import InfoItem from '../shared/InfoItem'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  CONSTANTS,
  UTIL,
  Lang,
  Graphics
} from '../../settings'

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
    dates = UTIL.formatDateSpan(order.startDate, order.daySpan),
    infoStyles = {
      wrapper: {
        paddingLeft: 0,
        paddingVertical: 0
      }
    }, 
    names = [],
    heroUri = ImagePath({type: 'thumb', path: CONSTANTS.ASSET_FOLDERS.Event + '/' + event._id + '/' + event.hero})

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
              <InfoItem styles={infoStyles} labelWidth={75} label={Lang.SignUps} value={names.join('，')} />
              <InfoItem styles={infoStyles} labelWidth={75} label={Lang.Total} value={order.total + Lang.Yuan} />
              <InfoItem styles={infoStyles} labelWidth={75} label={Lang.PayTime} value={UTIL.getTimeFromId(order._id).format('YYYY-MM-DD HH:mm:ss')} />
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

OrderList.propTypes = {
  navigator: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps)(OrderList)
