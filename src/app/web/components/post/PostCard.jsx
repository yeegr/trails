'use strict'

import React, {
  PropTypes
} from 'react'

import {Link} from 'react-router'

import Hero from '../shared/Hero'
import Card from '../shared/Card'

import {
  CONSTANTS
} from '../../../../common/__'

const PostCard = (props) => {
  const {data} = props,
    imageUri = CONSTANTS.ASSET_FOLDERS.POST + '/' + data._id + '/' + data.hero

  return (
    <Link to={`/posts/${data._id}`}>
      <Hero
        imageUri={imageUri}
        card={
          <Card
            title={data.title}
            excerpt={data.excerpt}
            tags={data.tags}
          />
        }
      />
    </Link>
  )
}

PostCard.propTypes = {
  data: PropTypes.object.isRequired
}

export default PostCard