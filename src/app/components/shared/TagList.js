'use strict'

import React, {
  PropTypes
} from 'react'

import TextView from './TextView'

import {
  Graphics
} from '../../settings'

const TagList = (props) => {
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
  tags: PropTypes.array,
  textColor: PropTypes.string
}

export default TagList