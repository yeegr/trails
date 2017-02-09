'use strict'

import React, {
  PropTypes
} from 'react'

import ImagePath from './ImagePath'

import {
  LANG
} from '../../settings'

const Gear = (props) => {
  const backgroundImage = {backgroundImage: 'url(' + ImagePath({type: 'gear', path: 'gears/' + props.number + '.jpg'}) + ')'},
    size = props.sideLength ? {width: props.sideLength, height: props.sideLength} : null,
    margin = props.margin ? {marginBottom: margin, marginRight: margin} : null,
    style = Object.assign(backgroundImage, size, margin)
  
  return (
    <gear style={style}>
      <gear-caption>
        {LANG.t('gears.' + props.number.toString())}
      </gear-caption>
    </gear>
  )
}

Gear.propTypes = {
  number: PropTypes.number.isRequired,
  sideLength: PropTypes.number,
  margin: PropTypes.number
}

export default Gear