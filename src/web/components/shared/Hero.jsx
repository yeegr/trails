'use strict'

import React, {
  PropTypes
} from 'react'

const Hero = (props) => {
  return (
    <hero style={{url: 'url("")'}}>
      <intro>
        <p>{props.title}</p>
      </intro>
    </hero>
  )
}

Hero.propTypes = {
  imageUri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  tags: PropTypes.array,
  onPress: PropTypes.func
}

export default Hero