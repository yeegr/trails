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
  Alert,
  ListView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'

import Svg, {
  Circle
} from 'react-native-svg'

import ParallaxView from 'react-native-parallax-view'
import RadioForm from 'react-native-simple-radio-button'
import {formatTime, formatEndTime} from '../../../common'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../containers/actions/eventsActions'

import Intro from '../shared/Intro'
import CallToAction from '../shared/CallToAction'
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
        realName: user.name,
        mobileNumber: user.mobile.toString(),
        personalId: user.pid.toString(),
        gender: user.gender || 1
      }]
    }
  }

  addUser() {
    let signUps = this.state.signUps
    signUps.push({
      realName: '',
      mobileNumber: '',
      personalId: '',
      gender: 1
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
    const validateName = data.realName.trim().length > 3,
      validateMobileNumber = AppSettings.mobileNumberPattern.test(data.mobileNumber),
      validatePersonalId = /\d{17}/.test(data.personalId.trim()),
      validateGender = (data.gender === 0 || data.gender === 1)

    return (validateName && validateMobileNumber && validatePersonalId && validateGender) ? {
      realName: data.realName.trim(),
      mobileNumber: Number(data.mobileNumber),
      personalId: data.personalId,
      gender: data.gender
    } : false
  }

  submit() {
    let signUps = this.state.signUps

    signUps.map((signUp, index) => {
      if (!this.validateData(signUp)) {
        signUps.splice(index, 1)
      }
    })

    this.setState({signUps})

    Alert.alert(
      'Alert Title',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
      ]
    )
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
      startDate = formatTime(event.gatherTime),
      endDate = formatEndTime(event.gatherTime, event.schedule.length),

      deposit = (event.expenses.deposit) ? <InfoItem label={Lang.Deposit} value={event.expenses.deposit + Lang.Yuan} /> : null
      
    return(
      <View style={styles.detail.wrapper}>
        <ParallaxView style={{flex: 1}}
          ref='scrollView'
          backgroundSource={{uri: AppSettings.assetUri + event.hero}}
          windowHeight={240}
          header={(
            <Intro title={event.title} excerpt={event.excerpt} />
          )}>
          <View ref='scrollContent' style={{backgroundColor: AppSettings.color.background}}>
            <View style={styles.detail.section}>
              <Text style={styles.detail.h2}>{Lang.EventInfo}</Text>
              <InfoItem label={Lang.EventDates} value={startDate + '-' + endDate} />
              <InfoItem label={Lang.EventExpenses} value={event.expenses.detail.join('，')} />
              {deposit}
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
          </View>
        </ParallaxView>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 3}}>
            <CallToAction 
              backgroundColor={'white'}
              foregroundColor={AppSettings.color.foreground}
              label={Lang.AddSignUp}
              onPress={this.addUser}
            />
          </View>
          <View style={{flex: 2}}>
            <CallToAction
              backgroundColor={AppSettings.color.primary}
              label={Lang.SignUp}
              onPress={this.submit}
            />
          </View>
        </View>
      </View>
    )
  }
}

const InfoItem = (props) => {
  return (
    <View style={styles.detail.textRow}>
      <Text style={styles.detail.label}>{props.label + '：'}</Text>
      <Text style={styles.detail.value}>{props.value}</Text>
    </View>
  )
}

class InputItem extends Component {
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this)

    let signUp = this.props.signUp

    this.state = {
      realName: signUp.realName || '',
      mobileNumber: signUp.mobileNumber || '',
      personalId: signUp.personalId || '',
      gender: signUp.gender || 1
    }
  }

  updateState(kv) {
    this.setState(kv)
    this.props.updateInfo(this.props.index, this.state)
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
      <View style={[styles.list.item, {paddingTop: 5}]}>
        <View style={{marginRight: 10}}>
          <View style={styles.detail.textRow}>
            <Text style={styles.detail.label}>{Lang.RealName + '：'}</Text>
            <View style={styles.detail.input}>
              <TextInput
                autoFocus={true}
                style={styles.detail.textInput}
                value={this.state.realName}
                onChangeText={(realName) => this.updateState({realName})}
              />
            </View>
          </View>
          <View style={styles.detail.textRow}>
            <Text style={styles.detail.label}>{Lang.MobileNumber + '：'}</Text>
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
          <View style={styles.detail.textRow}>
            <Text style={styles.detail.label}>{Lang.PersonalId + '：'}</Text>
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
          <View style={[styles.detail.textRow, {paddingVertical: 10}]}>
            <Text style={styles.detail.label}>{Lang.Gender + '：'}</Text>
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