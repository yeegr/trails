'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as ordersActions from '../../redux/actions/ordersActions'

import Loading from '../shared/Loading'
import OrderList from '../order/OrderList'

import {
  Graphics
} from '../../settings'

class MyOrders extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.ordersActions.listOrders(this.props.query)
  }

  render() {
    const {orders} = this.props

    if (orders.length < 1) {
      return <Loading />
    }

    return (
      <View style={{flex: 1, paddingTop: Graphics.page.marginTop}}>
        <OrderList
          navigator={this.props.navigator}
          orders={orders}
        />
      </View>
    )
  }
}

MyOrders.propTypes = {
  navigator: PropTypes.object.isRequired,
  ordersActions: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders)
