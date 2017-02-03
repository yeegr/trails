'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import EditLink from '../shared/EditLink'

import styles from '../../styles/main'

import {
  LANG
} from '../../settings'

class EditGears extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)
  }

  _nextPage(type) {
    let id = null,
      title = null

    switch (type) {
      case 'images':
        id = 'EditGearImages',
        title = LANG.t("event.edit.SelectGears")
      break

      case 'tags':
        id = 'EditGearTags',
        title = LANG.t("event.OtherGears")
      break

      case 'notes':
        id = 'EditGearNotes',
        title = LANG.t("event.GearNotes")
      break
    }

    if (id !== null && title !== null) {
      this.props.navigator.push({
        id,
        title
      })
    }
  }

  render() {
    const gears = this.props.gears

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t("event.edit.SelectGears")}
              onPress={() => this._nextPage('images')}
              value={gears.images.length}
            />
            <EditLink
              label={LANG.t("event.OtherGears")}
              onPress={() => this._nextPage('tags')}
              value={gears.tags.length}
            />
            <EditLink
              label={LANG.t("event.GearNotes")}
              onPress={() => this._nextPage('notes')}
              value={gears.notes.length}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditGears.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  gears: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    gears: state.newEvent.gears
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGears)
