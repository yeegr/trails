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
      <section className="header">
        <Link to={`trails/${trail._id}`}>
          <TrailInfo
            type={trail.type}
            title={trail.title}
            date={trail.date}
          />
        </Link>
      </section>
      <section className="grid">
        <TrailData
          difficultyLevel={trail.difficultyLevel}
          totalDuration={trail.totalDuration}
          totalDistance={trail.totalDistance}
          totalElevation={trail.totalElevation}
          maximumAltitude={trail.maximumAltitude}
          averageSpeed={trail.averageSpeed}
        />
      </section>
      <section>
        <TrailMap
          id={trail._id}
          points={trail.points}
        />
      </section>
      <section className="footer">
        <UserLink
          user={trail.creator}
        />
      </section>
    </card>
  )
}

TrailCard.propTypes = {
  trail: PropTypes.object.isRequired
}

export default TrailCard