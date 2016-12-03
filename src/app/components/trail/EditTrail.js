'use strict'

import React, {
  Component,
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
import * as navbarActions from '../../redux/actions/navbarActions'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import EditLink from '../shared/EditLink'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  AppSettings,
  Lang
} from '../../settings'

class EditTrail extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
  }

  componentWillMount() {
    this.props.newTrailActions.editTrail(this.props.trail)
  }

  nextPage(type) {
    let id = null,
      title = null

    switch (type) {
      case 'title':
        id = 'EditTrailTitle',
        title = LANG.t('trail.TrailTitle')
      break;

      case 'area':
        id = 'SelectTrailAreas',
        title = LANG.t('trail.SelectAreas')
      break;

      case 'desc':
        id = 'EditTrailDescription',
        title = LANG.t('trail.Description')
      break;

      case 'type':
        id = 'EditTrailType',
        title = LANG.t('trail.TrailType')
      break;

      case 'difficulty':
        id = 'EditTrailDifficulty',
        title = LANG.t('trail.DifficultyLevel')
      break;

      case 'photos':
        id = 'EditTrailGallery',
        title = LANG.t('trail.Photos')
      break;

      case 'preview':
        id = 'TrailDetail',
        title = LANG.t('trail.TrailPreview')
      break;
    }

    this.props.navigator.push({
      id,
      title,
      passProps: {
        city: AppSettings.defaultCity,
        isPreview: (type === 'preview')
      }
    })
  }

  render() {
    const trail = this.props.newTrail,
      status = (trail.isPublic) ? (
        <View style={[styles.editor.link, {paddingVertical: 15}]}>
          <View style={styles.editor.label}>
            <TextView
              text={LANG.t('trail.ReviewStatus')}
            />
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
                <TextView
                  text={LANG.t('trail.PrivacySetting')}
                />
              </View>
              <View style={styles.editor.value}>
                <Text style={[styles.editor.valueText, {marginRight: 10}]}>
                  {(trail.isPublic) ? LANG.t('trail.Public') : LANG.t('trail.Private')}
                </Text>
                <Switch
                  onValueChange={(value) => this.props.newTrailActions.setTrailPrivacy(value)}
                  value={trail.isPublic}
                />
              </View>
            </View>
            {status}
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('trail.TrailTitle')}
              onPress={() => this.nextPage('title')}
              required={true}
              validated={(trail.title.length >= AppSettings.minTrailTitleLength)}
              value={(trail.title.length >= AppSettings.minTrailTitleLength) ? trail.title : LANG.t('trail.Unnamed')}
            />
            <EditLink
              label={LANG.t('trail.TrailType')}
              onPress={() => this.nextPage('type')}
              required={true}
              validated={(trail.type > -1)}
              value={LANG.t('tags.' + trail.type)}
            />
            <EditLink
              label={LANG.t('trail.SelectAreas')}
              onPress={() => this.nextPage('area')}
              required={true}
              validated={(trail.areas.length > 0)}
              value={(trail.areas.length > 0)}
            />
            <EditLink
              label={LANG.t('trail.DifficultyLevel')}
              onPress={() => this.nextPage('difficulty')}
              required={true}
              validated={(trail.difficultyLevel > -1)}
              value={UTIL.showTrailDifficulty(trail.difficultyLevel)}
            />
            <EditLink
              label={LANG.t('trail.Description')}
              onPress={() => this.nextPage('desc')}
              value={trail.description}
            />
            <EditLink
              label={LANG.t('trail.Photos')}
              onPress={() => this.nextPage('photos')}
              value={trail.photos.length}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('trail.TrailPreview')}
              onPress={() => this.nextPage('preview')}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditTrail.propTypes = {
  navigator: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  navbar: PropTypes.object.isRequired,
  navbarActions: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
  newTrail: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    navbar: state.navbar,
    newTrail: state.newTrail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navbarActions: bindActionCreators(navbarActions, dispatch),
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTrail)

