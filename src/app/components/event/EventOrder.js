'use strict'

import {
  AppSettings,
  Lang,
  Graphics,
  WebViewCSS
} from '../../settings'

import React, {
  Component
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

import Moment from 'moment'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../containers/actions/eventsActions'

import Intro from '../shared/Intro'
import InfoItem from '../shared/InfoItem'
import TextView from '../shared/TextView'
import CallToAction from '../shared/CallToAction'
import {formatTime, formatEndTime} from '../../../common'
import styles from '../../styles/main'

class EventOrder extends Component {
  constructor(props) {
    super(props)
    this.addUser = this.addUser.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
    this.validateData = this.validateData.bind(this)
    this.submit = this.submit.bind(this)

    let user = this.props.user

    this.state = {
      initPageHeight: 0,
      signUps: [{
        realName: (user.name) ? user.name : '',
        mobileNumber: user.mobile.toString(),
        personalId: (user.pid) ? user.pid.toString() : '',
        gender: user.gender || 1,
        level: user.level || 0
      }]
    }
  }

  addUser() {
    let signUps = this.state.signUps
    signUps.push({
      realName: '',
      mobileNumber: '',
      personalId: '',
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
    const validateName = data.realName.trim().length > 1,
      validateMobileNumber = AppSettings.mobileNumberPattern.test(data.mobileNumber),
      validatePersonalId = /\d{18}/.test(data.personalId.trim()),
      validateGender = (data.gender === 0 || data.gender === 1),
      validateUserLevel = (data.level > -1 && data.level < 5)

    return (validateName && validateMobileNumber && validatePersonalId && validateGender && validateUserLevel) ? {
      realName: data.realName.trim(),
      mobileNumber: parseInt(data.mobileNumber),
      personalId: data.personalId.trim(),
      gender: data.gender,
      level: data.level
    } : false
  }

  submit() {
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
    this.props.event.groups.map((group)=>{
      console.log(Moment(group))
    })

    const event = this.props.event,
      group = this.props.group || 0,      
      startDate = Moment(event.groups[group]),
      endDate = Moment(startDate).add(event.schedule.length, 'days'),
      dates = (event.groups.length > 1) ? (
        startDate.format('LL') + '-' + endDate.format('LL')
      ) : (
        startDate.format('LL')
      )

      //deposit = (event.expenses.deposit) ? <InfoItem label={Lang.Deposit} value={event.expenses.deposit + Lang.Yuan} /> : null
      
    return(
      <View style={styles.detail.wrapper}>
        <ParallaxView style={{flex: 1}}
          ref='scrollView'
          backgroundSource={{uri: AppSettings.assetUri + event.hero}}
          windowHeight={240}
          header={(
            <Intro
              align='bottom' 
              title={event.title} 
              excerpt={event.excerpt}
            />
          )}>
          <View ref='scrollContent' style={{backgroundColor: AppSettings.color.background}}>
            <View style={styles.detail.section}>
              <TextView class='h2' text={Lang.EventInfo} />
              <InfoItem label={Lang.EventDates} value={dates} />
              <InfoItem label={Lang.PerHead} value={event.expenses.perHead.toString() + Lang.Yuan} />
            </View>
            <View style={styles.detail.section}>
              {
                this.state.signUps.map((signUp, index) => {
                  return (
                    <InputItem 
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
              label={Lang.SignUp}
              onPress={this.submit}
            />
          </View>
        </View>
      </View>
    )
  }
}

class InputItem extends Component {
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)

    let signUp = this.props.signUp

    this.state = {
      realName: signUp.realName,
      mobileNumber: signUp.mobileNumber,
      personalId: signUp.personalId,
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
          <Svg height={28} width={28}>
            <Circle
              cx="14"
              cy="14"
              r="14"
              fill="red"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    ) : null,

    genderArray = [{label: Lang.Female + '    ', value: 0}, {label: Lang.Male, value: 1}]

    return (
      <View style={[styles.global.form, {paddingTop: 5}]}>
        <View style={{marginRight: 10}}>
          <View style={styles.detail.infoRow}>
            <View style={styles.detail.label}>
              <TextView text={Lang.RealName + '：'} />
            </View>
            <View style={styles.detail.input}>
              <TextInput
                autoFocus={true}
                style={styles.detail.textInput}
                value={this.state.realName}
                onChangeText={(realName) => this.updateState({realName})}
              />
            </View>
          </View>
          <View style={styles.detail.infoRow}>
            <View style={styles.detail.label}>
              <TextView text={Lang.MobileNumber + '：'} />
            </View>
            <View style={styles.detail.input}>
              <TextInput
                maxLength={11}
                keyboardType='phone-pad'
                style={styles.detail.textInput}
                value={this.state.mobileNumber}
                onChangeText={(mobileNumber) => this.updateState({mobileNumber: mobileNumber.trim()})}
              />
            </View>
          </View>
          <View style={styles.detail.infoRow}>
            <View style={styles.detail.label}>
              <TextView text={Lang.PersonalId + '：'} />
            </View>
            <View style={styles.detail.input}>
              <TextInput
                maxLength={18}
                keyboardType='numeric'
                style={styles.detail.textInput}
                value={this.state.personalId}
                onChangeText={(personalId) => this.updateState({personalId: personalId.trim()})}
              />
            </View>
          </View>
          <View style={[styles.detail.infoRow, {paddingVertical: 10}]}>
            <View style={styles.detail.label}>
              <TextView text={Lang.Gender + '：'} />
            </View>
            <View style={[styles.detail.input, {borderBottomWidth: 0}]}>
              <RadioForm
                radio_props={genderArray}
                initial={this.state.gender}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={AppSettings.color.primary}
                animation={true}
                onPress={(value) => {this.updateState({gender: value})}}
              />
            </View>
          </View>
          <View style={styles.detail.infoRow}>
            <View style={styles.detail.label}>
              <TextView text={Lang.UserLevel + '：'} />
            </View>
            <View style={[styles.editor.value, {marginLeft: 0, justifyContent: 'flex-start'}]}>
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
          </View>
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
    backgroundColor: AppSettings.color.background,
    borderRadius: 18,
    height: 36,
    marginRight: 18,
    padding: 4,
    width: 36,
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