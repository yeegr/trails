'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../redux/actions/loginActions'

import StringInput from '../shared/StringInput'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings
} from '../../settings'

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

    if (AppSettings.pidRx.test(tmp)) {
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
        <View style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <StringInput
              autoFocus={true}
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={18}
              placeholder={LANG.t('mine.edit.PersonalId')}
              onChangeText={(pid) => this.setState({pid: pid})}
              value={this.state.pid}
            />
          </View>
          <View style={{paddingHorizontal: 15}}>
            <TextView
              class={'h5'}
              text={''}
            />
          </View>
        </View>
      </View>
    )
  }
}

EditUserPID.propTypes = {
  user: PropTypes.object.isRequired,
  loginActions: PropTypes.object.isRequired
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