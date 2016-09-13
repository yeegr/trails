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
  ListView
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as postsActions from '../../redux/actions/postsActions'

import Loading from '../shared/Loading'
import PostCard from './PostCard'
import styles from '../../styles/main'

class PostList extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })
  }

  componentWillMount() {
    this.props.postsActions.listPosts(this.props.query)
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <PostCard
        key={rowId}
        navigator={this.props.navigator}
        data={rowData}
      />
    )
  }

  render() {
    const {posts, navigator} = this.props

    if (!posts) {
      return <Loading />
    }

    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        enableEmptySections={true}
        scrollEnabled={false}
        dataSource={this.dataSource.cloneWithRows(posts)}
        renderRow={this.renderRow}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postsActions: bindActionCreators(postsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
