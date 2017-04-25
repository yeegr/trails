'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userActions from '../../../redux/actions/userActions'

import StringInput from '../shared/StringInput'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings
} from '../../../../common/__'

class EditUserHandle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      handle: this.props.user.handle
    }
  }

  componentWillUnmount() {
    let handle = this.state.handle.trim()

    if (handle.length >= AppSettings.minUserHandleLength && handle !== this.props.user.handle) {
      this.props.userActions.updateUser(this.props.user.id, {
        handle
      })
    }
  }

  render() {
    return (
      <View style={styles.global.wrapper}>
        <View style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <StringInput
              autoCorrect={false}
              autoFocus={true}
              placeholder={LANG.t('mine.edit.UserHandle')}
              onChangeText={(handle) => this.setState({handle})}
              value={this.state.handle}
            />
          </View>
          <View style={{paddingHorizontal: 15}}>
            <TextView
              class={'h5'}
              text={LANG.t('mine.edit.MinUserHandleLength', {min: AppSettings.minUserHandleLength})}
            />
          </View>
        </View>
      </View>
    )
  }
}

EditUserHandle.propTypes = {
  navigator: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserHandle)