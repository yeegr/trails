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
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as commentActions from '../../containers/actions/commentActions'

import Avatar from './Avatar'
import Header from './Header'
import InputBar from './InputBar'
import TextView from './TextView'
import {formatFromNow} from '../../../common'
import styles from '../../styles/main'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.updateList = this.updateList.bind(this)

    this.state = {
      list: this.props.data.comments,
      text: ''
    }
  }

  componentDidMount() {
    //this.props.commentActions.loadComments(this.props.type, this.props.data.id)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  updateList(content) {
    let payload = {
      creator: this.props.user._id,
      target: this.props.type,
      ref: this.props.data._id,
      content
    }

    this.props.commentActions.createComment(payload)
  }

  render() {

    console.log(this.state.list)
    return (
      <View style={[styles.global.wrapper, {paddingTop: 64}]}>
        <CommentList comments={this.state.list} />
        <InputBar
          type="comment"
          onSubmit={(text) => this.updateList(text)}
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
}

const Comment = (props) => {
  if (props.comment !== null) {
    const comment = props.comment, 
    user = comment.user

    return (
      <TextView text={JSON.stringify(props.comment)} />
    )
  }
}
/*
      <View style={{flex: 1, flexDirection: 'row', paddingVertical: 10}}>
        <Avatar user={user} />
        <View style={{flex: 1, flexDirection: 'column', marginLeft: 10,}}>
          <View style={styles.detail.split}>
            <Text style={[{flex: 1}]}>{user.handle}</Text>
            <View style={{width: 100, height: 20}}>
              <Rating value={comment.rating} />
            </View>
          </View>
          <Text>{formatFromNow(comment.uploaded)}</Text>
          <Text style={local.CommentContent}>{comment.content}</Text>
        </View>
      </View>
*/
const CommentsPreview = (props) => {
  const comments = props.comments,
    previews = comments.slice(0, AppSettings.maxCommentsPreviewCount),
    more = {
      text: Lang.AllComments,
      onPress: () => {
        props.navigator.push({
          id: 'Comments',
          title: Lang.Comments,
          passProps: {
            data: props.comments
          }
        })
      }
    }

  return (
    <View style={styles.detail.section}>
      <Header text={Lang.Comments} more={more} />
      <CommentList comments={previews} />
    </View>
  )
}




export const Rating = (props) => {
  return (
    <Svg style={local.Stars}>
      <Path fill={Graphics.star.color} d={AppSettings.rating[props.value]} />
    </Svg>
  )
}

Rating.propTypes = {
  value: PropTypes.number.isRequired
}

const local = StyleSheet.create({
    CommentContent: {
      marginTop: 10,
    },
    Stars: {
      height: 20,
      width: 100,
    },
  })

export class Comment1 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const comment = this.props.comment,
      user = comment.user

    return (
      <View>
        <Avatar user={user} />
        <View style={{marginLeft: 10,}}>
          <View style={styles.detail.split}>
            <Text style={[{flex: 1}]}>{user.handle}</Text>
            <View style={{width: 100, height: 20}}>
              <Rating value={comment.rating} />
            </View>
          </View>
          <Text>{formatFromNow(comment.uploaded)}</Text>
          <Text style={commentStyles.content}>{comment.content}</Text>
        </View>
      </View>
    )
  }
}

export class Rating1 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Svg style={commentStyles.stars}>
        <Path fill={Graphics.star.color} d={AppSettings.rating[this.props.value]} />
      </Svg>
    )
  }
}



const commentStyles = StyleSheet.create({
    content: {
      marginTop: 10,
    },
    stars: {
      height: 20,
      width: 100,
    },
  })


function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    area: state.areas.area,
    trail: state.trails.trail,
    event: state.events.event,
    post: state.posts.post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    commentActions: bindActionCreators(commentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)