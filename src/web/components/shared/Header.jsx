'use strict'

import React, {
  PropTypes
} from 'react'

import MoreLink from './MoreLink'

const Header = (props) => {
  let moreLink = null

  if (props.more) {
    moreLink = <MoreLink {...props.more} />
  }

  return (
    <header>
      <h1>{props.text}</h1>
      {moreLink}
    </header>
  )
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  more: PropTypes.object
}

export default Header