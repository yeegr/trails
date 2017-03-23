'use strict'

import React, {
  PropTypes
} from 'react'

import Avatar from './Avatar'

import {
  UTIL
} from '../../../../common/__'

const CommentView = (props) => {
  const comment = props.comment, 
    user = comment.creator

  return (
    <row>
      <Avatar user={user} />
      <info>
        <div>
          <title>{user.handle}</title>
        </div>
        <div className="split">
          <span>
            <rating data-value={comment.rating} />
          </span>
          <span>
            <datetime>{UTIL.getTimeFromId(comment._id).fromNow()}</datetime>
          </span>
        </div>
        <div
          className="html-content"
          dangerouslySetInnerHTML={UTIL.createMarkup(comment.content)}
        />
      </info>
    </row>
  )
}

CommentView.propTypes = {
  comment: PropTypes.object.isRequired
}

export default CommentView
