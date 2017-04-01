'use strict'

import React, {
  PropTypes
} from 'react'

import ImagePath from './ImagePath'

import {
  LANG
} from '../../../../common/__'

const Gear = (props) => {
  const backgroundImage = 'url(' + ImagePath({type: 'gear', path: 'gears/' + props.number + '.jpg'}) + ')'
  
  return (
    <gear style={{backgroundImage}}>
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