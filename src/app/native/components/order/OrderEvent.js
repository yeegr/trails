'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'
import ParallaxView from 'react-native-parallax-view'

import {connect} from 'react-redux'

import CallToAction from '../shared/CallToAction'
import Inset from '../shared/Inset'
import InfoItem from '../shared/InfoItem'
import ImagePath from '../shared/ImagePath'
import TextView from '../shared/TextView'
import SignUpForm from './SignUpForm'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  AppSettings,
  Graphics
} from '../../../../common/__'

class OrderEvent extends Component {
  constructor(props) {
    super(props)

    this._removeSignUp = this._removeSignUp.bind(this)
    this._updateInfo = this._updateInfo.bind(this)
    this._validateData = this._validateData.bind(this)
    this._nextStep = this._nextStep.bind(this)

    let {navigator, user} = this.props
    navigator.__addSignUp = this._addSignUp.bind(this)

    this.state = {
      signUps: [{
        name: user.name || '',
        mobile: user.mobile.toString(),
        pid: user.pid || '',
        gender: user.gender || 1,
        level: user.level || 2
      }]
    }

    this.initY = AppSettings.device.height
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

  _validateData(person) {
    const validateName = person.name.trim().length > 1,
      validateMobileNumber = AppSettings.mobileRx.test(person.mobile),
      validatePersonalId = AppSettings.pidRx.test(person.pid.trim()),
      validateGender = (person.gender === 0 || person.gender === 1),
      validateUserLevel = (person.level > -1 && person.level < 5)

    return (validateName && validateMobileNumber && validatePersonalId && validateGender && validateUserLevel) ? {
      name: person.name.trim(),
      mobile: parseInt(person.mobile),
      pid: person.pid.trim(),
      gender: person.gender,
      level: person.level
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
      this.setState({signUps: tmp})

      this.props.navigator.push({
        id: 'OrderPayment',
        title: LANG.t('order.order'),
        passProps: {
          event: this.props.event,
          selectedGroup: this.props.selectedGroup || 0,
          signUps: tmp
        }
      })
    }
  }

  render() {
    const {event} = this.props,
      eventBackgroundUrl = ImagePath({type: 'background', path: UTIL.getEventHeroPath(event)}),
      selectedGroup = this.props.selectedGroup || 0,
      dates = UTIL.formatEventGroupLabel(event, selectedGroup)

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView ref="_scrollView"
          style={{flex: 1}}
          backgroundSource={{uri: eventBackgroundUrl}}
          windowHeight={Graphics.heroImage.height}
          onContentSizeChange={(contentWidth, contentHeight)=>{
            if (this.state.signUps.length === 1) {
              this.initY = contentHeight
            } else {
              this.refs._scrollView.scrollTo({x: 0, y: contentHeight - this.initY, animated: true})
            }
          }}
          header={(
            <Inset
              align={'bottom'}
              title={event.title} 
              excerpt={event.excerpt}
            />
          )}>
          <View style={styles.detail.article}>
            <View style={styles.detail.section}>
              <TextView
                class={'h2'}
                text={LANG.t('event.EventInfo')}
              />
              <View style={styles.detail.group}>
                <InfoItem
                  label={LANG.t('event.EventDates')}
                  value={dates}
                />
                <InfoItem
                  label={LANG.t('event.PerHead')}
                  value={LANG.t('number.currency', {amount: event.expenses.perHead})}
                />
              </View>
            </View>
            <View style={styles.detail.section}>
              <TextView
                class={'h3'}
                text={LANG.t('order.AllFieldsAreRequired')}
              />
              {
                this.state.signUps.map((signUp, index) => {
                  return (
                    <SignUpForm 
                      key={index} 
                      index={index} 
                      signUp={signUp} 
                      removeSignUp={() => this._removeSignUp(index)}
                      updateInfo={(index, signUp) => this._updateInfo(index, signUp)}
                    />
                  )
                })
              }
            </View>
          </View>
        </ParallaxView>
        <CallToAction
          label={LANG.t('order.ConfirmSignUps')}
          onPress={this._nextStep}
        />
        <KeyboardSpacer />
      </View>
    )
  }
}

OrderEvent.propTypes = {
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  selectedGroup: PropTypes.number
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

/*
function mapDispatchToProps(dispatch) {
  return {
  }
}
*/

export default connect(mapStateToProps)(OrderEvent)