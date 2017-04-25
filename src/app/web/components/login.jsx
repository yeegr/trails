'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActions from '../../redux/actions/userActions'

import ImagePath from './shared/ImagePath'
import Modal from './shared/Modal'

import {
  CONSTANTS,
  LANG,
  AppSettings
} from '../../../common/__'

class Login extends Component {
  constructor(props) {
    super(props)
    this._hideLogin = this._hideLogin.bind(this)
    this._resetState = this._resetState.bind(this)
    this._onMobileNumberChanged = this._onMobileNumberChanged.bind(this)
    this._getVerification = this._getVerification.bind(this)
    this._onVerificationCodeChanged = this._onVerificationCodeChanged.bind(this)
    this._onLoginPressed = this._onLoginPressed.bind(this)

    this.counter = AppSettings.getVerificationTimer

    this.init = {
      mobileNumber: '',
      verificationCode: '',

      disableMobileNumberInput: false,
      disableVerificationButton: true,
      getVerificationButtonText: LANG.t('login.GetVerificationCode'),
      showVerificationView: false,
      disableVerificationInput: false,
      disableLoginButton: true
    }

    this.state = Object.assign({}, this.init)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.login.showLogin) {
      this._resetState()
    }
  }

  _resetState() {
    this.setState(this.init)
  }

  _onMobileNumberChanged(evt) {
    let mobileNumber = evt.target.value.toString().trim(),
      test = AppSettings.mobileRx.test(mobileNumber)

    this.props.userActions.resetVerificationError()

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
  }

  _getVerification() {
    this.props.userActions.uploadMobileNumber(this.state.mobileNumber, CONSTANTS.ACCOUNT_ACTIONS.LOGIN)

    this.setState({
      disableVerificationButton: true,
      showVerificationView: true,
      verificationCode: ''
    })

    this.interval = setInterval(() => {
      if (this.counter > 0) {
        this.counter--
        this.setState({
          getVerificationButtonText: LANG.t('login.ResendVerificationCodeIn', {count: this.counter})
        })
      } else {
        clearInterval(this.interval)
        this.counter = AppSettings.getVerificationTimer
        this.setState({
          getVerificationButtonText: this.init.getVerificationButtonText,
          disableVerificationButton: false
        })
      }
    }, 1000)
  }

  _onVerificationCodeChanged(evt) {
    let verificationCode = evt.target.value.toString().trim()

    this.props.userActions.resetVerificationError()

    this.setState({
      verificationCode,
      disableLoginButton: !AppSettings.vcodeRx.test(verificationCode)
    })
  }

  _onLoginPressed() {
    this.props.userActions.verifyMobileNumber(
      this.state.mobileNumber,
      this.state.verificationCode,
      CONSTANTS.ACCOUNT_ACTIONS.LOGIN
    )
  }

  _hideLogin() {
    this.props.userActions.hideLogin()
  }

  render() {
    let {login} = this.props,
      {
        mobileNumber,
        verificationCode,
        disableMobileNumberInput, 
        disableVerificationButton, 
        showVerificationView,
        disableVerificationInput,
        disableLoginButton,
        getVerificationButtonText
      } = this.state

    const uri = ImagePath({type: 'background', path: AppSettings.loginBackground}),

      verificationView = (
        <fieldset>
          <label>
            {LANG.t('login.VerificationCode')}
          </label>
          <input
            type="number"
            autoFocus={false}
            autoCorrect={false}
            disabled={disableVerificationInput}
            maxLength={AppSettings.verificationCodeLength}
            placeholder={LANG.t('login.VerificationCode')}
            value={verificationCode}
            onFocus={() => {this.setState({verificationCode: ''})}}
            onChange={this._onVerificationCodeChanged}
          />
          <input
            type="button"
            disabled={disableLoginButton}
            value={LANG.t('login.LoginOrRegister')}
            onClick={this._onLoginPressed}
          />
          <span className="error">
            {login.loginError}
          </span>
        </fieldset>
      ),

      mobileLoginForm = (
        <form id="login">
          <fieldset>
            <label>
              {LANG.t('login.LoginViaMobileNumber')}
            </label>
            <input
              type="tel"
              autoFocus={true}
              autoCorrect={false}
              disabled={disableMobileNumberInput}
              maxLength={AppSettings.mobileNumberLength}
              placeholder={LANG.t('login.MobileNumberPlaceholder')}
              value={mobileNumber}
              onChange={this._onMobileNumberChanged}
            />
            <input
              type="button"
              disabled={disableVerificationButton}
              value={getVerificationButtonText}
              onClick={() => !disableVerificationButton && this._getVerification()}
            />
          </fieldset>
          {showVerificationView ? verificationView : null}
        </form>
      )
      
    return (
      <Modal
        backgroundSource={uri}
        visible={login.showLogin}
        close={this._hideLogin}
        content={
          mobileLoginForm
        }
      />
    )
  }
}

Login.propTypes = {
  userActions: PropTypes.object.isRequired,
  login: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
