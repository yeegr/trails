'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  View,
} from 'react-native'

import Alipay from 'react-native-yunpeng-alipay'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginActions from '../../redux/actions/loginActions'
import * as eventsActions from '../../redux/actions/eventsActions'

import InfoItem from '../shared/InfoItem'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  UTIL,
  Lang,
  AppSettings
} from '../../settings'

class PayCountdown extends Component {
  constructor(props) {
    super(props)
    this.startCountdown = this.startCountdown.bind(this)
    this.pay = this.pay.bind(this)
    this.nextStep = this.nextStep.bind(this)

    this.state = {
      timer: AppSettings.payTimeout
    }
  }

  componentWillMount() {
    this.props.loginActions.reloadUser(this.props.order.creator)
  }

  componentDidMount() {
    this.startCountdown()
    this.pay(this.props.order)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order) {
      let order = nextProps.order

      switch (order.status) {
        case 'accepted':
          this.nextStep(order)
        break
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  startCountdown() {
    let counter = this.state.timer

    this.timerInterval = setInterval(() => {
      counter--
      this.setState({timer: counter})
    }, 1000)
  }

  pay(order) {
    console.log(order.alipay)

    Alipay
    .pay(order.alipay)
    .then((data) => {
      console.log(data)
    }, (err) => {
      console.log(err)
    })
  }

  nextStep(order) {
    let {event, navigator} = this.props,
      stack = navigator.getCurrentRoutes()

    stack.splice(2, stack.length - 3)
    navigator.immediatelyResetRouteStack(stack)

    setTimeout(() => {
      navigator.replace({
        id: 'OrderDetail',
        title: Lang.OrderDetail,
        passProps: {
          event,
          order
        }
      })
    }, 0)

  }

  render() {
    const {order} = this.props

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <TextView text={UTIL.formatSeconds(this.state.timer)} />
        </ScrollView>
      </View>
    )
  }
}

PayCountdown.propTypes = {
  navigator: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  eventsActions: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayCountdown)
