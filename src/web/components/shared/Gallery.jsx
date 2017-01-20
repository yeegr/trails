'use strict'

import React, {
  PropTypes
} from 'react'

import ImagePath from './ImagePath'

const Gallery = (props) => {
  let {type, id, photos} = props,
    path = type + '/' + id + '/'

  let grid = photos.map((photo, i) => {
    let backgroundImage = 'url(' + ImagePath({type: 'thumb', path: path + photo.url}) + ')'

    return (
      <photo key={i} style={{backgroundImage}} />
    )
  })

  if (props.style === "preview") {
    return (
      <preview>{grid}</preview>
    )
  } else {
    return (
      <gallery>{grid}</gallery>
    )
  }
}

Gallery.propTypes = {
  photos: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  style: PropTypes.string
}

export default Gallery