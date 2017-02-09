'use strict'

import React, {
  PropTypes
} from 'react'

import {
  UTIL,
  Graphics
} from '../../settings'

const TagList = (props) => {
  if (props.tags.length < 1) {
    return null
  }

  let style = {
      color: props.textColor || Graphics.textColors.overlay,
      backgroundColor: props.backgroundColor || 'transparent'
    }

  if (UTIL.isNullOrUndefined(props.type)) {
    let txt = '# '

    props.tags.map((tag) => {
      txt += tag + ' '
    })

    return <p style={style}>{txt}</p>
  } else {
    return (
      <div>
        {
          props.tags.map((tag, index) => {
            return (
              <tag key={index}>{tag}</tag>
            )
          })
        }
      </div>
    )
  }
}

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
  type: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default TagList