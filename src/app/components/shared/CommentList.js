'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ListView
} from 'react-native'

import Comment from './Comment'

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
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentList