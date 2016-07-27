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
  Slider,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newTrailActions from '../../containers/actions/newTrailActions'

import styles from '../../styles/main'

const EditTrailDifficulty = (props) => {
  return (
    <View style={styles.detail.wrapper}>
      <ScrollView style={styles.editor.scroll}>
        <View style={[styles.editor.group, {paddingHorizontal: 15, paddingVertical: 10}]}>
          <Slider
            style={{flex: 1}}
            maximumValue={5}
            minimumValue={1}
            step={1}
            onValueChange={(value) => props.newTrailActions.setDifficultyLevel(value)}
            value={props.difficultyLevel}
          />
        </View>
      </ScrollView>
    </View>
  )
}

EditTrailDifficulty.propTypes = {
  difficultyLevel: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    difficultyLevel: state.newTrail.difficultyLevel
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTrailDifficulty)