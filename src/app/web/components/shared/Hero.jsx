'use strict'

import React, {
  PropTypes
} from 'react'

import ImagePath from './ImagePath.jsx'

const Hero = (props) => {
  const uri = ImagePath({type: 'hero', path: props.imageUri}),
    backgroundImage = 'url(' + uri + ')'

  return (
    <hero style={{backgroundImage}}>
      {props.card || null}
    </hero>
  )
}

Hero.propTypes = {
  imageUri: PropTypes.string.isRequired,
  card: PropTypes.object,
  onPress: PropTypes.func
}

export default Hero