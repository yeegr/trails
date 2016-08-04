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
  TouchableOpacity,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newTrailActions from '../../containers/actions/newTrailActions'

import Icon from '../shared/Icon'
import styles from '../../styles/main'

const EditTrailType = (props) => {
  return (
    <View style={styles.detail.wrapper}>
      <ScrollView style={styles.editor.scroll}>
        <View style={styles.editor.group}>
          <View style={[styles.search.grid, {paddingHorizontal: 5}]}>
          {
            AppSettings.trailTypes.map(function(i) {
              return (
                <TouchableOpacity key={i} onPress={() => props.newTrailActions.setTrailType(i)} style={{marginHorizontal: 2}}>
                  <Icon backgroundColor={(i === props.type) ? Graphics.colors.primary : Graphics.colors.midGray} 
                    type={i.toString()} 
                    label={Lang.tagArray[i]}
                  />
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