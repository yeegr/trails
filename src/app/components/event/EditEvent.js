'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Alert,
  ScrollView,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import CallToAction from '../shared/CallToAction'
import EditLink from '../shared/EditLink'
import Hero from '../shared/Hero'
import Icon from '../shared/Icon'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  AppSettings,
  Graphics
} from '../../settings'

class EditEvent extends Component {
  constructor(props) {
    super(props)
    this._unmount = this._unmount.bind(this)
    this._nextPage = this._nextPage.bind(this)

    this.state = {
      showCityPicker: false,
      showTypePicker: false,
      showDateTimePicker: false,
      showGatherLocationPicker: false
    }
  }

  componentWillMount() {
    // this may be wrong
    if (!this.props.event) {
      this.props.newEventActions.newEvent()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newEvent.isSaved) {
      Alert.alert(
        LANG.t('event.edit.SaveAlert.title'),
        LANG.t('event.edit.SaveAlert.description'),
        [{
          text: LANG.t('event.edit.SaveAlert.confirm'),
          onPress: this._unmount
        }]
      )
    }
  }

  _unmount() {
    this.props.navigator.popToTop(0)
  }

  _nextPage(type) {
    let id = null,
      title = null,
      props = {}

    switch (type) {
      case 'base':
        id = 'EditEventBase',
        title = LANG.t("event.edit.BaseInfo")
      break

      case 'hero':
        id = 'EditEventHero',
        title = LANG.t('event.edit.HeroImage')
      break

      case 'agenda':
        id = 'SelectTrail',
        title = LANG.t('event.edit.SelectTrail')
      break

      case 'expenses':
        id = 'EditExpenses',
        title = LANG.t('event.EventExpenses')
      break

      case 'gears':
        id = 'EditGears',
        title = LANG.t('event.GearsToBring')
      break

      case 'destination':
        id = 'EditEventDestination',
        title = LANG.t('event.DestinationDescription')
      break

      case 'notes':
        id = 'EditEventNotes',
        title = LANG.t('event.EventNotes')
      break

      case 'photos':
        id = 'EditEventGallery',
        title = LANG.t('event.EventPhotos')
      break

      case 'preview':
        //if (newEventActions.validateEvent(this.props.newEvent)) {
          id = 'EventDetail',
          title = LANG.t('event.edit.Preview')
        //}
      break
    }

    if (id !== null && title !== null) {
      this.props.navigator.push({
        id,
        title,
        passProps: Object.assign({}, props, {
          isPreview: (type === 'preview')
        }) 
      })
    }
  }

  resetNavigation() {
    this.props.navigator.resetTo({
      id: 'Home',
      title: ''
    })
  }

  render() {
    const event = this.props.newEvent
// saved for future
/*
    const privacy = (
          <View style={styles.editor.group}>
            <View style={styles.editor.link}>
              <View style={styles.editor.label}>
                <TextView
                  textColor={Graphics.colors.primary}
                  text={Lang.PrivacySetting}
                />
              </View>
              <View style={styles.editor.value}>
                <TextView
                  style={{marginRight: 10}}
                  text={(event.isPublic) ? Lang.Public : Lang.Private}
                />
                <Switch
                  onValueChange={(value) => this.props.newEventActions.setEventPrivacy(value)}
                  value={event.isPublic}
                />
              </View>
            </View>
          </View>
    )
*/

    return (
      <View style={styles.global.wrapper}>
        <View style={{height: 240}}>
          <Hero
            imageUri={UTIL.getEventHeroPath(event)}
            onPress={() => this._nextPage('hero')}
            card={
              <View style={[styles.editor.ring, {borderColor: Graphics.textColors.overlay, marginTop: 90}]}>
                <Icon
                  showLabel={true}
                  stack="vertical"
                  path={Graphics.pictograms.ruler}
                  backgroundColor={Graphics.colors.transparent}
                  fillColor={Graphics.colors.overlay}
                  label={LANG.t('event.edit.HeroImage')}
                  labelColor={Graphics.textColors.overlay}
                />
              </View>
            }
          />
        </View>
        <ScrollView>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('event.edit.BaseInfo')}
              required={true}
              validated={(event.title.length >= AppSettings.minEventTitleLength)}
              onPress={() => this._nextPage('base')}
              value={newEventActions.validateEventBase(event)}
            />
            <EditLink
              label={LANG.t('event.EventExpenses')}
              required={true}
              validated={(event.expenses.perHead !== null && event.expenses.perHead > -1)}
              onPress={() => this._nextPage('expenses')}
              value={LANG.l('currency', event.expenses.perHead)}
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('event.edit.SelectTrail')}
              onPress={() => this._nextPage('agenda')}
              value={event.schedule.length || ''}
            />
            <EditLink
              label={LANG.t('event.GearsToBring')}
              onPress={() => this._nextPage('gears')}
            />
            <EditLink
              label={LANG.t('event.DestinationDescription')}
              onPress={() => this._nextPage('destination')}
            />
            <EditLink
              label={LANG.t('event.EventNotes')}
              onPress={() => this._nextPage('notes')}
            />
          </View>
        </ScrollView>
        <CallToAction
          backgroundColor={(newEventActions.validateEvent(this.props.newEvent)) ? Graphics.colors.primary : Graphics.colors.darkGray}
          //disabled={!newEventActions.validateEvent(this.props.newEvent)}
          label={LANG.t('event.edit.Preview')}
          onPress={() => this._nextPage('preview')}
        />
      </View>
    )
  }
}

EditEvent.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  newEvent: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    newEvent: state.newEvent,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)

/*
            <EditLink
              label={LANG.t('event.EventPhotos')}
              onPress={() => this._nextPage('photos')}
              value={event.photos.length}
            />
*/