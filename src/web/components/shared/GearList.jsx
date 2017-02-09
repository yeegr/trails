'use strict'

import React, {
  PropTypes
} from 'react'

import $ from 'jquery'

import Gear from './Gear'

const GearList = (props) => {
  if (props.list.length < 1) {
    return null
  }

  const n = 4,
    margin = 16,
    sideLength = Math.floor(($(window).width() - margin * (n + 1)) / n)

  return (
    <grid>
      {
        props.list.map((number) => {
          return (
            <Gear
              key={number}
              number={number}
              sideLength={sideLength}
              margin={margin}
            />
          )
        })
      }
    </grid>
  )
}

GearList.propTypes = {
  list: PropTypes.array.isRequired
}

export default GearList