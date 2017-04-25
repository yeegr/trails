'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View,
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActions from '../../../redux/actions/userActions'

import Header from './Header'
import Rating from './Rating'
import CommentList from './CommentList'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings
} from '../../../../common/__'

const CommentPreview = (props) => {
  const average = props.data.ratingAverage,
    comments = props.data.comments,
    previews = comments.slice(0, AppSettings.maxCommentPreviews),
    more = {
      text: LANG.t('comment.AllComments'),
      onPress: () => {
        if (props.user) {
          props.navigator.push({
            id: 'Comments',
            title: LANG.t('comment.comment_plural'),
            passProps: {
              type: props.type,
              data: props.data
            }
          })
        } else {
          props.userActions.showLogin()
        }
      }
    }

  return (
    <View style={styles.detail.section}>
      <Header 
        text={LANG.t('comment.comment_plural')}
        more={more}
        misc={
          <Rating type={'default'} value={average} />
        }
      />
      <CommentList comments={previews} />
    </View>
  )
}

CommentPreview.propTypes = {
  navigator: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    comments: state.comments.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentPreview)
