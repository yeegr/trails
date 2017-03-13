'use strict'

import React, {
  PropTypes
} from 'react'

const InfoItem = (props) => {
  let align = (props.align) ? {textAlign: props.align} : null,
    colon = (props.noColon) ? '' : ':'

  return (
    <row>
      <label>{props.label + colon}</label>
      <span style={align}>{props.value}</span>
      {props.more}
    </row>
  )
}

InfoItem.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
  align: PropTypes.string,
  noColon: PropTypes.bool,
  more: PropTypes.object
}

export default InfoItem