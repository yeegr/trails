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

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as postsActions from '../../containers/actions/postsActions'

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

  componentDidMount() {
    let params = this.props.query || this.props.params
    this.props.postsActions.listPosts(params)
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <PostCard navigator={this.props.navigator} data={rowData} key={rowId} />
    )
  }

  render() {
    const {posts, navigator} = this.props

    if (!posts) {
      return <Loading />
    }

    return (
      <ListView
        enableEmptySections={true}
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
