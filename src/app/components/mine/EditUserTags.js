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

class EditUserTags extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: this.props.user.tags
    }
  }

  componentWillUnmount() {
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

EditUserTags.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserTags)