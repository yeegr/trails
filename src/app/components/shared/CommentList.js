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
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import styles from '../../styles/main'
import Avatar from './Avatar'
import Header from './Header'
import {formatFromNow} from '../../../common'

export default class CommentList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.detail.list}>
      {
        this.props.comments.map(function(comment, i){
          return (
            <Comment key={i} comment={comment} />
          )
        })
      }
      </View>
    )
  }
}

export class CommentsPreview extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const comments = this.props.comments, 
      previews = comments.slice(0, AppSettings.maxCommentsPreviewCount),
      more = {
        text: Lang.AllComments,
        onPress: () => {
          props.navigator.push({
            id: 'CommentList',
            title: Lang.Photos,
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
}


export const Comment = (props) => {
  return (
    <View style={styles.detail.row}>
      <Avatar user={user} />
      <View style={styles.detail.hgroup}>
        <View style={styles.detail.split}>
          <Text style={[styles.global.title, {flex: 1}]}>{user.handle}</Text>
          <View style={{width: 100, height: 20}}>
            <Rating value={comment.rating} />
          </View>
        </View>
        <Text style={styles.global.subtitle}>{formatFromNow(comment.uploaded)}</Text>
        <Text style={local.CommentContent}>{comment.content}</Text>
      </View>
    </View>
  )
}

export const Rating = (props) => {
  return (
    <Svg style={local.Stars}>
      <Path fill={AppSettings.color.star} d={AppSettings.rating[props.value]} />
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
      <View style={styles.detail.row}>
        <Avatar user={user} />
        <View style={styles.detail.hgroup}>
          <View style={styles.detail.split}>
            <Text style={[styles.global.title, {flex: 1}]}>{user.handle}</Text>
            <View style={{width: 100, height: 20}}>
              <Rating value={comment.rating} />
            </View>
          </View>
          <Text style={styles.global.subtitle}>{formatFromNow(comment.uploaded)}</Text>
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
        <Path fill={AppSettings.color.star} d={AppSettings.rating[this.props.value]} />
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

