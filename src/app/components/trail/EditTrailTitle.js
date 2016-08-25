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
import * as newTrailActions from '../../redux/actions/newTrailActions'

import styles from '../../styles/main'

class EditTrailTitle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: (this.props.title === Lang.Unnamed) ? '' : this.props.title
    }
  }

  componentWillUnmount() {
    let tmp = this.state.title.trim(),
     title = (tmp === '') ? Lang.Unnamed : tmp 

    this.props.newTrailActions.setTrailTitle(tmp)
  }

  render() {
    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <TextInput
              autoFocus={true}
              autoCorrect={false}
              maxLength={50}
              style={styles.editor.textInput}
              placeholder={Lang.TrailTitle}
              onChangeText={(value) => this.setState({title: value})}
              value={this.state.title}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditTrailTitle.propTypes = {
  title: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    title: state.newTrail.title
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTrailTitle)