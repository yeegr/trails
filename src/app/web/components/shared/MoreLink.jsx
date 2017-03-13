'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

const MoreLink = (props) => {
  const _onClick = () => {
    switch (props.target) {
      case 'gallery':
        localStorage.setItem('gallery', JSON.stringify(props.data))
      break
    }
  }

  return (
    <Link className="text-more" onClick={_onClick} to={props.path}>
      {props.text}
    </Link>
  )
}

MoreLink.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  data: PropTypes.any
}

export default MoreLink