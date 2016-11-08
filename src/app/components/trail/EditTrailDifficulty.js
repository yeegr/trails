'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ScrollView,
  Slider,
  Text,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import styles from '../../styles/main'

import {
  UTIL
} from '../../settings'

const EditTrailDifficulty = (props) => {
  return (
    <View style={styles.global.wrapper}>
      <ScrollView style={styles.editor.scroll}>
        <View style={styles.editor.group}>
          <View style={[styles.editor.row, {paddingVertical: 10}]}>
            <Slider
              style={{flex: 1}}
              maximumValue={10}
              minimumValue={2}
              step={1}
              onValueChange={(value) => props.newTrailActions.setDifficultyLevel(value)}
              value={props.difficultyLevel}
            />
            <Text style={{marginLeft: 10}}>{UTIL.showTrailDifficulty(props.difficultyLevel)}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

EditTrailDifficulty.propTypes = {
  difficultyLevel: PropTypes.number.isRequired,
  newTrailActions: PropTypes.object.isRequired
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