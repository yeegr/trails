'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ScrollView,
  Switch,
  Text,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import EditLink from '../shared/EditLink'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  UTIL,
  AppSettings,
  Lang
} from '../../settings'

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
        city: AppSettings.defaultCity,
        isPreview: (type === 'preview')
      }
    })
  },

  status = (trail.isPublic) ? (
    <View style={[styles.editor.link, {paddingVertical: 15}]}>
      <View style={styles.editor.label}>
        <TextView
          text={Lang.status}
        />
      </View>
      <View style={styles.editor.value}>
        <TextView
          style={{textAlign: 'right', width: 120}}
          text={Lang[trail.status]}
        />
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
              <TextView
                text={Lang.PrivacySetting}
              />
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
          <EditLink onPress={() => nextPage('difficulty')} value={UTIL.showTrailDifficulty(trail.difficultyLevel)} required={true} validated={(trail.difficultyLevel > -1)} label={Lang.DifficultyLevel} />
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

EditTrail.propTypes = {
  newTrail: PropTypes.object.isRequired
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

