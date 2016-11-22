'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as navbarActions from '../../redux/actions/navbarActions'

import CallToAction from '../shared/CallToAction'
import InfoItem from '../shared/InfoItem'
import Intro from '../shared/Intro'
import ImagePath from '../shared/ImagePath'
import TextView from '../shared/TextView'

import OrderForm from './OrderForm'

import styles from '../../styles/main'

import {
  UTIL,
  CONSTANTS,
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

class OrderEvent extends Component {
  constructor(props) {
    super(props)
    this.addSignUp = this.addSignUp.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
    this.validateData = this.validateData.bind(this)
    this.nextStep = this.nextStep.bind(this)

    let user = this.props.user

    this.state = {
      initPageHeight: 0,
      signUps: [{
        name: user.name || '',
        mobile: user.mobile.toString(),
        pid: user.pid || '',
        gender: user.gender || 1,
        level: user.level || 0
      }]
    }
  }

  componentWillMount() {
    this.props.navbarActions.gotToSignUp()
  }

  componentDidMount() {
    setTimeout(() => {
      this.refs.scrollContent.measure((fx, fy, width, height, px, py) => {
        this.setState({initPageHeight: height})
      })
    }, 200)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navbar.addingEventSignup === true) {
      this.addSignUp()
    }
  }

  addSignUp() {
    let signUps = this.state.signUps
    signUps.push({
      name: '',
      mobile: '',
      pid: '',
      gender: 1,
      level: 0
    })
    this.setState({signUps})

    setTimeout(() => {
      this.refs.scrollContent.measure((fx, fy, width, height, px, py) => {
        this.refs.scrollView.scrollTo({x:0, y:height-this.state.initPageHeight, animated: true})
      })
    }, 100)
  }

  removeUser(index) {
    let signUps = this.state.signUps
    signUps.splice(index, 1)
    this.setState({signUps})
  }

  updateInfo(index, signUp) {
    let validated = this.validateData(signUp)

    if (validated) {
      let signUps = this.state.signUps
      signUps[index] = validated
      this.setState({signUps})
    }
  }

  validateData(data) {
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

  nextStep() {
    let signUps = this.state.signUps,
      tmp = []

    signUps.map((signUp) => {
      let validated = this.validateData(signUp)
      if (validated) {
        tmp.push(validated)
      }
    })

    if (tmp.length > 0) {
      this.setState({signUps: tmp})

      this.props.navigator.push({
        id: 'OrderPayment',
        title: Lang.OrderPayment,
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
      eventBackgroundUrl = ImagePath({type: 'background', path: CONSTANTS.ASSET_FOLDERS.Event + '/' + event._id + '/' + event.hero}),
      selectedGroup = this.props.selectedGroup || 0,
      dates = UTIL.formatEventGroupLabel(event, selectedGroup)

    return(
      <View style={styles.global.wrapper}>
        <ParallaxView ref="scrollView"
          style={{flex: 1}}
          backgroundSource={{uri: eventBackgroundUrl}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
              align={'bottom'}
              title={event.title} 
              excerpt={event.excerpt}
            />
          )}>
          <View ref="scrollContent" style={styles.detail.article}>
            <View style={styles.detail.section}>
              <TextView class={'h2'} text={Lang.EventInfo} />
              <View style={styles.detail.group}>
                <InfoItem label={Lang.EventDates} value={dates} />
                <InfoItem label={Lang.PerHead} value={event.expenses.perHead.toString() + Lang.Yuan} />
              </View>
            </View>
            <View style={styles.detail.section}>
              {
                this.state.signUps.map((signUp, index) => {
                  return (
                    <OrderForm 
                      key={index} 
                      index={index} 
                      signUp={signUp} 
                      removeUser={() => this.removeUser(index)}
                      updateInfo={(index, signUp) => this.updateInfo(index, signUp)}
                    />
                  )
                })
              }
            </View>
            <KeyboardSpacer />
          </View>
        </ParallaxView>
        <CallToAction
          label={(event.expenses.perHead === 0) ? Lang.SignUp : Lang.Pay}
          onPress={this.nextStep}
        />
      </View>
    )
  }
}

OrderEvent.propTypes = {
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  selectedGroup: PropTypes.number,
  navbar: PropTypes.object.isRequired,
  navbarActions: PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    navbar: state.navbar
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navbarActions: bindActionCreators(navbarActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderEvent)