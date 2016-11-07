'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  TextInput,
  View
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../redux/actions/loginActions'

import TextButton from '../shared/TextButton'
import TextView from '../shared/TextView'

import {AppSettings, Lang, Graphics} from '../../settings'
import styles from '../../styles/main'

class EditUserMobile extends Component {
  constructor(props) {
    super(props)
    let vcodePattern = '\\d{' + AppSettings.verificationCodeLength + '}'

    this.mobileRx = new RegExp(/^1\d{10}$/)
    this.vcodeRx = new RegExp(vcodePattern, 'g')

    this.onMobileNumberChanged = this.onMobileNumberChanged.bind(this)
    this.getValidation = this.getValidation.bind(this)
    this.onVerificationCodeChanged = this.onVerificationCodeChanged.bind(this)
    this.sendValidationCode = this.sendValidationCode.bind(this)

    this.state = {
      mobileNumber: '',
      verificationCode: '',
      disableMobileNumberInput: false,
      disableValidationButton: true,
      getValidationButtonText: Lang.GetValidationCode,
      hideVerification: true,
      disableVerificationInput: false,
      disableVerificationButton: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.user.mobile === parseInt(this.state.mobileNumber)) {
      this.props.navigator.pop()
    }
  }

  onMobileNumberChanged(val) {
    let mobile = val.trim(),
      test = this.mobileRx.test(mobile)

    this.setState({
      mobileNumber: mobile,
      verificationCode: '',

      disableValidationButton: !test,
      hideVerification: true,
      disableVerification: true
    })

    this.props.loginActions.clearUpdateError()
  }

  getValidation() {
    if (parseInt(this.state.mobileNumber) !== this.props.login.user.mobile) {
      this.props.loginActions.validateMobileNumber(this.state.mobileNumber, 'UPDATE_MOBILE')

      this.setState({
        verificationCode: '',
        hideVerification: false
      })

      let that = this,
        counter = AppSettings.getValidationTimer,
        interval = setInterval(function() {
          if (counter > 0) {
            that.setState({
              getValidationButtonText: counter + Lang.ResendValidationCode,
              disableValidationButton: true
            })
            counter--
          } else {
            clearInterval(interval)
            that.setState({
              getValidationButtonText: Lang.GetValidationCode,
              disableValidationButton: false
            })
        }
      }, 1000)
    }
  }

  onVerificationCodeChanged(val) {
    let code = val.trim()

    this.setState({
      verificationCode: code,
      disableVerificationButton: !this.vcodeRx.test(code)
    })

    this.props.loginActions.clearUpdateError()
  }

  sendValidationCode() {
    this.props.loginActions.updateUserMobile(
      this.props.login.user._id,
      this.state.mobileNumber,
      this.state.verificationCode
    )
  }

  render() {
    const verificationForm = this.state.hideVerification ? null: (
      <View>
        <TextInput
          autoFocus={false}
          autoCorrect={false}
          disabled={this.state.disableVerificationInput}
          keyboardType="numeric"
          maxLength={AppSettings.verificationCodeLength}
          placeholder={Lang.ValidationCode}
          style={[styles.editor.textInput, {fontSize: 24, textAlign: 'center'}]}
          onFocus={() => {this.setState({verificationCode: ''})}}
          onChangeText={(value) => this.onVerificationCodeChanged(value)}
          value={this.state.verificationCode}
        />
        <TextButton
          disabled={this.state.disableVerificationButton}
          onPress={() => !this.state.disableVerificationButton && this.sendValidationCode()}
          text={Lang.SubmitValidation}
        />
        <TextView
          fontSize={'L'}
          style={{flex: 1, marginTop: 10, textAlign: 'center'}}
          textColor={Graphics.colors.warning}
          text={this.props.login.updateError}
        />
      </View>
    )

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={{alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{marginVertical: 20}}>
              <TextInput
                autoFocus={true}
                autoCorrect={false}
                disabled={this.state.disableMobileNumberInput}
                keyboardType="phone-pad"
                maxLength={AppSettings.mobileNumberLength}
                placeholder={Lang.MobileNumberSample}
                style={[styles.editor.textInput, {fontSize: 24, textAlign: 'center'}]}
                onChangeText={(mobile) => this.onMobileNumberChanged(mobile)}
                value={this.state.mobileNumber}
              />
              <TextButton
                disabled={this.state.disableValidationButton}
                onPress={this.getValidation}
                text={this.state.getValidationButtonText}
              />
            </View>
            {verificationForm}
            <KeyboardSpacer />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditUserMobile.propTypes = {
  loginActions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserMobile)