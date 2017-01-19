'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Graphics
} from '../../settings'

const TagList = (props) => {
  if (props.tags.length < 1) {
    return null
  }

  let txt = '# ',
    style = {
      color: props.textColor || Graphics.textColors.overlay
    }

  props.tags.map((tag) => {
    txt += tag + ' '
  })

  return <p style={style}>{txt}</p>
}

TagList.propTypes = {
  tags: PropTypes.array,
  textColor: PropTypes.string
}

export default TagList