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
  AsyncStorage,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../containers/actions/newTrailActions'

import {ACTION_TARGETS} from '../../../constants'
import {showTrailDifficulty} from '../../../common'
import EditLink from '../shared/EditLink'
import styles from '../../styles/main'

const EditTrail = (props) => {
  const nextPage = (type) => {
    let id = null,
      title = null

    switch (type) {
      case 'title':
        id = 'EditTrailTitle',
        title = Lang.TrailTitle
      break;

      case 'area':
        id = 'SelectTrailArea',
        title = Lang.SelectArea
      break;

      case 'desc':
        id = 'EditTrailDescription',
        title = Lang.Trail + Lang.Description
      break;

      case 'type':
        id = 'EditTrailType',
        title = Lang.TrailType
      break;

      case 'difficulty':
        id = 'EditTrailDifficulty',
        title = Lang.DifficultyLevel
      break;

      case 'photos':
        id = 'EditTrailGallery',
        title = Lang.Photos
      break;

      case 'preview':
        id = 'TrailDetail',
        title = Lang.TrailPreview
      break;
    }

    props.navigator.push({
      id,
      title,
      passProps: {
        preview: (type === 'preview')
      }
    })
  },

  resetNavigation = () => {
    props.navigator.resetTo({
      id: 'Home',
      title: ''
    })
  },

  status = (props.newTrail.isPublic) ? (
      <View style={[styles.editor.link, {paddingVertical: 15}]}>
      <View style={styles.editor.label}>
        <Text>{Lang.PrivacyStatus}</Text>
      </View>
      <View style={styles.editor.value}>
        <Text style={[styles.editor.valueText, {marginRight: 10}]}>
          {Lang[props.newTrail.privacyStatus]}
        </Text>
      </View>
    </View>
  ) : null 

  return (
    <View style={styles.detail.wrapper}>
      <ScrollView style={styles.editor.scroll}>
        <View style={styles.editor.group}>
          <View style={styles.editor.link}>
            <View style={styles.editor.label}>
              <Text>{Lang.PrivacySetting}</Text>
            </View>
            <View style={styles.editor.value}>
              <Text style={[styles.editor.valueText, {marginRight: 10}]}>
                {(props.newTrail.isPublic) ? Lang.Public : Lang.Private}
              </Text>
              <Switch
                onValueChange={(value) => props.newTrailActions.setTrailPrivacy(value)}
                value={props.newTrail.isPublic}
              />
            </View>
          </View>
          {status}
        </View>
        <View style={styles.editor.group}>
          <EditLink onPress={() => nextPage('title')} value={props.newTrail.title} required={true} label={Lang.TrailTitle} />
          <EditLink onPress={() => nextPage('type')} value={Lang.tagArray[props.newTrail.type]} required={true} label={Lang.TrailType} />
          <EditLink onPress={() => nextPage('difficulty')} value={showTrailDifficulty(props.newTrail.difficultyLevel)} required={true} label={Lang.DifficultyLevel} />
          <EditLink onPress={() => nextPage('area')} value={props.newTrail.areas.join()} required={props.newTrail.isPublic} label={Lang.SelectArea} />
          <EditLink onPress={() => nextPage('desc')} value={props.newTrail.description} label={Lang.Description} />
          <EditLink onPress={() => nextPage('photos')} value={props.newTrail.photos.length} label={Lang.Photos} />
        </View>
        <View style={styles.editor.group}>
          <EditLink onPress={() => nextPage('preview')} label={Lang.TrailPreview} />
        </View>
      </ScrollView>
    </View>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    newTrail: state.newTrail,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTrail)

