'use strict'

import React, {
  PropTypes
} from 'react'

const SimpleContact = (props) => {
  return (
    <contact style={{marginBottom: '8px'}}>
      <span style={{fontSize: props.fontSize}}>
        {props.label}
        </span>
      <span className="alt" style={{fontSize: props.fontSize}}>
        {props.alt}
      </span>
      <a className="tel" style={{fontSize: props.fontSize}} href={"tel:" + props.number}>
        {props.number}
      </a>
    </contact>
  )
}

SimpleContact.propTypes = {
  label: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  alt: PropTypes.string,
  fontSize: PropTypes.string
}

export default SimpleContact