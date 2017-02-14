'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  hashHistory
} from 'react-router'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ordersActions from '../../redux/actions/ordersActions'

import CallToAction from '../shared/CallToAction'
import Card from '../shared/Card'
import Hero from '../shared/Hero'
import InfoItem from '../shared/InfoItem'
import SignUpForm from './SignUpForm'

import {
  CONSTANTS,
  LANG,
  UTIL,
  AppSettings
} from '../../settings'

class OrderEvent extends Component {
  constructor(props) {
    super(props)
    this._addSignUp = this._addSignUp.bind(this)
    this._removeSignUp = this._removeSignUp.bind(this)
    this._updateInfo = this._updateInfo.bind(this)
    this._validateData = this._validateData.bind(this)
    this._nextStep = this._nextStep.bind(this)

    this.__addSignUp = this._addSignUp.bind(this)

    let {user} = this.props

    this.state = {
      signUps: [{
        name: user.name || '',
        mobile: user.mobile.toString() || '',
        pid: user.pid || '',
        gender: user.gender || 1,
        level: user.level || 2
      }]
    }
  }

  _addSignUp() {
    let signUps = this.state.signUps
    signUps.push({
      name: '',
      mobile: '',
      pid: '',
      gender: 1,
      level: 0
    })
    this.setState({signUps})
  }

  _removeSignUp(index) {
    let signUps = this.state.signUps
    signUps.splice(index, 1)
    this.setState({signUps})
  }

  _updateInfo(index, signUp) {
    let validated = this._validateData(signUp)

    if (validated) {
      let signUps = this.state.signUps
      signUps[index] = validated
      this.setState({signUps})
    }
  }

  _validateData(data) {
    const validateName = data.name.trim().length > 1,
      validateMobileNumber = AppSettings.mobileRx.test(data.mobile),
      validatePersonalId = AppSettings.pidRx.test(data.pid.trim()),
      validateGender = (data.gender === 0 || data.gender === 1),
      validateUserLevel = (data.level > -1 && data.level < 5)

    return (validateName && validateMobileNumber && validatePersonalId && validateGender && validateUserLevel) ? {
      name: data.name.trim(),
      mobile: parseInt(data.mobile),
      pid: data.pid.trim(),
      gender: data.gender,
      level: data.level
    } : false
  }

  _nextStep() {
    let signUps = this.state.signUps,
      tmp = []

    signUps.map((signUp) => {
      let validated = this._validateData(signUp)

      if (validated) {
        tmp.push(validated)
      }
    })

    if (tmp.length > 0) {
      this.props.ordersActions.setSignUps(tmp)
      hashHistory.push(`events/${this.props.event._id}/${this.props.routeParams.selectedGroup}/payment`)
    }
  }

  render() {
    const {event} = this.props,
      selectedGroup = this.props.routeParams.selectedGroup,
      imagePath = (event.hero.indexOf('default/') === 0) ? event.hero : event._id + '/' + event.hero,
      imageUri = CONSTANTS.ASSET_FOLDERS.EVENT + '/' + imagePath,
      dates = UTIL.formatEventGroupLabel(event, selectedGroup)

    let signUpCount = this.state.signUps.length

    return (
      <detail>
        <Hero
          imageUri={imageUri}
          card={
            <Card
              title={event.title}
              excerpt={event.excerpt}
              tags={event.tags}
            />
          }
        />
        <main>
          <div style={{marginBottom: '32px'}}>
            <h2>{LANG.t('event.EventInfo')}</h2>
            <group>
              <InfoItem
                label={LANG.t('event.EventDates')}
                value={dates}
              />
              <InfoItem
                label={LANG.t('event.PerHead')}
                value={LANG.t('number.web', {amount: event.expenses.perHead})}
              />
            </group>
          </div>
          <div>
            {
              this.state.signUps.map((signUp, index) => {
                return (
                  <SignUpForm 
                    key={index} 
                    index={index}
                    isLast={index === (signUpCount - 1)}
                    signUp={signUp}
                    addSignUp={this._addSignUp}
                    removeSignUp={() => this._removeSignUp(index)}
                    updateInfo={(index, signUp) => this._updateInfo(index, signUp)}
                  />
                )
              })
            }
          </div>
        </main>
        <CallToAction
          onPress={this._nextStep}
          label={LANG.t('order.ConfirmSignUps')}
        />
      </detail>
    )
  }
}

OrderEvent.propTypes = {
  routeParams: PropTypes.object.isRequired,
  ordersActions: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    event: state.events.event
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ordersActions: bindActionCreators(ordersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEvent)
