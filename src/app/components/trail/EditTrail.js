'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Alert,
  ScrollView,
  Switch,
  Text,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginActions from '../../redux/actions/loginActions'
import * as navbarActions from '../../redux/actions/navbarActions'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import CallToAction from '../shared/CallToAction'
import EditLink from '../shared/EditLink'
import Loading from '../shared/Loading'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  CONSTANTS,
  LANG,
  UTIL,
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

class EditTrail extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)
    this._resetRoutes = this._resetRoutes.bind(this)
    this._deleteAlert = this._deleteAlert.bind(this)
    this._deleteTrail = this._deleteTrail.bind(this)
  }

  componentWillMount() {
    this.props.navbarActions.gotToEditTrail()
    this.props.newTrailActions.editTrail(this.props.trail)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newTrail.isSaved === true) {
      Alert.alert(
        LANG.t('trail.edit.SaveAlert.title'),
        LANG.t('trail.edit.SaveAlert.description'),
        [
          {text: LANG.t('trail.edit.SaveAlert.confirm'), onPress: this._resetRoutes}
        ]
      )
    }

    if (nextProps.newTrail.isDeleted === true) {
      this._resetRoutes()
    }
  }

  componentWillUnmount() {
    this.props.loginActions.reloadUser()
  }

  _resetRoutes() {
    this.props.navigator.popToTop(0)
  }

  _nextPage(type) {
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
        newTrail: this.props.newTrail,
        isPreview: true
      }
    })
  }

  _deleteTrail() {
    let trail = this.props.newTrail

    if (trail.hasOwnProperty('storeKey')) {
      this.props.newTrailActions.deleteLocalTrail(trail)
    } else if (trail.hasOwnProperty('_id')) {
      this.props.newTrailActions.deleteTrail(trail)
    } else {
      this._resetRoutes()
    }
  }

  _deleteAlert() {
    Alert.alert(
      LANG.t('trail.edit.DeleteAlert.title'),
      LANG.t('trail.edit.DeleteAlert.description'),
      [
        {text: LANG.t('trail.edit.DeleteAlert.cancel')},
        {text: LANG.t('trail.edit.DeleteAlert.confirm'), onPress: this._deleteTrail}
      ]
    )
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
              onPress={() => this._nextPage('title')}
              required={true}
              validated={(trail.title.length >= AppSettings.minTrailTitleLength)}
              value={(trail.title.length >= AppSettings.minTrailTitleLength) ? trail.title : LANG.t('trail.Unnamed')}
            />
            <EditLink
              label={LANG.t('trail.TrailType')}
              onPress={() => this._nextPage('type')}
              required={true}
              validated={(trail.type > -1)}
              value={LANG.t('tags.' + trail.type)}
            />
            <EditLink
              label={LANG.t('trail.SelectAreas')}
              onPress={() => this._nextPage('area')}
              required={true}
              validated={(trail.areas.length > 0)}
              value={(trail.areas.length > 0)}
            />
            <EditLink
              label={LANG.t('trail.DifficultyLevel')}
              onPress={() => this._nextPage('difficulty')}
              required={true}
              validated={(trail.difficultyLevel > -1)}
              value={UTIL.showTrailDifficulty(trail.difficultyLevel)}
            />
            <EditLink
              label={LANG.t('trail.Description')}
              onPress={() => this._nextPage('desc')}
              value={trail.description}
            />
            <EditLink
              label={LANG.t('trail.Photos')}
              onPress={() => this._nextPage('photos')}
              value={trail.photos.length}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('trail.TrailPreview')}
              onPress={() => this._nextPage('preview')}
            />
          </View>
          {trail.isUploading ? <Loading /> : null}
        </ScrollView>
        <CallToAction
          backgroundColor={Graphics.colors.warning}
          label={Lang.DeleteTrail} 
          onPress={this._deleteAlert} 
        />
      </View>
    )
  }
}

EditTrail.propTypes = {
  navigator: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loginActions: PropTypes.object.isRequired,
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
    loginActions: bindActionCreators(loginActions, dispatch),
    navbarActions: bindActionCreators(navbarActions, dispatch),
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTrail)

