'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as ordersActions from '../../redux/actions/ordersActions'

import Loading from '../shared/Loading'
import OrderList from '../shared/OrderList'

import {
  AppSettings
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
      <OrderList
        navigator={this.props.navigator}
        orders={orders}
      />
    )
  }
}

MyOrders.propTypes = {
  navigator: PropTypes.object.isRequired,
  ordersActions: PropTypes.object.isRequired
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
