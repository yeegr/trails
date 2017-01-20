'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

const MoreLink = (props) => {
  return (
    <Link className="text-more" to={props.url}>
      {props.text}
    </Link>
  )
}

MoreLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default MoreLink