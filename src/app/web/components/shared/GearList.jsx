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

  return (
    <grid>
      {
        props.list.map((number) => {
          return (
            <Gear
              key={number}
              number={number}
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