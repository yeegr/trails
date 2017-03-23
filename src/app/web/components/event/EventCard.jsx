'use strict'

import React, {
  PropTypes
} from 'react'

import {Link} from 'react-router'

import Hero from '../shared/Hero'
import Inset from '../shared/Inset'

import {
  CONSTANTS
} from '../../../../common/__'

const EventCard = (props) => {
  const {data} = props,
    imagePath = ((data.hero.indexOf('default/') === 0) ? '' : data._id + '/') + data.hero,
    imageUri = CONSTANTS.ASSET_FOLDERS.EVENT + '/' + imagePath
      
  return (
    <Link to={`/events/${data._id}`}>
      <Hero
        imageUri={imageUri}
        inset={
          <Inset
            title={data.title}
            excerpt={data.excerpt}
            tags={data.tags}
          />
        }
      />
    </Link>
  )
}

EventCard.propTypes = {
  data: PropTypes.object.isRequired
}

export default EventCard