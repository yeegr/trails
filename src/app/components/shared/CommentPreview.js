'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View,
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../redux/actions/loginActions'

import Header from './Header'
import Rating from './Rating'
import CommentList from './CommentList'

import styles from '../../styles/main'

import {
  AppSettings,
  Lang
} from '../../settings'

const CommentPreview = (props) => {
  const average = props.data.ratingAverage,
    comments = props.data.comments,
    previews = comments.slice(0, AppSettings.maxCommentPreviews),
    more = {
      text: Lang.AllComments,
      onPress: () => {
        if (props.user) {
          props.navigator.push({
            id: 'Comments',
            title: Lang.Comments,
            passProps: {
              type: props.type,
              data: props.data
            }
          })
        } else {
          props.loginActions.showLogin()
        }
      }
    }

  return (
    <View style={styles.detail.section}>
      <Header 
        text={Lang.Comments}
        more={more}
        misc={
          <Rating type="default" value={average} />
        }
      />
      <CommentList comments={previews} />
    </View>
  )
}

CommentPreview.propTypes = {
  navigator: PropTypes.object.isRequired,
  loginActions: PropTypes.object.isRequired,
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
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentPreview)
