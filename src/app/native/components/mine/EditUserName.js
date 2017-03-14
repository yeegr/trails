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
import * as loginActions from '../../../redux/actions/loginActions'

import StringInput from '../shared/StringInput'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings
} from '../../../../common/__'

class EditUserName extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.user.name || ''
    }
  }

  componentWillUnmount() {
    let name = this.state.name.trim()

    if (name.length >= AppSettings.minRealNameLength) {
      this.props.loginActions.updateUser(this.props.user.id, {
        name
      })
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
              placeholder={LANG.t('mine.edit.RealName')}
              onChangeText={(value) => this.setState({name: value})}
              value={this.state.name}
            />
          </View>
          <View style={{paddingHorizontal: 15}}>
            <TextView
              class={'h5'}
              text={LANG.t('mine.edit.MinRealNameLength', {min: AppSettings.minRealNameLength})}
            />
          </View>
        </View>
      </View>
    )
  }
}

EditUserName.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserName)