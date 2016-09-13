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

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import {ACTION_TARGETS} from '../../../util/constants'
import {showTrailDifficulty} from '../../../util/common'
import EditLink from '../shared/EditLink'
import styles from '../../styles/main'

const EditTrail = (props) => {
  const trail = props.newTrail,

  nextPage = (type) => {
    let id = null,
      title = null

    switch (type) {
      case 'title':
        id = 'EditTrailTitle',
        title = Lang.TrailTitle
      break;

      case 'area':
        id = 'SelectTrailAreas',
        title = Lang.SelectAreas
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
        city: AppSettings.defaultcity,
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

  status = (trail.isPublic) ? (
      <View style={[styles.editor.link, {paddingVertical: 15}]}>
      <View style={styles.editor.label}>
        <Text>{Lang.status}</Text>
      </View>
      <View style={styles.editor.value}>
        <Text style={[styles.editor.valueText, {marginRight: 10}]}>
          {Lang[trail.status]}
        </Text>
      </View>
    </View>
  ) : null

  return (
    <View style={styles.global.wrapper}>
      <ScrollView style={styles.editor.scroll}>
        <View style={styles.editor.group}>
          <View style={styles.editor.link}>
            <View style={styles.editor.label}>
              <Text>{Lang.PrivacySetting}</Text>
            </View>
            <View style={styles.editor.value}>
              <Text style={[styles.editor.valueText, {marginRight: 10}]}>
                {(trail.isPublic) ? Lang.Public : Lang.Private}
              </Text>
              <Switch
                onValueChange={(value) => props.newTrailActions.setTrailPrivacy(value)}
                value={trail.isPublic}
              />
            </View>
          </View>
          {status}
        </View>
        <View style={styles.editor.group}>
          <EditLink onPress={() => nextPage('title')} value={(trail.title.length >= AppSettings.minTrailTitleLength) ? trail.title : Lang.Unnamed} required={true} validated={(trail.title.length >= AppSettings.minTrailTitleLength)} label={Lang.TrailTitle} />
          <EditLink onPress={() => nextPage('type')} value={Lang.tagArray[trail.type]} required={true} validated={(trail.type > -1)} label={Lang.TrailType} />
          <EditLink onPress={() => nextPage('difficulty')} value={showTrailDifficulty(trail.difficultyLevel)} required={true} validated={(trail.difficultyLevel > -1)} label={Lang.DifficultyLevel} />
          <EditLink onPress={() => nextPage('area')} value={trail.areasText.join(',')} required={true} validated={(trail.areas.length > 0)} label={Lang.SelectAreas} />
          <EditLink onPress={() => nextPage('desc')} value={trail.description} label={Lang.Description} />
          <EditLink onPress={() => nextPage('photos')} value={trail.photos.length} label={Lang.Photos} />
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

