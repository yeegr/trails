'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  View
} from 'react-native'

import moment from 'moment'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../../redux/actions/newEventActions'

import EditLink from '../shared/EditLink'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  AppSettings
} from '../../../../common/__'

class EditEventInfo extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)
  }

  _nextPage(type) {
    let id = null,
      title = null,
      props = {}

    switch (type) {
      case 'description':
        id = 'EditEventDescription',
        title = LANG.t('event.edit.EventDescription')
      break

      case 'excerpt':
        id = 'EditEventExcerpt',
        title = LANG.t('event.edit.EventExcerpt')
      break

      case 'tags':
        id = 'EditEventTags',
        title = LANG.t('event.edit.EventTags')
      break

      case 'destination':
        id = 'EditEventDestination',
        title = LANG.t('event.DestinationDescription')
      break

      case 'notes':
        id = 'EditEventNotes',
        title = LANG.t('event.EventNotes')
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

  render() {
    const event = this.props.newEvent

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t('event.edit.EventDescription')}
              onPress={() => this._nextPage('description')}
              value={event.description}
            />
            <EditLink
              label={LANG.t('event.edit.EventExcerpt')}
              onPress={() => this._nextPage('excerpt')}
              value={event.excerpt}
            />
            <EditLink
              label={LANG.t('event.edit.EventTags')}
              onPress={() => this._nextPage('tags')}
              value={('# ' + event.tags.join(', '))}
            />
          </View>
          <View style={styles.editor.group}>
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
      </View>
    )
  }
}

EditEventInfo.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEventInfo)
