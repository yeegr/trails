'use strict'

import React, {
  PropTypes
} from 'react'

const ListItem = (props) => {
  return (
    <row>
      <pictogram
        shape="circle"
        data-value={props.value}
        data-glyph={props.glyph}
      />
      <info>
        <pretitle>{props.label}</pretitle>
        <title>{props.value}</title>
      </info>
    </row>
  )
}

ListItem.propTypes = {
  value: PropTypes.any,
  glyph: PropTypes.string,
  label: PropTypes.string,
  onPress: PropTypes.func
}

export default ListItem