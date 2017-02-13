'use strict'

import React, {
  PropTypes
} from 'react'

import {
  LANG,
  Graphics
} from '../../settings'

const InputItem = (props) => {
  return (
    <row>
      <label>{props.label + ':'}</label>
      <span>{props.input}</span>
    </row>
  )
}

InputItem.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  required: PropTypes.bool,
  styles: PropTypes.object,
  inputStyle: PropTypes.string
}

export default InputItem