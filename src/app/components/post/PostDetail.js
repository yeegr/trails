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
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as postsActions from '../../containers/actions/postsActions'
import {ACTION_TARGETS} from '../../../util/constants'

import Loading from '../shared/Loading'
import ParallaxView from 'react-native-parallax-view'
import Intro from '../shared/Intro'
import Toolbar from '../shared/Toolbar'
import Header from '../shared/Header'
import UserLink from '../user/UserLink'
import WebViewWrapper from '../shared/WebViewWrapper'
import {CommentsPreview} from '../shared/Comments'
import styles from '../../styles/main'

class PostDetail extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.postsActions.getPost(this.props.id)
  }

  render() {
    const {post, navigator} = this.props

    if (!post) {
      return <Loading />
    }

    let commentsPreview = (post.comments.length > 0) ? (
      <CommentsPreview 
        navigator={navigator}
        type={ACTION_TARGETS.POST}
        data={post}
        user={this.props.user}
      />
    ) : null

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView
          style={{flex: 1}}
          backgroundSource={{uri: AppSettings.assetUri + post.hero}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
              align="bottom"
              title={post.title}
              tags={post.tags}
            />
          )}>
          <View style={styles.detail.article}>
            <View style={styles.detail.toolbar}>
              <Toolbar
                navigator={navigator}
                type={ACTION_TARGETS.POST}
                data={post}
              />
            </View>
            <View style={[styles.detail.content, {padding: 15}]}>
              <UserLink user={post.creator} navigator={navigator} showArrow={true} />
            </View>
            <View style={styles.detail.section}>
              <WebViewWrapper html={post.content} url={AppSettings.baseUri + 'posts/post/' + post.id} />
            </View>
            {commentsPreview}
          </View>
        </ParallaxView>
      </View>
    )
  }
}

PostDetail.propTypes = {
  id: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.post,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postsActions: bindActionCreators(postsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
