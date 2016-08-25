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
  TextInput,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../redux/actions/loginActions'

import styles from '../../styles/main'

class EditUserPID extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pid: this.props.user.pid || ''
    }
  }

  componentWillUnmount() {
    let tmp = this.state.pid.trim(),
      data = null

    if (/\d{18}/.test(tmp)) {
      data = {pid: tmp}
    } else if (tmp === '') {
      data = {pid: ''}
    }

    if (data) {
      this.props.loginActions.updateUser(this.props.user.id, data)
    }
  }

  render() {
    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <TextInput
              autoFocus={true}
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={18}
              style={styles.editor.textInput}
              onChangeText={(pid) => this.setState({pid: pid})}
              value={this.state.pid}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditUserPID.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPID)