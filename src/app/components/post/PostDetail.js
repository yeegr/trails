'use strict'

import {
  AppSettings,
  Lang,
  Graphics,
  WebViewCSS
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as postsActions from '../../containers/actions/postsActions'
import {ACTION_TARGETS} from '../../../constants'

import Loading from '../shared/Loading'
import ParallaxView from 'react-native-parallax-view'
import Intro from '../shared/Intro'
import Header from '../shared/Header'
import Tag from '../shared/Tag'
import UserLink from '../user/UserLink'
import ActionBar from '../shared/ActionBar'
import WebViewWrapper from '../shared/WebViewWrapper'
import styles from '../../styles/main'

class PostDetail extends Component {
  constructor(props) {
    super(props)
    this.comment = this.comment.bind(this)
  }

  componentWillMount() {
    this.props.postsActions.getPost(this.props.id)
  }

  comment() {

  }

  render() {
    const {post, navigator} = this.props

    if (!post) {
      return <Loading />
    }

    return (
      <View style={styles.detail.wrapper}>
        <ParallaxView style={styles.detail.wrapper}
          backgroundSource={{uri: AppSettings.assetUri + post.hero}}
          windowHeight={Graphics.heroImage.height}
          scrollableViewStyle={{backgroundColor: AppSettings.color.background}}
          header={(
            <Intro
              align='bottom' 
              title={post.title} 
              excerpt={post.excerpt} 
              tags={post.tags}
            />
          )}>
          <View style={styles.detail.article}>
            <View>
              <View style={[styles.detail.content, {padding: 15}]}>
                <UserLink user={post.creator} navigator={navigator} showArrow={true} />
              </View>
            </View>
            <View style={styles.detail.section}>
              <WebViewWrapper html={post.content} url={AppSettings.baseUri + 'posts/post/' + post.id} />
            </View>
          </View>
        </ParallaxView>
        <ActionBar type={ACTION_TARGETS.POST} data={post} showLabel={true} buttonText={Lang.AddComment} buttonEvent={this.comment} />
      </View>
    )
  }
}

PostDetail.propTypes = {
  id: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postsActions: bindActionCreators(postsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
