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

import RichTextEditor from '../shared/RichTextEditor'

import styles from '../../styles/main'

import {
  LANG
} from '../../../../common/__'

class EditUserIntro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      intro: this.props.user.intro
    }
  }

  componentWillUnmount() {
    let intro = this.state.intro.trim()

    if (intro.length > 2) {
      this.props.loginActions.updateUser(this.props.user.id, {
        intro
      })
      
    }
  }

  render() {
    return (
      <View style={styles.global.wrapper}>
        <View style={styles.editor.list}>
          <RichTextEditor
            placeholder={LANG.t('mine.edit.SelfIntro')}
            onChangeText={(intro) => this.setState({intro})}
            value={this.state.intro}
          />
        </View>
      </View>
    )
  }
}

EditUserIntro.propTypes = {
  navigator: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserIntro)