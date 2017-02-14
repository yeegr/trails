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
import Card from '../shared/Card'
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
} from '../../settings'

class OrderEvent extends Component {
  constructor(props) {
    super(props)
    this._addSignUp = this._addSignUp.bind(this)
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
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navbar.addingEventSignup === true) {
      this._addSignUp()
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

    return(
      <View style={styles.global.wrapper}>
        <ParallaxView ref="scrollView"
          style={{flex: 1}}
          backgroundSource={{uri: eventBackgroundUrl}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Card
              align={'bottom'}
              title={event.title} 
              excerpt={event.excerpt}
            />
          )}>
          <View ref="scrollContent" style={styles.detail.article}>
            <View style={styles.detail.section}>
              <TextView class={'h2'} text={LANG.t('event.EventInfo')} />
              <View style={styles.detail.group}>
                <InfoItem
                  label={LANG.t('event.EventDates')}
                  value={dates}
                />
                <InfoItem
                  label={LANG.t('event.PerHead')}
                  value={LANG.l('currency', event.expenses.perHead)}
                />
              </View>
            </View>
            <View style={styles.detail.section}>
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