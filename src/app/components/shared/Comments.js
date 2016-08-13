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
  ScrollView,
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
import {getTimeFromId, formatFromNow} from '../../../common'
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
      <View style={styles.global.wrapper}>
        <ScrollView style={{flex: 1, paddingTop: Graphics.statusbar.height + Graphics.titlebar.height + 15}}>
          <CommentList comments={comments} />
        </ScrollView>
        <InputBar
          type="comment"
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
    <ListView
      enableEmptySections={true}
      scrollEnabled={false}
      dataSource={dataSource.cloneWithRows(props.comments)}
      renderRow={renderRow}
    />
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
      marginBottom: 20,
      paddingHorizontal: 15
    },
    content: {
      flex: 1,
      marginLeft: 10,
      marginTop: 5
    },
    header: {
      flexDirection: 'row'
    }
  })

  return (
    <View style={styles.wrapper}>
      <Avatar user={user} />
      <View style={styles.content}>
        <View style={styles.header}>
          <TextView
            style={{flex: 1}} 
            class='h4' 
            text={user.handle}
          />
          <TextView 
            class='h4'
            text={getTimeFromId(comment._id).fromNow()}
          />
        </View>
        <Rating type="S" value={comment.rating} />
        <TextView text={comment.content} />
      </View>
    </View>
  )
}

export const CommentsPreview = (props) => {
  const average = props.data.ratingAverage,
    comments = props.data.comments,
    previews = comments.slice(0, AppSettings.maxCommentPreviews),
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