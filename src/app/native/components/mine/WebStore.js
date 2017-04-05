'use strict'

import React, {
  PropTypes
} from 'react'

import Empty from '../shared/Empty'

const WebStore = (props) => {
  return (
    <Empty />
  )
}

WebStore.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default WebStore