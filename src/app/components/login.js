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
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import * as WeChat from 'react-native-wechat'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../containers/actions/loginActions'

import Icon from '../components/shared/Icon'

class Login extends Component {
  constructor(props) {
    super(props)

    this.hideLogin = this.hideLogin.bind(this)
    this.resetState = this.resetState.bind(this)
    this.onMobileNumberChanged = this.onMobileNumberChanged.bind(this)
    this.getValidation = this.getValidation.bind(this)
    this.onValidationCodeChanged = this.onValidationCodeChanged.bind(this)
    this.onLoginPressed = this.onLoginPressed.bind(this)
    this.openWXApp = this.openWXApp.bind(this)
    this.toggleWXButton = this.toggleWXButton.bind(this)

    const {height, width} = Dimensions.get('window')

    this.state = {
      apiVersion: 'waiting...',
      wxAppInstallUrl: 'waiting...',
      isWXAppSupportApi: 'waiting...',
      isWXAppInstalled: 'waiting...',
      mobileNumber: '',
      validationCode: '',
      getValidationButtonText: Lang.GetValidationCode,
      showWXLogin: true
    }
  }

  async componentDidMount() {
    try {
      await WeChat.registerApp(AppSettings.sdks.wechat);

      this.setState({
        apiVersion: await WeChat.getApiVersion(),
        wxAppInstallUrl: await WeChat.getWXAppInstallUrl(),
        isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
        isWXAppInstalled: await WeChat.isWXAppInstalled()
      });
      console.log(this.state);
    } catch (e) {
      console.error(e);
    }
  }
  
  async openWXApp() {
    this.props.loginActions.hideLogin()

    await WeChat.openWXApp()
  }

  toggleWXButton(showWXLogin) {
    this.setState({
      showWXLogin
    })
  }

  render() {
    let loginView = null,
      loginProgress = null,
      weixinAuthButton = (this.state.showWXLogin) ? (
        <View style={styles.weixinLogin}>
          <TouchableOpacity
            style={[styles.button, styles.buttonEnabled]}
            onPress={this.openWXApp}>
            <Text style={styles.buttonText}>{Lang.LoginWithWechat}</Text>
          </TouchableOpacity>
        </View>
      ) : null,
      verificationButtonStyle = (this.props.login.disableVerification) ? styles.buttonDisabled : styles.buttonEnabled,
      loginButtonStyle = (this.props.login.disableLogin) ? styles.buttonDisabled : styles.buttonEnabled

    if (this.props.login.showVerification === true) {
      loginView = (<View style={{flex: 1}}>
        <Text style={styles.label}>{Lang.ValidationCode}</Text>
          <TextInput
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={AppSettings.validationCodeLength}
            style={styles.loginInput}
            placeholder={Lang.ValidationCode}
            placeholderTextColor={Graphics.colors.placeholder}
            onFocus={() => {this.setState({validationCode: ''})}}
            onChangeText={this.onValidationCodeChanged}
            value={this.state.validationCode}
          />
          <TouchableOpacity
            style={[styles.button, loginButtonStyle]}
            onPress={this.onLoginPressed}>
            <Text style={styles.buttonText}>{Lang.LoginOrRegister}</Text>
          </TouchableOpacity>
        </View>)
    }

    if (this.props.login.isFetching) {
      loginProgress = (
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.loginProgress}
        />
      ),
      weixinAuthButton = null
    }

    let toggle = (this.props.showLogin) ? styles.showLogin : styles.hideLogin

    return (
      <Image source={{uri: AppSettings.assetUri + AppSettings.loginBackground}} style={[styles.backgroundImage, toggle]}>
        <TouchableOpacity onPress={this.hideLogin} style={styles.closeButton}>
          <Icon backgroundColor={Graphics.colors.transparent} fillColor="rgba(255, 255, 255, 0.8)" type="close" />
        </TouchableOpacity>
        <View style={styles.loginForm}>
          <Text style={styles.label}>{Lang.MobileNumber}</Text>
          <TextInput
            ref="mobileNumber"
            autoFocus={false}
            autoCorrect={false}
            keyboardType="phone-pad"
            maxLength={AppSettings.mobileNumberLength}
            placeholder={Lang.MobileNumberSample}
            placeholderTextColor={Graphics.colors.placeholder}
            style={styles.loginInput}
            disabled={!this.props.login.disableVerification}
            onChangeText={this.onMobileNumberChanged}
            value={this.state.mobileNumber}
          />
          <TouchableOpacity
            disabled={this.props.login.disableVerification}
            style={[styles.button, verificationButtonStyle]}
            onPress={this.getValidation}>
            <Text style={styles.buttonText}>{this.state.getValidationButtonText}</Text>
          </TouchableOpacity>
          {loginView}
        </View>
        {loginProgress}
        {weixinAuthButton}
      </Image>
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
    let that = this

    this.props.loginActions.loginUser({
      mobile: that.state.mobileNumber
    })
    .then(() => {
      this.resetState()
    })
  }
}

const {height, width} = Dimensions.get('window'),
  styles = StyleSheet.create({
    backgroundImage: {
      backgroundColor: '#f00',
      position: 'absolute',
      height: height,
      width: width
    },
    showLogin: {
      top: 0
    },
    hideLogin: {
      top: height
    },
    loginForm: {
      backgroundColor: 'transparent',
      marginTop: 200,
      paddingBottom: 20,
      paddingHorizontal: 50,
    },
    weixinLogin: {
      bottom: 50,
      paddingHorizontal: 50,
      position: 'absolute',
      width: width,
      flex: 1
    },
    label: {
      color: Graphics.textColors.overlay,
      marginTop: 10,
      paddingLeft: 4,
      paddingRight: 4
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
    },
    buttonText: {
      color: Graphics.textColors.overlay,
      fontSize: 24
    },
    closeButton: {
      height: Graphics.icon.sideLength,
      right: 15,
      top: 30,
      position: 'absolute',
      width: Graphics.icon.sideLength
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
