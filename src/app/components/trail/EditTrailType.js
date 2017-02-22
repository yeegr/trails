'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import Icon from '../shared/Icon'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings,
  Graphics
} from '../../settings'

const EditTrailType = (props) => {
  return (
    <View style={styles.global.wrapper}>
      <ScrollView style={styles.editor.scroll}>
        <View>
          <View style={[styles.search.grid, {paddingHorizontal: 5}]}>
          {
            AppSettings.trailTypes.map(function(i) {
              const backgroundColor = (i === props.type) ? Graphics.colors.primary : Graphics.colors.midGray,
                textColor = (i === props.type) ? Graphics.colors.primary : Graphics.textColors.default

              return (
                <TouchableOpacity key={i} onPress={() => props.newTrailActions.setTrailType(i)} style={{marginHorizontal: 2}}>
                  <View style={{marginBottom: 10, marginHorizontal: 5}}>
                    <Icon
                      backgroundColor={backgroundColor}
                      stack={'vertical'}
                      textColor={textColor}
                      type={i.toString()}
                      value={LANG.t('tags.' + i)}
                    />
                  </View>
                </TouchableOpacity>
              )
            })
          }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

EditTrailType.propTypes = {
  navigator: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
  type: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    type: state.newTrail.type
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTrailType)