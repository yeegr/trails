'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ScrollView,
  Slider,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../../redux/actions/newTrailActions'

import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  UTIL
} from '../../../../common/__'

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
              onValueChange={(value) => props.newTrailActions.setTrailDifficulty(value)}
              value={props.difficultyLevel}
            />
            <TextView
              style={{marginLeft: 10}}
              text={UTIL.showDifficultyLevel(props.difficultyLevel)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

EditTrailDifficulty.propTypes = {
  navigator: PropTypes.object.isRequired,
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