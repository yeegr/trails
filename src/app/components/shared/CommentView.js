'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import Avatar from './Avatar'
import TextView from './TextView'
import Rating from './Rating'

import {
  UTIL
} from '../../settings'

const CommentView = (props) => {
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
            class={'h4'} 
            text={user.handle}
          />
          <TextView 
            class={'h4'}
            text={UTIL.getTimeFromId(comment._id).fromNow()}
          />
        </View>
        <Rating type={'S'} value={comment.rating} />
        <TextView text={comment.content} />
      </View>
    </View>
  )
}

CommentView.propTypes = {
  comment: PropTypes.object.isRequired
}

export default CommentView
