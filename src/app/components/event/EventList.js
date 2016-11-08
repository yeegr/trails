'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  RefreshControl
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../redux/actions/eventsActions'

import Loading from '../shared/Loading'
import EventCard from './EventCard'

import {
  AppSettings
} from '../../settings'

class EventList extends Component {
  constructor(props) {
    super(props)
    this.fetchData = this.fetchData.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })
  }

  componentWillMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    this.props.eventsActions.listEvents(AppSettings.home.events + this.props.selectedCity)
  }

  fetchData() {
    this.props.eventsActions.listEvents(this.props.query)
  }

  onRefresh() {
    this.fetchData()
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <EventCard navigator={this.props.navigator} data={rowData} key={rowId} />
    )
  }

  render() {
    const {events} = this.props

    if (!events.list) {
      return <Loading />
    }

    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        enableEmptySections={true}
        refreshControl={
          <RefreshControl
            refreshing={events.isFetching}
            onRefresh={() => this.onRefresh()}
          />
        }
        scrollEnabled={true}
        dataSource={this.dataSource.cloneWithRows(events.list)}
        renderRow={this.renderRow}
      />
    )
  }
}

EventList.propTypes = {
  navigator: PropTypes.object.isRequired,
  eventsActions: PropTypes.object.isRequired,
  query: PropTypes.string,
  events: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    selectedCity: state.navbar.selectedCity,
    selectedTab: state.home.selectedTab,
    events: state.events
  }
}

function mapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList)
