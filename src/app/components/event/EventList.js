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
  ListView,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../redux/actions/eventsActions'

import Loading from '../shared/Loading'
import EventCard from './EventCard'
import styles from '../../styles/main'

class EventList extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })
  }

  componentDidMount() {
    this.props.eventsActions.listEvents(this.props.query)
  }

  componentWillUnmount() {
    this.props.eventsActions.listEvents(AppSettings.home.events + this.props.selectedCity)
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <EventCard navigator={this.props.navigator} data={rowData} key={rowId} />
    )
  }

  render() {
    const {events, navigator} = this.props

    if (!events) {
      return <Loading />
    }

    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        enableEmptySections={true}
        scrollEnabled={false}
        dataSource={this.dataSource.cloneWithRows(events)}
        renderRow={this.renderRow}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectedCity: state.navbar.selectedCity,
    selectedTab: state.home.selectedTab,
    events: state.events.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList)
