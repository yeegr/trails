'use strict'

import React, {
  PropTypes
} from 'react'

import {Link} from 'react-router'

import Hero from '../shared/Hero'
import Inset from '../shared/Inset'

import {
  CONSTANTS,
  LANG
} from '../../../../common/__'

const AreaCard = (props) => {
  const {data} = props,
    imageUri = CONSTANTS.ASSET_FOLDERS.AREA + '/' + data._id + '/' + data.hero

  let tags = []

  if (data.tags.length > 0) {
    data.tags.map(function(n) {
      tags.push(LANG.t('tags.' + n))
    })
  }

  return (
    <Link to={`/areas/${data._id}`}>
      <Hero
        imageUri={imageUri}
        inset={
          <Inset
            title={LANG.t('cities.byCode.' + data.city) + ' ' + data.name}
            excerpt={data.excerpt}
            tags={tags}
          />
        }
      />
    </Link>
  )
}

AreaCard.propTypes = {
  data: PropTypes.object.isRequired
}

export default AreaCard