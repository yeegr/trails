'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'
import * as WeChat from 'react-native-wechat'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../redux/actions/loginActions'

import Icon from '../components/shared/Icon'
import ImagePath from '../components/shared/ImagePath'
import TextView from '../components/shared/TextView'

import {
  LANG,
  AppSettings,
  Graphics
} from '../settings'

class Login extends Component {
  constructor(props) {
    super(props)
    this.hideLogin = this.hideLogin.bind(this)
    this.resetState = this.resetState.bind(this)
    this.onMobileNumberChanged = this.onMobileNumberChanged.bind(this)
    this.getValidation = this.getValidation.bind(this)
    this.onVerificationCodeChanged = this.onVerificationCodeChanged.bind(this)
    this.onLoginPressed = this.onLoginPressed.bind(this)

    this.WXAuth = this.WXAuth.bind(this)

    this.state = {
      apiVersion: 'waiting...',
      wxAppInstallUrl: 'waiting...',
      isWXAppSupportApi: 'waiting...',
      isWXAppInstalled: 'waiting...',
      mobileNumber: '',
      verificationCode: '',
      getValidationButtonText: LANG.t('login.GetVerificationCode')
    }
  }

  async componentDidMount() {
    try {
      await WeChat.registerApp(AppSettings.sdks.wechat)

      this.setState({
        apiVersion: await WeChat.getApiVersion(),
        wxAppInstallUrl: await WeChat.getWXAppInstallUrl(),
        isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
        isWXAppInstalled: await WeChat.isWXAppInstalled()
      })

      WeChat.addListener('SendAuth.Resp', (res) => {
        //this.props.loginActions.showLogin()
        if (res.errCode === 0) {
          this.props.loginActions.wechatAuthSuccess(res.code)
        } else {
          this.props.loginActions.wechatAuthFailure(res)
          Promise.reject(res)
        }
      })
    } catch (e) {
      console.error(e)
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.isAuthorizingWechat) {
      this.WXAuth()
    }

    if (!nextProps.showLogin) {
      this.resetState()
    }

    if (!nextProps.login.showLogin) {
      clearInterval(this.interval)
    }
  }
  
  WXAuth() {
    if (this.state.isWXAppInstalled) {
      this.props.loginActions.wechatAuthRequest()
      WeChat.sendAuthRequest('snsapi_userinfo', 'shitulv_login')
      this.props.loginActions.wechatAuthWaiting()
    }
  }

