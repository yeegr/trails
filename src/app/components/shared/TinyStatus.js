'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import Stat from './Stat'

import {
  Graphics
} from '../../settings'

const TinyStatus = (props) => {
  const data = props.data,
    likeIcon = (data.likeCount > 0) ? (
      <Stat 
        path={Graphics.toolbar.like}
        value={data.likeCount}
      />
    ) : null,
    saveIcon = (data.saveCount > 0) ? (
      <Stat 
        path={Graphics.toolbar.save}
        value={data.saveCount}
      />
    ) : null,
    shareIcon = (data.shareCount > 0) ? (
      <Stat 
        path={Graphics.toolbar.share}
        value={data.shareCount}
      />
    ) : null,
    commentIcon = (data.commentCount > 0) ? (
      <Stat 
        path={Graphics.toolbar.comment}
        value={data.commentCount}
      />
    ) : null
  
  return (
    <View style={styles.wrapper}>
      {likeIcon}
      {saveIcon}
      {shareIcon}
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'flex-end'
  }
})

TinyStatus.propTypes = {
  data: PropTypes.object.isRequired
}

export default TinyStatus
