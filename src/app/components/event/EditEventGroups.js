'use strict'

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

import {
  Lang,
  Graphics
} from '../../settings'

class EditEventGroups extends Component {
  constructor(props) {
    super(props)
    this.getDate = this.getDate.bind(this)
    this.setDate = this.setDate.bind(this)

    this.state = {
      groups: this.props.groups,
      showDateTimePicker: false,
      currentGroupIndex: -1
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

  setDate(dt) {
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
    let minimumDate = Moment(new Date()).add(1, 'days').toDate()

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            {
              this.state.groups.map((group, index) => {
                return (
                  <EditLink
                    key={index}
                    label={Lang.SelectDate}
                    value={Moment(group.startDate).format('LL')}
                    onPress={() => this.setState({showDateTimePicker: true, currentGroupIndex: index})}
                  />
                )
              })
            }
          </View>
        </ScrollView>
        <CallToAction 
          onPress={() => this.setState({showDateTimePicker: true, currentGroupIndex: -1})}
          label={Lang.AddGroup}
          backgroundColor={Graphics.colors.primary}
        />
        <DateTimePicker
          mode={'date'}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEventGroups)