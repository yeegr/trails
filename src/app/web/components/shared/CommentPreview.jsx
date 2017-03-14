'use strict'

import React, {
  PropTypes
} from 'react'

import {
  LANG,
  AppSettings
} from '../../../../common/__'

import Header from './Header'
import CommentView from './CommentView'

const CommentPreview = (props) => {
  const previews = props.comments.slice(0, AppSettings.maxCommentPreviewsPerTrail),
    more = (props.comments.length > AppSettings.maxCommentPreviewsPerTrail) ? {
      text: LANG.t('comment.MoreComments'),
      url: ''
    } : null

  return (
    <section>
      <Header
        text={LANG.t('comment.UserComments')}
        more={more}
      />
      <div>
        {
          previews.map((comment, i) => {
            return (
              <CommentView
                key={i}
                comment={comment} 
              />
            )
          })
        }
      </div>
    </section>
  )
}

CommentPreview.propTypes = {
  comments: PropTypes.array.isRequired,
  type: PropTypes.string,
  id: PropTypes.string
}

export default CommentPreview