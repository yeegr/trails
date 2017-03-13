'use strict'

import React, {
  PropTypes
} from 'react'

const Modal = (props) => {
  const styles = {
    background: {
      backgroundImage: 'url(' + props.backgroundSource + ')'
    },
    transparent: {
      backgroundColor: 'transparent'
    },
    hidden: {
      top: '-100%'
    },
    visible: {
      top: '0'
    }
  }

  const background = (props.backgroundSource) ? styles.background : null,
    transparent = props.transparent || false,
    transparency = (transparent) ? styles.transparent : null,
    visible = props.visible || false,
    visibility = (visible) ? styles.visible : styles.hidden

  return (
    <modal style={Object.assign({}, transparency, background, visibility)}>
      {props.content}
      <button data-glyph="close" onClick={props.close} />
    </modal>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  backgroundSource: PropTypes.string,
  content: PropTypes.object,
  close: PropTypes.func
}

export default Modal