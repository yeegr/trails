'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as postsActions from '../../../redux/actions/postsActions'

import PostCard from './PostCard'

class PostList extends Component {
  constructor(props) {
    super(props)
    this.fetchData = this.fetchData.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
  }

  componentWillMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    postsActions.resetPostList()
  }

  fetchData() {
    this.props.postsActions.listPosts(this.props.query)
  }

  _onRefresh() {
    this.fetchData()
  }

  render() {
    const {posts} = this.props,
      loading = (posts.length < 1)

    return (
      <catalog data-loading={loading}>
        {
          posts.map((post, index) => {
            return (
              <PostCard
                key={index}
                data={post}
              />
            )
          })
        }
      </catalog>
    )
  }
}

PostList.propTypes = {
  postsActions: PropTypes.object.isRequired,
  query: PropTypes.string,
  posts: PropTypes.array
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
