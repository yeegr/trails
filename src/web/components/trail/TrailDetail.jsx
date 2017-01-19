'user strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

import $ from 'jquery'

import TrailInfo from './TrailInfo'
import TrailData from './TrailData'
import TrailMap from './TrailMap'
import TrailChart from './TrailChart'
import UserLink from '../user/UserLink'

import {
  AppSettings,
  LANG
} from '../../settings'

class TrailDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    $.get(AppSettings.apiUri + 'trails/' + this.props.routeParams.id, (trail) => {
      this.setState({
        trail,
        loading: false
      })
    })
  }

  render() {
    if (this.state.loading === true) {
      return (
        <detail data-loading />
      )
    }

    const {trail} = this.state

    return (
      <detail>
        <main>
          <section>
            <TrailInfo 
              type={trail.type}
              title={trail.title}
              date={trail.date}
            />
          </section>
          <section>
            <TrailData
              difficultyLevel={trail.difficultyLevel}
              totalDuration={trail.totalDuration}
              totalDistance={trail.totalDistance}
              totalElevation={trail.totalElevation}
              maximumAltitude={trail.maximumAltitude}
              averageSpeed={trail.averageSpeed}
            />
          </section>
          <section className="map">
            <TrailMap
              id={trail._id}
              points={trail.points}
            />
          </section>
          <section className="chart">
            <TrailChart
              points={trail.points}
            />
          </section>
          <section>
            <UserLink user={trail.creator} />
          </section>
          <section>
          </section>
        </main>
      </detail>
    )
  }
}

TrailDetail.propTypes = {
  id: PropTypes.string
}

export default TrailDetail