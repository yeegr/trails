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

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../redux/actions/loginActions'

import styles from '../../styles/main'

class EditUserName extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.user.name || ''
    }
  }

  componentWillUnmount() {
    let tmp = this.state.name.trim()

    if (tmp !== '' && tmp !== this.props.user.name) {
      this.props.loginActions.updateUser(this.props.user.id, {
        name: tmp
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
              onChangeText={(name) => this.setState({name: name})}
              value={this.state.name}
            />
          </View>
        </ScrollView>
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