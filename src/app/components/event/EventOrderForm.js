'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Slider,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import RadioForm from 'react-native-simple-radio-button'

import Icon from '../shared/Icon'
import InputItem from '../shared/InputItem'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  Lang,
  Graphics
} from '../../settings'

class EventOrderForm extends Component {
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
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={'red'} 
            sideLength={32}
            type={'minus'}
          />
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
            inputStyle={'underline'}
          />
          <InputItem
            label={Lang.MobileNumber}
            input={
              <TextInput
                maxLength={11}
                keyboardType="phone-pad"
                style={styles.detail.textInput}
                value={this.state.mobile}
                onChangeText={(mobile) => this.updateState({mobile: mobile.trim()})}
              />
            }
            inputStyle={'underline'}
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
            inputStyle={'underline'}
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

EventOrderForm.propTypes = {
  index: PropTypes.number.isRequired,
  signUp: PropTypes.object.isRequired,
  updateInfo: PropTypes.func,
  removeUser: PropTypes.func
}

const localStyles = StyleSheet.create({
  actionBar: {
    bottom: -16,
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
    paddingTop: 4
  }
})

export default EventOrderForm