'use strict'

import React, {
  PropTypes
} from 'react'

import TagList from './TagList.jsx'

const Card = (props) => {
  const excerpt = (props.excerpt) ? (
      <p className="excerpt">
        {props.excerpt}
      </p>
    ) : null,
    tags = (props.tags) ? (
      <div className="tags">
        <TagList tags={props.tags} />
      </div>
    ) : null,
    bottomLeft = (props.bottomLeft) ? (
      <corner style="left: 0; bottom: 0;">
        {props.bottomLeft}
      </corner>
    ) : null,
    bottomRight = (props.bottomRight) ? (
      <corner style="right: 0; bottom: 0; text-align: right;">
        {props.bottomRight}
      </corner>
    ) : null,
    topLeft = (props.topLeft) ? (
      <corner style="left: 0; top: 0;">
        {props.topLeft}
      </corner>
    ) : null,
    topRight = (props.topRight) ? (
      <corner style="right: 0; top: 0; text-align: right;">
        {props.topRight}
      </corner>
    ) : null

  return (
    <card>
      <div>
        <p className="title">{props.title}</p>
        {excerpt}
        {tags}
      </div>
      {bottomLeft}
      {bottomRight}
      {topLeft}
      {topRight}
    </card>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  tags: PropTypes.array,
  topLeft: PropTypes.object,
  topRight: PropTypes.object,
  bottomLeft: PropTypes.object,
  bottomRight: PropTypes.object
}

export default Card