'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {Link} from 'react-router'

import qr from 'qr-image'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as ordersActions from '../../../redux/actions/ordersActions'

import CallToAction from '../shared/CallToAction'
import Inset from '../shared/Inset'
import Hero from '../shared/Hero'
import InfoItem from '../shared/InfoItem'
import Selectable from '../shared/Selectable'

import {
  CONSTANTS,
  LANG,
  UTIL,
  AppSettings
} from '../../../../common/__'

class OrderPayment extends Component {
  constructor(props) {
    super(props)
    this._confirm = this._confirm.bind(this)

    this.state = {
      signUps: this.props.signUps,
      paymentMethod: AppSettings.defaultPaymentMethod,
      isPaying: false,
      showQRCode: false
    }
  }

  componentWillReceiveProps(nextProps) {
    let {order} = nextProps

    if (order && order.subTotal > 0 && order.status === 'pending' && !UTIL.isNullOrUndefined(order.method)) {
      let {method} = order

      if (order[method]) {
        switch (method) {
          case 'Alipay':
            // open Alipay url
            document.location = CONSTANTS.PAY_REQUEST_URLS[method] + order[method]
          break

          case 'WeChatPay':
            // display WeChatPay prepay QRCode
            this.setState({showQRCode: true})
          break
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.ordersActions.resetOrder()
  }

  _confirm(subTotal) {
    this.setState({isPaying: true})

    subTotal = (subTotal > 0) ? 0.02 : subTotal

    let {user, event} = this.props,
      {selectedGroup} = this.props.routeParams,
      order = {
        type: CONSTANTS.ORDER_TYPES.SIGNUP,
        channel: CONSTANTS.ORDER_CHANNELS.WEB,
        creator: user.id,
        event: event.id,
        group: selectedGroup,
        title: event.title,
        body: UTIL.formatEventGroupLabel(event, selectedGroup),
        hero: event.hero,
        startDate: event.groups[selectedGroup].startDate,
        daySpan: event.schedule.length, 
        method: this.state.paymentMethod,
        signUps: this.props.order.signUps,
        subTotal,
        status: (subTotal === 0) ? 'success' : 'pending'
      }

    this.props.ordersActions.createOrder(order)
  }

  render() {
    const {event, order} = this.props,
      selectedGroup = this.props.routeParams.selectedGroup,
      imagePath = (event.hero.indexOf('default/') === 0) ? event.hero : event._id + '/' + event.hero,
      imageUri = CONSTANTS.ASSET_FOLDERS.EVENT + '/' + imagePath,
      dates = UTIL.formatEventGroupLabel(event, selectedGroup)

    let subTotal = 0,
      url = null,
      png = null,
      qrImage = null

    const paymentMethodSelector = (event.expenses.perHead > 0) ? (
      <section>
        <h2>{LANG.t('order.SelectPaymentMethod')}</h2>
        <group>
        {
          AppSettings.paymentMethods.map((method, index) => {
            return (
              <Selectable
                key={index}
                icon={method.value}
                label={method.label}
                value={method.value === this.state.paymentMethod}
                onPress={() => this.setState({paymentMethod: method.value})}
              />
            )
          })
        }
        </group>
      </section>
    ) : null

    if (this.state.showQRCode && order) {
      switch (order.method) {
        case 'Alipay':
          url = CONSTANTS.PAY_REQUEST_URLS.Alipay + order.Alipay
          png = qr.imageSync(url, {size: 2, margin: 10, type: 'png'})
        break

        case 'WeChatPay':
          url = order[order.method].codeUrl
          png = qr.imageSync(url, {size: 10, margin: 2, type: 'png'})
        break
      }

      const src = "data:image/png;base64," + png.toString('base64'),
        img = (
          <img src={src} />
        )
      /*
        vector = qr.svgObject(prepay.codeUrl, {type: 'svg'}),
        {path, size} = vector,
        height = (size * 10) + 'px',
        width = height,
        svg = (
          <svg viewBox={`0 0 ${size} ${size}`} style={{height, width}}>
            <path d={vector.path} />
          </svg>
        )
      */

      qrImage = (
        <section>
          <center>
            {img}
          </center>
        </section>
      )
    }

    return (
      <detail ref={(el) => (this.instance = el)}>
        <scroll>
          <Hero
            imageUri={imageUri}
            inset={
              <Inset
                title={event.title}
                excerpt={event.excerpt}
                tags={event.tags}
              />
            }
          />
          <main>
            <section>
              <h2>{LANG.t('event.EventInfo')}</h2>
              <group>
                <InfoItem
                  label={LANG.t('event.EventDates')}
                  value={dates}
                />
                <InfoItem
                  label={LANG.t('event.PerHead')}
                  value={LANG.t('number.currency', {amount: event.expenses.perHead})}
                />
              </group>
            </section>
            <section />
            <section>
              <h2>{LANG.t('order.SignUps')}</h2>
              <group>
              {
                order.signUps.map((signUp, index) => {
                  let payment = UTIL.calculateInsurance(event, signUp)
                  signUp.payment = payment
                  signUp.cost = payment.cost
                  subTotal += payment.cost

                  return (
                    <InfoItem
                      key={index}
                      align={'right'}
                      noColon={true}
                      label={signUp.name}
                      value={LANG.t('number.currency', {amount: payment.cost})}
                      more={
                        <Link className="detail" to={`events/${event._id}/${selectedGroup}/signups/${index}`}>
                          {LANG.t('order.Detail')}
                        </Link>
                      }
                    />
                  )
                })
              }
              </group>
              <content id="subTotal">
                <InfoItem
                  align={'right'} 
                  label={LANG.t('order.SubTotal')}
                  value={LANG.t('number.currency', {amount: subTotal})}
                  more={
                    <div className="detail">
                      &emsp;&emsp;
                    </div>
                  }
                />
              </content>
            </section>
            <section />
            {this.state.showQRCode ? null : paymentMethodSelector}
            {this.state.showQRCode ? qrImage : null}
          </main>
        </scroll>
        <CallToAction
          onPress={() => this._confirm(subTotal)}
          label={LANG.t('order.ConfirmOrder')}
        />
      </detail>
    )
  }
}

OrderPayment.propTypes = {
  routeParams: PropTypes.object.isRequired,
  ordersActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  order: PropTypes.object,
  signUps: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    event: state.events.event,
    order: state.orders.order
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ordersActions: bindActionCreators(ordersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPayment)
