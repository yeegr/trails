'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

import TrailInfo from './TrailInfo'
import TrailData from './TrailData'
import TrailMap from './TrailMap'
import UserLink from '../user/UserLink'

const TrailCard = (props) => {
  const {trail} = props

  return (
    <card type="info">
      <section>
        <Link to={`trails/${trail._id}`}>
          <TrailInfo
            type={trail.type}
            title={trail.title}
            date={trail.date}
          />
        </Link>
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
      <foot>
        <UserLink
          user={trail.creator}
        />
      </foot>
    </card>
  )
}

TrailCard.propTypes = {
  trail: PropTypes.object.isRequired
}

export default TrailCard