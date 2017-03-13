'use strict'

import React, {
  PropTypes
} from 'react'

import ImagePath from './ImagePath'

const Gallery = (props) => {
  let {type, id, photos} = props,
    path = type + '/' + id + '/'

  if (!photos && props.location) {
    let pathname = props.location.pathname
    path = pathname.substring(0, pathname.indexOf('/gallery') + 1)
    photos = JSON.parse(localStorage.getItem('gallery'))
  }
  
  let grid = photos.map((photo, i) => {
    let backgroundImage = 'url(' + ImagePath({type: 'thumb', path: path + photo.url}) + ')'

    return (
      <photo
        key={i}
        style={{backgroundImage}}
      />
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
  photos: PropTypes.array,
  type: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.string,
  location: PropTypes.object
}

export default Gallery