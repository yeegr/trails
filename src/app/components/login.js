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

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginActions from '../containers/actions/loginActions'

//import * as WeChat from 'react-native-wechat'

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
    //this.openWXApp = this.openWXApp.bind(this)

    const {height, width} = Dimensions.get('window')

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

  /*
  async componentDidMount() {
    try {
      await WeChat.registerApp(AppSettings.sdk.wechat);

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
    await WeChat.openWXApp();
  }
  */

  render() {
    let loginView = null,
      loginProgress = null,
      weixinAuthButton = (
        <View style={styles.weixinLogin}>
          <TouchableOpacity
            style={[styles.button, styles.buttonEnabled]}
            onPress={this.openWXApp}>
            <Text style={styles.buttonText}>{Lang.LoginWithWechat}</Text>
          </TouchableOpacity>
        </View>
      ),
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
            placeholderTextColor={AppSettings.color.placeholderText}
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
          <Icon backgroundColor="transparent" fillColor="rgba(255, 255, 255, 0.8)" pictogram={Graphics.pictogram.timer} />
        </TouchableOpacity>
        <View style={styles.loginForm}>
          <Text style={styles.label}>{Lang.MobileNumber}</Text>
          <TextInput
            ref="mobileNumber"
            autoFocus={true}
            autoCorrect={false}
            keyboardType="phone-pad"
            maxLength={AppSettings.mobileNumberLength}
            placeholder={Lang.MobileNumberSample}
            placeholderTextColor={AppSettings.color.placeholderText}
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
      color: AppSettings.color.textOverlay,
      marginTop: 10,
      paddingLeft: 4,
      paddingRight: 4
    },
    loginInput: {
      color: AppSettings.color.foreground,
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
      backgroundColor: AppSettings.color.primary,
    },
    buttonDisabled: {
      backgroundColor: AppSettings.color.disabledButtonBackground,
      opacity: 0.8
    },
    buttonText: {
      color: AppSettings.color.textOverlay,
      fontSize: 24
    },
    closeButton: {
      height: Graphics.iconSide,
      right: 10,
      top: 25,
      position: 'absolute',
      width: Graphics.iconSide
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
