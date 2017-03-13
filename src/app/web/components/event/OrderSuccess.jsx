'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {connect} from 'react-redux'

import InfoItem from '../shared/InfoItem'

import {
  UTIL,
  LANG,
  AppSettings
} from '../../settings'

class OrderSuccess extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {user, event, order} = this.props,
      dates = UTIL.formatEventGroupLabel(event, order.group)

    return (
      <div>
        <div>{JSON.stringify(user)}</div>
        <div>{JSON.stringify(event)}</div>
        <div>{dates}</div>
        <div>{JSON.stringify(order)}</div>
      </div>
    )
  }
}

OrderSuccess.propTypes = {
  routeParams: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    event: state.events.event,
    order: state.orders.order
  }
}

export default connect(mapStateToProps)(OrderSuccess)