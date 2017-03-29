'use strict'

import React, {
  PropTypes
} from 'react'

import {Link} from 'react-router'

const InfoItem = (props) => {
  let align = (props.align) ? {textAlign: props.align} : null,
    colon = (props.noColon) ? '' : ':',
    more = (props.more) ? (
      (props.more.onPress) ? (
        <Link className="link" to={props.more.onPress}>{props.more.label}</Link>
      ) : (
        <span className="link">{props.more.label}</span>
      )
    ) : null

  return (
    <row>
      <label>{props.label + colon}</label>
      <span style={align}>{props.value}</span>
      {more}
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