  render() {
    let login = this.props.login,
      labelStyles = {fontWeight: '400', paddingHorizontal: 4},
      verificationButtonStyle = (login.disableVerification) ? styles.buttonDisabled : styles.buttonEnabled,
      loginButtonStyle = (login.loginDisabled) ? styles.buttonDisabled : styles.buttonEnabled,

      verificationView = (
        <View style={styles.inputGroup}>
          <TextView
            style={labelStyles}
            textColor={Graphics.textColors.overlay} 
            text={LANG.t('login.VerificationCode')}
          />
          <TextInput
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={AppSettings.verificationCodeLength}
            style={styles.loginInput}
            placeholder={LANG.t('login.VerificationCode')}
            placeholderTextColor={Graphics.colors.placeholder}
            onFocus={() => {this.setState({verificationCode: ''})}}
            onChangeText={this.onVerificationCodeChanged}
            value={this.state.verificationCode}
          />
          <TouchableOpacity style={[styles.button, loginButtonStyle]} onPress={this.onLoginPressed}>
            <TextView
              fontSize={'XXXL'}
              textColor={Graphics.textColors.overlay}
              text={LANG.t('login.LoginOrRegister')}
            />
          </TouchableOpacity>
          <TextView
            fontSize={'L'}
            style={{flex: 1, marginTop: 10, textAlign: 'center'}}
            textColor={Graphics.colors.warning}
            text={login.loginError}
          />
        </View>
      ),

      mobileLoginForm = (
        <View style={styles.loginForm}>
          <View style={styles.inputGroup}>
            <TextView
              style={labelStyles}
              textColor={Graphics.textColors.overlay} 
              text={LANG.t('login.MobileNumber')}
            />
            <TextInput
              ref="mobileNumber"
              autoFocus={false}
              autoCorrect={false}
              keyboardType="phone-pad"
              maxLength={AppSettings.mobileNumberLength}
              placeholder={LANG.t('login.MobileNumberPlaceholder')}
              placeholderTextColor={Graphics.colors.placeholder}
              style={styles.loginInput}
              disabled={!login.disableVerification}
              onChangeText={this.onMobileNumberChanged}
              value={this.state.mobileNumber}
            />
            <TouchableOpacity
              disabled={login.disableVerification}
              style={[styles.button, verificationButtonStyle]}
              onPress={this.getValidation}
            >
              <TextView
                fontSize={'XXXL'}
                textColor={Graphics.textColors.overlay}
                text={this.state.getValidationButtonText}
              />
            </TouchableOpacity>
          </View>
          {login.showValidation ? verificationView : null}
        </View>
      ),

      loginProgress = (
        <ActivityIndicator
          animating={true}
          size={'large'}
          style={styles.loginProgress}
        />
      ),

      wechatAuthButton = (
        <View style={styles.weixinLogin}>
          <TouchableOpacity
            style={[styles.button, styles.buttonEnabled]}
            onPress={this.WXAuth}
          >
            <TextView
              fontSize={'XXXL'}
              textColor={Graphics.textColors.overlay}
              text={LANG.t('login.LoginViaWechat')}
            />
          </TouchableOpacity>
        </View>
      )
      
    const loginBackgroundUrl = ImagePath({type: 'background', path: AppSettings.loginBackground})

    return (
      <Modal animationType={'slide'} transparent={false} visible={this.props.login.showLogin}>
        <Image source={{uri: loginBackgroundUrl}} style={styles.backgroundImage}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{flexDirection: 'column'}}>
              {login.showMobileLogin ? mobileLoginForm : null}
              {login.isFetching ? loginProgress : null}
              <KeyboardSpacer />
            </View>
            {login.showWechatLogin ? wechatAuthButton : null}
          </View>
          <TouchableOpacity onPress={this.hideLogin} style={styles.closeButton}>
            <Icon backgroundColor={Graphics.colors.transparent} fillColor="rgba(255, 255, 255, 0.8)" type={'close'} />
          </TouchableOpacity>
        </Image>
      </Modal>
    )
  }

  hideLogin() {
    this.resetState()
    this.props.loginActions.hideLogin()
  }

  resetState() {
    this.setState({
      mobileNumber: '',
      verificationCode: '',
      getValidationButtonText: LANG.t('login.GetVerificationCode')
    })
  }

  onMobileNumberChanged(val) {
    let tmp = val.trim()

    this.setState({
      mobileNumber: tmp
    })

    this.props.loginActions.resetVerificationError()

    if (AppSettings.mobileRx.test(tmp)) {
      this.props.loginActions.enableValidation()
    } else {
      this.props.loginActions.disableVerification()
      this.props.loginActions.hideVerification()
      this.setState({
        verificationCode: ''
      })
    }
  }

  getValidation() {
    this.props.loginActions.disableVerification()
    this.props.loginActions.showVerification()
    this.props.loginActions.uploadMobileNumber(this.state.mobileNumber, 'login')

    this.setState({
      verificationCode: ''
    })

    let that = this,
      counter = AppSettings.getValidationTimer

    this.interval = setInterval(() => {
      if (counter > 0) {
        that.setState({
          getValidationButtonText: LANG.t('login.ResendVerificationCodeIn', {count: counter})
        })
        counter--
      } else {
        clearInterval(this.interval)
        that.props.loginActions.enableValidation()
        that.setState({
          getValidationButtonText: LANG.t('login.GetVerificationCode')
        })
      }
    }, 1000)
  }

  onVerificationCodeChanged(val) {
    let code = val.trim()

    this.props.loginActions.resetVerificationError()

    if (AppSettings.vcodeRx.test(code)) {
      this.props.loginActions.enableLogin()
    } else {
      this.props.loginActions.disableLogin()
    }

    this.setState({
      verificationCode: code
    })
  }

  onLoginPressed() {
    if (!this.props.login.loginDisabled) {
      this.props.loginActions.verifyMobileNumber(
        this.state.mobileNumber,
        this.state.verificationCode
      )
    }
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: Graphics.colors.background,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 50,
    resizeMode: 'cover'
  },
  closeButton: {
    height: Graphics.icon.sideLength,
    right: 15,
    top: 30,
    position: 'absolute',
    width: Graphics.icon.sideLength
  },
  loginForm: {
    backgroundColor: 'transparent'
  },
  weixinLogin: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  loginInput: {
    color: Graphics.colors.foreground,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    fontSize: 24,
    height: 50,
    marginTop: 10,
    padding: 4,
    textAlign: 'center'
  },
  inputGroup: {
    marginTop: 20
  },
  button: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonEnabled: {
    backgroundColor: Graphics.colors.primary,
  },
  buttonDisabled: {
    backgroundColor: "#666",
    opacity: 0.8
  }
})

Login.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
