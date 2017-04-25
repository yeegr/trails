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
import * as userActions from '../../../redux/actions/userActions'

import StringInput from '../shared/StringInput'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings
} from '../../../../common/__'

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
      this.props.userActions.updateUser(this.props.user.id, data)
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
  userActions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPID)