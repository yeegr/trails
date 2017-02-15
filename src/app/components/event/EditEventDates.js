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
import * as newEventActions from '../../redux/actions/newEventActions'

import EditLink from '../shared/EditLink'
import DateTimePicker from '../shared/DateTimePicker'

import styles from '../../styles/main'

import {
  LANG,
  Lang
} from '../../settings'

class EditEventDates extends Component {
  constructor(props) {
    super(props)
    this.props.navigator.__addDate = this._addDate.bind(this)
    this._getDate = this._getDate.bind(this)
    this._setDate = this._setDate.bind(this)

    this.state = {
      groups: this.props.groups,
      showDateTimePicker: false,
      currentGroupIndex: -1
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setEventGroups(this.state.groups)
  }

  _addDate() {
    this.setState({
      showDateTimePicker: true,
      currentGroupIndex: -1
    })
  }

  _getDate(timestamp) {
    let d = new Date()
    d.setTime(timestamp)
    return d
  }

  _setDate(dt) {
    let groups = this.state.groups,
      index = this.state.currentGroupIndex,
      time = (new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0, 0)).getTime()

    if (index > -1) {
      groups.splice(index, 1)
    }

    groups.push({
      startDate: time,
      deadline: time - 86400000
    })

    groups.sort((a, b) => {
      return (a.startDate > b.startDate)
    })

    this.setState({
      showDateTimePicker: false,
      currentGroupIndex: null,
      groups
    })
  }

  render() {
    let minimumDate = moment(new Date()).add(1, 'days').toDate()

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            {
              this.state.groups.map((group, index) => {
                return (
                  <EditLink
                    key={index}
                    label={LANG.t('event.GroupCount', {count: LANG.t('alphanumerals.' + index)})}
                    value={moment(group.startDate).format('LL')}
                    onPress={() => this.setState({showDateTimePicker: true, currentGroupIndex: index})}
                  />
                )
              })
            }
          </View>
        </ScrollView>
        <DateTimePicker
          mode={'date'}
          title={LANG.t('event.edit.AddDate')}
          cancelText={LANG.t('glossary.Cancel')} 
          confirmText={LANG.t('glossary.Confirm')}
          minimumDate={minimumDate}
          showPicker={this.state.showDateTimePicker}
          datetime={this._getDate(this.state.currentGroupDate)}
          onConfirm={(value) => this._setDate(value)}
          onCancel={() => this.setState({showDateTimePicker: false})}
        />
      </View>
    )
  }
}

EditEventDates.propTypes = {
  navigator: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  newEventActions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    groups: state.newEvent.groups
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventDates)