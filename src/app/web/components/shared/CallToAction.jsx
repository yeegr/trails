'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Graphics
} from '../../settings'

const CallToAction = (props) => {
  let bgColor = props.backgroundColor || Graphics.colors.primary,
    foregroundColor = props.textColor || Graphics.textColors.overlay,
    backgroundColor = (props.disabled) ? Graphics.colors.disabled : bgColor,
    color = (props.disabled) ? Graphics.textColors.disabled : foregroundColor

  return (
    <button
      onMouseUp={props.onPress}
      disabled={props.disabled}
      className="callToAction"
      style={[{backgroundColor}, {color}]}>
      {props.label}
    </button>
  )
}

CallToAction.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  disabled: PropTypes.bool
}

export default CallToAction