'use strict'

import {Graphics} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import TextView from './TextView'

export const TagList = (props) => {
  if (props.tags.length > 0) {
    let txt = '# ',
      textColor = props.textColor || Graphics.textColors.overlay

    props.tags.map(function(tag) {
      txt += tag + ' '
    })

    return <TextView textColor={textColor} text={txt} />
  } else {
    return null
  }
}

TagList.propTypes = {
  tags: PropTypes.array.isRequired
}

export default TagList