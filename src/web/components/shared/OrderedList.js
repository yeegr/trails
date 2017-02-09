'use strict'

import React, {
  PropTypes
} from 'react'

const OrderedList = (props) => {
  return (
    <ol>
      {
        props.content.map((item, index) => {
          return (
            <li key={index}>
              {item}
            </li>
          )
        })
      }
    </ol>
  )
}

OrderedList.propTypes = {
  content: PropTypes.array.isRequired
}

export default OrderedList