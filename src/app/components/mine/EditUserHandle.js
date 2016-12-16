'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  TextInput,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginActions from '../../redux/actions/loginActions'

import styles from '../../styles/main'

class EditUserHandle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      handle: this.props.user.handle
    }
  }

  componentWillUnmount() {
    let handle = this.state.handle.trim()

    if (handle !== '' && handle !== this.props.user.handle) {
      this.props.loginActions.updateUser(this.props.user.id, {
        handle
      })
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
              style={styles.editor.textInput}
              onChangeText={(handle) => this.setState({handle: handle})}
              value={this.state.handle}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditUserHandle.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserHandle)