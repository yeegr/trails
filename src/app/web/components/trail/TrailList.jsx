'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import $ from 'jquery'

import TrailCard from './TrailCard'

import {
  CONSTANTS,
  LANG,
  UTIL,
  AppSettings
} from '../../../../common/__'

class TrailList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      trailList: []
    }
  }

  componentWillMount() {
    $.get(AppSettings.apiUri + 'trails/' + this.props.query, (trailList) => {
      this.setState({
        loading: false,
        trailList,
      })
    })
  }

  render() {
    if (this.state.loading) {
      return <list data-loading={true} />
    }

    return (
      <list>
        {
          this.state.trailList.map((trail, index) => {
            return (
              <TrailCard
                key={index}
                trail={trail}
              />
            )
          })
        }
      </list>
    )
  }
}

TrailList.propTypes = {
  query: PropTypes.string,
  trails: PropTypes.array
}

export default TrailList