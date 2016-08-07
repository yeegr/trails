'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../containers/actions/loginActions'

import TextButton from '../shared/TextButton'
import styles from '../../styles/main'

class EditUserMobile extends Component {
  constructor(props) {
    super(props)
    this.rx = new RegExp(/^1+\d{0,10}$/)
    this.onMobileNumberChanged = this.onMobileNumberChanged.bind(this)
    this.getValidation = this.getValidation.bind(this)
    //this.onValidationCodeChanged = this.onValidationCodeChanged.bind(this)

    this.state = {
      mobile: '',
      validationCode: '',
      mobileInputDisabled: false,
      validationInputDisabled: false,
      getValidationButtonDisabled: true,
      getValidationButtonText: Lang.GetValidationCode,
      sendValidationDisabled: true,
      showValidationInputs: false
    }
  }

  componentWillUnmount() {
    let tmp = this.state.mobile.trim()

    if (tmp.length === 11 && Number.isInteger(parseInt(tmp))) {
      this.props.loginActions.updateUser(this.props.user.id, {
        mobile: parseInt(tmp)
      })
    }
  }

  onMobileNumberChanged(val) {
    if (this.rx.test(val)) {
      this.setState({mobile: val})
    }

    this.setState({
      getValidationButtonDisabled: (val.length < AppSettings.mobileNumberLength),
      validationCode: '',
      showValidationInputs: (val.length === AppSettings.mobileNumberLength)
    })
  }

  getValidation() {
    this.setState({
      validationCode: '',
      showValidationInputs: true
    })

    let that = this,
      counter = AppSettings.getValidationTimer,
      interval = setInterval(function() {
        if (counter > 0) {
          that.setState({
            getValidationButtonText: counter + Lang.ResendValidationCode,
            getValidationButtonDisabled: true
          })
          counter--
        } else {
          clearInterval(interval)
          that.setState({
            getValidationButtonText: Lang.GetValidationCode,
            getValidationButtonDisabled: false
          })
      }
    }, 1000)
  }

  onValidationCodeChanged(val) {
    if (/\d/.test(val)) {
      this.setState({
        validationCode: val
      })
    }

    if (val.length === 6) {
      this.setState({
        sendValidationDisabled: false
      })
    }
  }

  render() {
    const validationCode = this.state.showValidationInputs ? (
      <TextInput
        autoFocus={false}
        autoCorrect={false}
        disabled={this.state.validationInputDisabled}
        keyboardType="numeric"
        maxLength={AppSettings.validationCodeLength}
        placeholder={Lang.ValidationCode}
        style={[styles.editor.textInput, {textAlign: 'center'}]}
        onFocus={() => {this.setState({validationCode: ''})}}
        onChangeText={(value) => this.onValidationCodeChanged(value)}
        value={this.state.validationCode}
      />
    ) : null,
    submitButton = this.state.showValidationInputs ? (
      <TextButton
        disabled={this.state.sendValidationDisabled}
        onPress={() => this.sendValidationCode}
        text={Lang.SubmitValidation}
      />
    ) : null

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={{alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
            <TextInput
              autoFocus={true}
              autoCorrect={false}
              disabled={this.state.mobileInputDisabled}
              keyboardType="phone-pad"
              maxLength={AppSettings.mobileNumberLength}
              placeholder={Lang.MobileNumberSample}
              style={[styles.editor.textInput, {textAlign: 'center'}]}
              onChangeText={(mobile) => this.onMobileNumberChanged(mobile)}
              value={this.state.mobile}
            />
            <TextButton
              disabled={this.state.getValidationButtonDisabled}
              onPress={this.getValidation}
              text={this.state.getValidationButtonText}
            />
            {validationCode}
            {submitButton}
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditUserMobile.propTypes = {
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserMobile)