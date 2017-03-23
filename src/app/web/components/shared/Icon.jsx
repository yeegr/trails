'use strict'

'use strict'

import React, {
  PropTypes
} from 'react'

const Icon = (props) => {
  let caption = props.caption ? (
      <tile-caption>
        {props.caption}
      </tile-caption>
    ) : null,
    value = props.value ? (
      <tile-value>
        {props.value}
      </tile-value>
    ) : null

  return (
    <tile>
      <pictogram
        type="glyph"
        data-glyph={props.glyph}
      />
      {caption}
      {value}
    </tile>
  )
}

Icon.propTypes = {
  glyph: PropTypes.string.isRequired,
  caption: PropTypes.string,
  value: PropTypes.string
}

export default Icon