'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  StyleSheet,
  View,
} from 'react-native'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as commentsActions from '../../containers/actions/commentsActions'

import Loading from './Loading'
import Avatar from './Avatar'
import Header from './Header'
import InputBar from './InputBar'
import TextView from './TextView'
import Rating from './Rating'
import {formatFromNow} from '../../../common'
import styles from '../../styles/main'

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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
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
    const {comments, navigator} = this.props

    if (!comments) {
      return <Loading />
    }

    return (
      <View style={[styles.global.wrapper, {paddingTop: Graphics.statusbar.height + Graphics.titlebar.height + 20}]}>
        <CommentList comments={comments} />
        <InputBar
          type="comment"
          rating={this.state.rating}
          text={this.state.text}
          onSubmit={(comment) => this.uploadComment(comment)}
        />
        <KeyboardSpacer />
      </View>
    )
  }
}

const CommentList = (props) => {
  const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  }),
  
  renderRow = (rowData, sectionId, rowId) => {
    return (
      <Comment key={rowId} comment={rowData} />
    )
  }

  return (
    <View style={styles.detail.list}>
      <ListView
        enableEmptySections={true}
        scrollEnabled={false}
        style={{flex: 1}}
        dataSource={dataSource.cloneWithRows(props.comments)}
        renderRow={renderRow}
      />
    </View>
  )
},

Comment = (props) => {
  const comment = props.comment, 
  user = comment.creator,

  styles = StyleSheet.create({
    wrapper: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 20
    },
    content: {
      flex: 1,
      marginLeft: 10,
      marginTop: 5
    }
  })

  return (
    <View style={styles.wrapper}>
      <Avatar user={user} />
      <View style={styles.content}>
        <TextView class='h4' text={user.handle} />
        <TextView text={comment.content} />
      </View>
    </View>
  )
}

export const CommentsPreview = (props) => {
  const average = props.data.ratingAverage,
    comments = props.data.comments,
    previews = comments.slice(0, AppSettings.maxCommentsPreviewCount),
    more = {
      text: Lang.AllComments,
      onPress: () => {
        props.navigator.push({
          id: 'Comments',
          title: Lang.Comments,
          passProps: {
            type: props.type,
            data: props.data
          }
        })
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
    commentsActions: bindActionCreators(commentsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)