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
import * as postsActions from '../../redux/actions/postsActions'

import ImagePath from '../shared/ImagePath'
import Intro from '../shared/Intro'
import Header from '../shared/Header'
import Loading from '../shared/Loading'
import ParallaxView from 'react-native-parallax-view'
import Toolbar from '../shared/Toolbar'
import UserLink from '../user/UserLink'
import WebViewWrapper from '../shared/WebViewWrapper'

import {CommentsPreview} from '../shared/Comments'
import {ACTION_TARGETS, ASSET_FOLDERS} from '../../../util/constants'
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

    const url = ImagePath({type: 'hero', path: ASSET_FOLDERS.Post + '/' + post._id + '/' + post.hero})

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView
          style={{flex: 1}}
          backgroundSource={{uri: url}}
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
            <View style={{paddingHorizontal: 15}}>
              <UserLink user={post.creator} navigator={navigator} showArrow={true} />
            </View>
            <View style={[styles.detail.section, {paddingHorizontal: 10}]}>
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
