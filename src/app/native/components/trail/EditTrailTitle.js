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
import * as newTrailActions from '../../../redux/actions/newTrailActions'

import StringInput from '../shared/StringInput'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings
} from '../../../../common/__'

class EditTrailTitle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title
    }
  }

  componentWillUnmount() {
    let title = this.state.title.trim()

    if (title.length >= AppSettings.minTrailTitleLength) {
      this.props.newTrailActions.setTrailTitle(title)
    }
  }

  render() {
    return (
      <View style={styles.global.wrapper}>
        <View style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <StringInput
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
        </View>
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