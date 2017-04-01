'use strict'

import React, {
  PropTypes
} from 'react'

import {Link} from 'react-router'

import Avatar from './Avatar'

const Selectable = (props) => {
  let value = null

  const icon = (props.icon) ? (
    <pictogram
      type="glyph"
      data-glyph={props.icon}
    />
  ) : null

  if (props.user) {
    value = <Avatar user={props.user} />
  } else if (props.value !== undefined) {
    if (props.value === true) {
      value = (
        <value>
          <pictogram
            type="glyph"
            data-glyph="checkmark"
          />
        </value>
      )
    } else if (typeof(props.value) === 'string') {
      value = (
        <value>{props.value}</value>
      )
    } else if (typeof(props.value) === 'number') {
      value = (
        <value>{props.value.toString()}</value>
      )
    }
  }

  return (
    <selectable onClick={props.onPress}>
      {icon}
      <label>{props.label}</label>
      {value}
    </selectable>
  )
}

Selectable.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onPress: PropTypes.func,
  user: PropTypes.object,
  icon: PropTypes.string,
  required: PropTypes.bool,
  validated: PropTypes.bool
}

export default Selectable
