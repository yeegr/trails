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
  ListView,
  Slider,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Svg, {
  Circle
} from 'react-native-svg'

import ParallaxView from 'react-native-parallax-view'
import RadioForm from 'react-native-simple-radio-button'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../containers/actions/eventsActions'

import TextView from '../shared/TextView'
import Intro from '../shared/Intro'
import Icon from '../shared/Icon'
import InfoItem from '../shared/InfoItem'
import InputItem from '../shared/InputItem'
import CallToAction from '../shared/CallToAction'
import {formatEventGroupLabel} from '../../../common'
import styles from '../../styles/main'

class EventOrder extends Component {
  constructor(props) {
    super(props)
    this.addUser = this.addUser.bind(this)
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

  addUser() {
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
      validateMobileNumber = AppSettings.mobileNumberPattern.test(data.mobile),
      validatePersonalId = /\d{18}/.test(data.pid.trim()),
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

    signUps.map((signUp, index) => {
      let validated = this.validateData(signUp)
      if (validated) {
        tmp.push(validated)
      }
    })

    this.setState({signUps: tmp})

    this.props.navigator.push({
      id: 'EventPayment',
      title: Lang.EventPayment,
      passProps: {
        event: this.props.event,
        group: this.props.group,
        signUps: tmp
      }
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.refs.scrollContent.measure((fx, fy, width, height, px, py) => {
        this.setState({initPageHeight: height})
      })
    }, 200)
  }

  render() {
    const event = this.props.event,
      selectedGroup = this.props.selectedGroup || 0,
      dates = formatEventGroupLabel(event, selectedGroup)

      //deposit = (event.expenses.deposit) ? <InfoItem label={Lang.Deposit} value={event.expenses.deposit + Lang.Yuan} /> : null
      
    return(
      <View style={styles.detail.wrapper}>
        <ParallaxView ref='scrollView'
          style={{flex: 1}}
          backgroundSource={{uri: AppSettings.assetUri + event.hero}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
              align='bottom' 
              title={event.title} 
              excerpt={event.excerpt}
            />
          )}>
          <View ref='scrollContent' style={{backgroundColor: Graphics.colors.background}}>
            <View style={styles.detail.section}>
              <TextView class='h2' text={Lang.EventInfo} />
              <InfoItem label={Lang.EventDates} value={dates} />
              <InfoItem label={Lang.PerHead} value={event.expenses.perHead.toString() + Lang.Yuan} />
            </View>
            <View style={styles.detail.section}>
              {
                this.state.signUps.map((signUp, index) => {
                  return (
                    <MiniForm 
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
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 3}}>
            <CallToAction 
              backgroundColor={Graphics.textColors.overlay}
              textColor={Graphics.colors.primary}
              label={Lang.AddSignUp}
              onPress={this.addUser}
            />
          </View>
          <View style={{flex: 2}}>
            <CallToAction
              label={Lang.Pay}
              onPress={this.nextStep}
            />
          </View>
        </View>
      </View>
    )
  }
}

class MiniForm extends Component {
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)

    let signUp = this.props.signUp

    this.state = {
      name: signUp.name,
      mobile: signUp.mobile,
      pid: signUp.pid,
      gender: signUp.gender,
      level: signUp.level
    }
  }

  updateState(kv) {
    this.setState(kv)

    setTimeout(() => {
      this.props.updateInfo(this.props.index, this.state)
    }, 0)
  }

  render() {
    const removeButton = (this.props.index > 0) ? (
      <View style={localStyles.button}>
        <TouchableOpacity onPress={() => this.props.removeUser(this.props.index)}>
          <Icon type='minus' sideLength='32' fillColor='red' backgroundColor={Graphics.colors.transparent} />
        </TouchableOpacity>
      </View>
    ) : null,

    genderArray = [{label: Lang.Female + '    ', value: 0}, {label: Lang.Male, value: 1}]

    return (
      <View style={[styles.global.form, {paddingTop: 5}]}>
        <View style={{marginRight: 10}}>
          <InputItem
            label={Lang.RealName}
            input={
              <TextInput
                autoFocus={true}
                style={styles.detail.textInput}
                value={this.state.name}
                onChangeText={(name) => this.updateState({name})}
              />
            }
            inputStyle='underline'
          />
          <InputItem
            label={Lang.MobileNumber}
            input={
              <TextInput
                maxLength={11}
                keyboardType='phone-pad'
                style={styles.detail.textInput}
                value={this.state.mobile}
                onChangeText={(mobile) => this.updateState({mobile: mobile.trim()})}
              />
            }
            inputStyle='underline'
          />
          <InputItem
            label={Lang.PersonalId}
            input={
              <TextInput
                maxLength={18}
                keyboardType='numeric'
                style={styles.detail.textInput}
                value={this.state.pid}
                onChangeText={(pid) => this.updateState({pid: pid.trim()})}
              />
            }
            inputStyle='underline'
          />
          <InputItem
            label={Lang.Gender}
            input={
              <RadioForm
                radio_props={genderArray}
                initial={this.state.gender}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={Graphics.colors.primary}
                animation={true}
                onPress={(value) => {this.updateState({gender: value})}}
              />
            }
          />
          <InputItem
            label={Lang.UserLevel}
            input={
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Slider
                  style={{width: 150}}
                  maximumValue={4}
                  minimumValue={0}
                  step={1}
                  value={this.state.level}
                  onValueChange={(level) => this.updateState({level})}
                />
                <TextView style={{marginLeft: 15}} text={Lang.userLevelArray[this.state.level]} />
              </View>
            }
            styles={{
              wrapper: {
                marginBottom: 10
              }
            }}
          />
        </View>
        <View style={localStyles.actionBar}>
          {removeButton}
        </View>
      </View>
    )
  }
}

const localStyles = StyleSheet.create({
  actionBar: {
    bottom: -18,
    flex: 1,
    flexDirection: 'row',
    height: 36,
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    width: 100
  },
  button: {
    backgroundColor: Graphics.colors.background,
    borderRadius: 16,
    height: 32,
    marginRight: 16,
    width: 32,
  }
})

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventOrder)