'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  View,
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as commentsActions from '../../redux/actions/commentsActions'
import * as loginActions from '../../redux/actions/loginActions'

import Loading from './Loading'
import InputBar from './InputBar'

import CommentList from './CommentList'

import styles from '../../styles/main'

import {
  Lang,
  Graphics
} from '../../settings'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.uploadComment = this.uploadComment.bind(this)

    this.state = {
      rating: 0,
      text: ''
    }
  }

  componentDidMount() {
    this.props.commentsActions.listComments(this.props.type, this.props.data.id)
  }

  uploadComment(input) {
    let payload = {
      creator: this.props.user._id,
      target: this.props.type,
      ref: this.props.data._id,
      rating: input.rating,
      content: input.comment
    }

    this.props.commentsActions.createComment(payload)
  }

  render() {
    const {comments} = this.props

    if (!comments) {
      return <Loading />
    }

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={{flex: 1, paddingTop: Graphics.page.marginTop + 15}}>
          <CommentList comments={comments} />
        </ScrollView>
        <InputBar
          type={'comment'}
          rating={this.state.rating}
          text={this.state.text}
          placeholder={Lang.CommentPlaceholder}
          onSubmit={(comment) => this.uploadComment(comment)}
        />
        <KeyboardSpacer />
      </View>
    )
  }
}

Comments.propTypes = {
  navigator: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  commentsActions: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    area: state.areas.area,
    trail: state.trails.trail,
    event: state.events.event,
    post: state.posts.post,
    comments: state.comments.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    commentsActions: bindActionCreators(commentsActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
