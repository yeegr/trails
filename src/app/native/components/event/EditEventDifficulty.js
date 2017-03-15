'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Slider,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../../redux/actions/newEventActions'

import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  UTIL
} from '../../../../common/__'

const EditEventDifficulty = (props) => {
  return (
    <View style={styles.global.wrapper}>
      <View style={styles.editor.scroll}>
        <View style={styles.editor.group}>
          <View style={[styles.editor.row, {paddingVertical: 10}]}>
            <Slider
              style={{flex: 1}}
              maximumValue={10}
              minimumValue={2}
              step={1}
              onValueChange={(value) => props.newEventActions.setEventDifficulty(value)}
              value={props.difficultyLevel}
            />
            <TextView
              style={{marginLeft: 10}}
              text={UTIL.showDifficultyLevel(props.difficultyLevel)}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

EditEventDifficulty.propTypes = {
  navigator: PropTypes.object.isRequired,
  difficultyLevel: PropTypes.number.isRequired,
  newEventActions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    difficultyLevel: state.newEvent.difficultyLevel
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventDifficulty)