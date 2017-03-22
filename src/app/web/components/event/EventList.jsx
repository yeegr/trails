'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../../redux/actions/eventsActions'

import EventCard from './EventCard'

class EventList extends Component {
  constructor(props) {
    super(props)
    this.fetchData = this.fetchData.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
  }

  componentWillMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    eventsActions.resetEventList()
  }

  fetchData() {
    this.props.eventsActions.listEvents(this.props.query)
  }

  _onRefresh() {
    this.fetchData()
  }

  render() {
    const {events} = this.props,
      loading = (events.length < 1)

    return (
      <catalog data-loading={loading}>
        {
          events.map((event, index) => {
            return (
              <EventCard
                key={index}
                data={event}
              />
            )
          })
        }
      </catalog>
    )
  }
}

EventList.propTypes = {
  eventsActions: PropTypes.object.isRequired,
  query: PropTypes.string,
  events: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  return {
    events: state.events.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList)
