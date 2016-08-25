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
  View
} from 'react-native'

import Moment from 'moment'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import EditLink from '../shared/EditLink'
import DateTimePicker from '../shared/DateTimePicker'
import CallToAction from '../shared/CallToAction'
import styles from '../../styles/main'

class EditEventGroups extends Component {
  constructor(props) {
    super(props)
    this.getDate = this.getDate.bind(this)
    this.setDate = this.setDate.bind(this)

    this.state = {
      groups: this.props.groups,
      showDateTimePicker: false,
      currentGroupIndex: 0
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setEventGroups(this.state.groups)
  }

  getDate(timestamp) {
    let d = new Date()
    d.setTime(timestamp)
    return d
  }

  setDate(date) {
    let time = (new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)).getTime(),
      groups = this.state.groups,
      index = this.state.currentGroupIndex

    if (index) {
      groups[index] = time
    } else {
      let exists = false

      for (var i = 0, j = groups.length; i < j; i++) {
        if (groups[i] === time) {
          exists = true
          break
        }
      }

      if (!exists) {
        groups.push(time)
      }
    }

    groups.sort()

    this.setState({
      showDateTimePicker: false,
      currentGroupIndex: null,
      groups
    })
  }

  render() {
    let minimumDate = Moment(new Date()).add(1, 'days').toDate()

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            {
              this.state.groups.map((date, index) => {
                return (
                  <EditLink
                    key={index}
                    label={Lang.SelectDate}
                    value={Moment(date).format('LL')}
                    onPress={() => this.setState({showDateTimePicker: true, currentGroupIndex: index})}
                  />
                )
              })
            }
          </View>
        </ScrollView>
        <CallToAction 
          onPress={() => this.setState({showDateTimePicker: true, currentGroupIndex: null})}
          label={Lang.AddGroup}
          backgroundColor={Graphics.colors.primary}
        />
        <DateTimePicker
          mode="date"
          cancelText={Lang.Cancel} 
          confirmText={Lang.Confirm}
          minimumDate={minimumDate}
          showPicker={this.state.showDateTimePicker}
          datetime={this.getDate(this.state.currentGroupDate)}
          onConfirm={(value) => this.setDate(value)}
          onCancel={() => this.setState({showDateTimePicker: false})}
        />
      </View>
    )
  }
}

EditEventGroups.propTypes = {
  groups: PropTypes.array.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEventGroups)