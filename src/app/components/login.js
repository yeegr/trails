'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../settings'

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

class Login extends Component {
  constructor(props) {
    super(props)

    this.hideLogin = this.hideLogin.bind(this)
    this.resetState = this.resetState.bind(this)
    this.onMobileNumberChanged = this.onMobileNumberChanged.bind(this)
    this.getValidation = this.getValidation.bind(this)
    this.onValidationCodeChanged = this.onValidationCodeChanged.bind(this)
    this.onLoginPressed = this.onLoginPressed.bind(this)

    this.WXAuth = this.WXAuth.bind(this)

    this.state = {
      apiVersion: 'waiting...',
      wxAppInstallUrl: 'waiting...',
      isWXAppSupportApi: 'waiting...',
      isWXAppInstalled: 'waiting...',
      mobileNumber: '',
      validationCode: '',
      getValidationButtonText: Lang.GetValidationCode
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
    } catch (e) {
      console.error(e)
    }

    WeChat.addListener('SendAuth.Resp', (response) => {
      this.props.loginActions.showLogin()
      this.props.loginActions.requestWechatUserInfo(response.code)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.isFetchingWechatAuth) {
      this.WXAuth()
    }
  }
  
  WXAuth() {
    if (this.state.isWXAppInstalled) {
      this.props.loginActions.wechatAuthRequestSend()
      WeChat.sendAuthRequest('snsapi_userinfo', 'shitulv_login')
    }
  }

  render() {
    let login = this.props.login,
      labelStyles = {fontWeight: '400', paddingHorizontal: 4},
      verificationButtonStyle = (login.disableVerification) ? styles.buttonDisabled : styles.buttonEnabled,
      loginButtonStyle = (login.disableLogin) ? styles.buttonDisabled : styles.buttonEnabled,

      verificationView = (
        <View style={styles.inputGroup}>
          <TextView
            style={labelStyles}
            textColor={Graphics.textColors.overlay} 
            text={Lang.ValidationCode}
          />
          <TextInput
            autoCorrect={false}
            keyboardType={"numeric"}
            maxLength={AppSettings.validationCodeLength}
            style={styles.loginInput}
            placeholder={Lang.ValidationCode}
            placeholderTextColor={Graphics.colors.placeholder}
            onFocus={() => {this.setState({validationCode: ''})}}
            onChangeText={this.onValidationCodeChanged}
            value={this.state.validationCode}
          />
          <TouchableOpacity style={[styles.button, loginButtonStyle]} onPress={this.onLoginPressed}>
            <TextView
              fontSize={'XXXL'}
              textColor={Graphics.textColors.overlay}
              text={Lang.LoginOrRegister}
            />
          </TouchableOpacity>
        </View>
      ),

      mobileLoginForm = (
        <View style={styles.loginForm}>
          <View style={styles.inputGroup}>
            <TextView
              style={labelStyles}
              textColor={Graphics.textColors.overlay} 
              text={Lang.MobileNumber}
            />
            <TextInput
              ref="mobileNumber"
              autoFocus={false}
              autoCorrect={false}
              keyboardType="phone-pad"
              maxLength={AppSettings.mobileNumberLength}
              placeholder={Lang.MobileNumberSample}
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
          {login.showVerification ? verificationView : null}
        </View>
      ),

      loginProgress = (
        <ActivityIndicator
          animating={true}
          size="large"
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
              text={Lang.LoginWithWechat}
            />
          </TouchableOpacity>
        </View>
      )
      
    const loginBackgroundUrl = ImagePath({type: 'background', path: AppSettings.loginBackground})

    return (
      <Modal animationType={"slide"} transparent={false} visible={this.props.showLogin}>
        <Image source={{uri: loginBackgroundUrl}} style={styles.backgroundImage}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{flexDirection: 'column'}}>
              {login.mobile === null ? mobileLoginForm : null}
              {login.isFetching ? loginProgress : null}
              <KeyboardSpacer />
            </View>
            {login.wechat === null ? wechatAuthButton : null}
          </View>
          <TouchableOpacity onPress={this.hideLogin} style={styles.closeButton}>
            <Icon backgroundColor={Graphics.colors.transparent} fillColor="rgba(255, 255, 255, 0.8)" type="close" />
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
      validationCode: '',
      getValidationButtonText: Lang.GetValidationCode
    })
  }

  onMobileNumberChanged(val) {
    let tmp = val.trim(), 
      mobile = parseInt(tmp);

    this.setState({
      mobileNumber: tmp
    })

    if (AppSettings.mobileNumberPattern.test(mobile)) {
      this.props.loginActions.enableVerification()
    } else {
      this.props.loginActions.disableVerification()
      this.props.loginActions.hideVerification()
      this.setState({
        validationCode: ''
      })
    }
  }

  getValidation() {
    this.props.loginActions.disableVerification()
    this.props.loginActions.showVerification()

    this.setState({
      validationCode: ''
    })

    let that = this,
      counter = AppSettings.getValidationTimer,
      interval = setInterval(function() {
        if (counter > 0) {
          that.setState({
            getValidationButtonText: counter + Lang.ResendValidationCode
          })
          counter--
        } else {
          clearInterval(interval)
          that.props.loginActions.enableVerification()
          that.setState({
            getValidationButtonText: Lang.GetValidationCode
          })
      }
    }, 1000)
  }

  onValidationCodeChanged(val) {
    let code = parseInt(val.trim());

    if (/\d{6}/.test(code)) {
      this.props.loginActions.enableLogin()
    } else {
      this.props.loginActions.disableLogin()
    }

    this.setState({
      validationCode: code.toString()
    })
  }

  onLoginPressed() {
    this.props.loginActions.verifyMobileNumber(
      this.state.mobileNumber,
      this.state.validationCode
    )
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
