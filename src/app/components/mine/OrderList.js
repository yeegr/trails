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
import {bindActionCreators} from 'redux'
import * as ordersActions from '../../containers/actions/ordersActions'

import Loading from '../shared/Loading'
import TextView from '../shared/TextView'
import InfoItem from '../shared/InfoItem'
import {formatEventGroupLabel, getTimeFromId} from '../../../common'
import styles from '../../styles/main'

class OrderList extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })
    this.renderRow = this.renderRow.bind(this)
    this.selectOrder = this.selectOrder.bind(this)
  }

  selectOrder(order) {
    this.props.navigator.push({
      id: 'OrderDetail',
      title: Lang.OrderDetail,
      passProps: {
        order,
        event: order.event
      }
    })
  }

  renderRow(order, sectionId, rowId) {
    const {event} = order,
    dates = formatEventGroupLabel(event, order.group),
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
      <TouchableOpacity key={rowId} onPress={() => this.selectOrder(order)}>
        <View style={styles.list.item}>
          <Image
            style={styles.list.thumb}
            source={{uri: AppSettings.assetUri + event.hero}}
          />
          <View style={styles.list.content}>
            <View style={styles.list.title}>
              <TextView
                style={{fontWeight: 'bold'}}
                fontSize='L'
                text={event.title} 
              />
              <TextView
                textColor={Graphics.textColors.endnote}
                text={dates} 
              />
            </View>
            <View>
              <InfoItem styles={infoStyles} label={Lang.SignUps} value={names.join('，')} />
              <InfoItem styles={infoStyles} label={Lang.Total} value={order.total + Lang.Yuan} />
              <InfoItem styles={infoStyles} label={Lang.PayTime} value={getTimeFromId(order._id).format('YYYY-MM-DD HH:mm:ss')} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  componentDidMount() {
    this.props.ordersActions.listOrders({
      creator: this.props.user.id
    })
  }

  render() {
    const {orders} = this.props

    if (!orders) {
      return <Loading />
    }

    return (
      <ListView
        enableEmptySections={true}
        scrollEnabled={false}
        dataSource={this.dataSource.cloneWithRows(orders)}
        renderRow={this.renderRow}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    orders: state.orders.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ordersActions: bindActionCreators(ordersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
