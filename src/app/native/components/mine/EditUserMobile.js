'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  TextInput,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../../redux/actions/loginActions'

import TextButton from '../shared/TextButton'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings,
  Graphics
} from '../../../../common/__'

class EditUserMobile extends Component {
  constructor(props) {
    super(props)
    this._onMobileNumberChanged = this._onMobileNumberChanged.bind(this)
    this._getVerification = this._getVerification.bind(this)
    this._onVerificationCodeChanged = this._onVerificationCodeChanged.bind(this)
    this._onUpdatePressed = this._onUpdatePressed.bind(this)

    this.counter = AppSettings.getVerificationTimer

    this.getValidationButtonText = LANG.t('login.GetVerificationCode')

    this.state = {
      mobileNumber: '',
      verificationCode: '',

      disableMobileNumberInput: false,
      disableVerificationButton: true,
      getValidationButtonText: this.getValidationButtonText,
      showVerification: false,
      disableVerificationInput: false,
      disableUpdateButton: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.user.mobile === parseInt(this.state.mobileNumber)) {
      this.props.navigator.pop()
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  _onMobileNumberChanged(val) {
    let mobileNumber = val.trim(),
      test = AppSettings.mobileRx.test(mobileNumber)

    this.props.loginActions.clearUpdateError()

    if (test && this.counter === AppSettings.getVerificationTimer) {
      this.setState({
        mobileNumber,
        disableVerificationButton: false
      })
    } else {
      this.setState({
        mobileNumber,
        disableVerificationButton: true,
        showVerificationView: false,
        verificationCode: '',
        disableVerificationInput: false
      })
    }
/*
    this.setState({
      mobileNumber,
      verificationCode: '',

      disableVerificationInput: false,
      disableVerificationButton: !test,
      showVerification: false
    })*/
  }

  _getVerification() {
    if (parseInt(this.state.mobileNumber) !== this.props.login.user.mobile) {
      this.props.loginActions.uploadMobileNumber(this.state.mobileNumber, 'UPDATE_MOBILE')

      this.setState({
        disableVerificationButton: true,
        showVerificationView: true,
        verificationCode: ''
      })

      this.interval = setInterval(() => {
        if (this.counter > 0) {
          this.counter--
          this.setState({
            getValidationButtonText: LANG.t('login.ResendVerificationCodeIn', {count: this.counter})
          })
        } else {
          clearInterval(this.interval)
          this.counter = AppSettings.getVerificationTimer
          this.setState({
            getValidationButtonText: this.getValidationButtonText,
            disableVerificationButton: false
          })
        }
      }, 1000)
    }
  }

  _onVerificationCodeChanged(val) {
    this.props.loginActions.clearUpdateError()

    let verificationCode = val.trim()

    this.setState({
      verificationCode,
      disableUpdateButton: !AppSettings.vcodeRx.test(verificationCode)
    })
  }

  _onUpdatePressed() {
    this.props.loginActions.updateUserMobile(
      this.props.login.user._id,
      this.state.mobileNumber,
      this.state.verificationCode
    )
  }

  render() {
    const {
        mobileNumber,
        verificationCode,
        disableMobileNumberInput,
        disableVerificationButton,
        getValidationButtonText,
        showVerificationView,
        disableVerificationInput,
        disableUpdateButton
      } = this.state,
      verificationView = (
        <View>
          <TextInput
            autoFocus={false}
            autoCorrect={false}
            disabled={disableVerificationInput}
            keyboardType="numeric"
            maxLength={AppSettings.verificationCodeLength}
            placeholder={LANG.t('mine.edit.VerificationCode')}
            style={[styles.editor.textInput, {fontSize: 24, textAlign: 'center'}]}
            onFocus={() => {this.setState({verificationCode: ''})}}
            onChangeText={(value) => !disableVerificationInput && this._onVerificationCodeChanged(value)}
            value={verificationCode}
          />
          <TextButton
            disabled={disableUpdateButton}
            onPress={() => !disableUpdateButton && this._onUpdatePressed()}
            text={LANG.t('mine.edit.SubmitVerification')}
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
        <View style={styles.editor.scroll}>
          <View style={{alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start'}}>
            <View style={{marginVertical: 10}}>
              <TextInput
                autoFocus={true}
                autoCorrect={false}
                disabled={disableMobileNumberInput}
                keyboardType="phone-pad"
                maxLength={AppSettings.mobileNumberLength}
                onChangeText={this._onMobileNumberChanged}
                placeholder={LANG.t('login.MobileNumberPlaceholder')}
                style={[styles.editor.textInput, {fontSize: 24, textAlign: 'center'}]}
                value={mobileNumber}
              />
              <TextButton
                disabled={disableVerificationButton}
                onPress={this._getVerification}
                text={getValidationButtonText}
              />
            </View>
            {showVerificationView ? verificationView : null}
          </View>
        </View>
      </View>
    )
  }
}

EditUserMobile.propTypes = {
  navigator: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  loginActions: PropTypes.object.isRequired
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