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
import * as newTrailActions from '../../redux/actions/newTrailActions'

import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings
} from '../../settings'

class EditTrailTitle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title
    }
  }

  componentWillUnmount() {
    let title = this.state.title.trim() 
    this.props.newTrailActions.setTrailTitle(title)
  }

  render() {
    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={[styles.editor.group, styles.editor.input]}>
            <TextInput
              autoFocus={true}
              autoCorrect={false}
              maxLength={50}
              style={styles.editor.textInput}
              placeholder={LANG.t('trail.TrailTitle')}
              onChangeText={(value) => this.setState({title: value})}
              value={this.state.title}
            />
          </View>
          <View style={{paddingHorizontal: 15}}>
            <TextView
              class={'h5'}
              text={LANG.t('trail.edit.MinTrailTitleLength', {min: AppSettings.minTrailTitleLength})}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditTrailTitle.propTypes = {
  navigator: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
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