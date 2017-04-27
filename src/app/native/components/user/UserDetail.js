'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Text,
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showLogin} from '../../../redux/actions/userActions'

import Avatar from '../shared/Avatar'
import CallToAction from '../shared/CallToAction'
import EditLink from '../shared/EditLink'
import Header from '../shared/Header'
import ImagePath from '../shared/ImagePath'
import Loading from '../shared/Loading'
import TagList from '../shared/TagList'
import TextView from '../shared/TextView'
import GalleryPreview from '../shared/GalleryPreview'
import CommentPreview from '../shared/CommentPreview'

import styles from '../../styles/main'

import {
  LANG,
  AppSettings,
  Graphics
} from '../../../../common/__'

class UserDetail extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)
    this._toggleFollow = this._toggleFollow.bind(this)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.fetchData(this.props.id)
  }

  fetchData(id) {
    fetch(AppSettings.apiUri + 'users/' + id)
    .then((res) => res.json())
    .then((user) => {
      this.setState({user})
    })
    .catch((error) => {
      console.warn(error)
    })
  }

  _nextPage(type) {
    let {user} = this.state,
      id = '',
      title = null,
      passProps = {}

    switch (type) {
      case 'trails':
        id = 'TrailList',
        title = LANG.t('user.Trails')
        passProps = {
          query: '?trails=[' + user.trails + ']'
        }
      break

      case 'events':
        id = 'EventList',
        title = LANG.t('user.Events')
        passProps = {
          query: '?events=[' + user.events + ']'
        }
      break

      case 'posts':
        id = 'PostList',
        title = LANG.t('user.Posts')
        passProps = {
          query: '?posts=[' + user.posts + ']'
        }
      break
    }

    this.props.navigator.push({
      id,
      title,
      passProps
    })
  }

  _toggleFollow() {
    const {me} = this.props,
      {user} = this.state

    if (me) {
      console.log('follow/unfollow')
    } else {
      this.props.showLogin()
    }
  }

  render() {
    const {navigator} = this.props,
      {user} = this.state

    if (!user) {
      return <Loading />
    }

    const userBackgroundUrl = ImagePath({type: 'background', path: AppSettings.userBackground}),
      galleryPreview = (user.photos.length > 0) ? (
        <GalleryPreview
          navigator={navigator}
          title={LANG.t('user.Photos')}
          type={'users'}
          id={user._id}
          photos={user.photos}
        />
      ) : null

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView style={styles.user.wrapper}
          backgroundSource={{uri: userBackgroundUrl}}
          windowHeight={320}
          scrollableViewStyle={{backgroundColor: Graphics.colors.background}}
          header={(
            <View style={styles.user.hero}>
              <Avatar user={user} size={'XL'} borderWidth={6} />
              <Text style={styles.user.userHandle}>{user.handle}</Text>
              <TagList tags={user.tags} />
            </View>
          )}>
          <View style={styles.detail.article}>
            <View style={styles.detail.section}>
              <Header
                text={LANG.t('user.Intro')}
              />
              <View style={styles.detail.list}>
                <TextView
                  multiLine={true}
                  text={user.intro}
                />
              </View>
            </View>
            {galleryPreview}
            <View style={styles.editor.group}>
              <EditLink
                label={LANG.t('user.Trails')}
                onPress={() => user.trails.length > 0 && this._nextPage('trails')}
                value={user.trails.length.toString()}
              />
              <EditLink
                label={LANG.t('user.Events')}
                onPress={() => user.events.length > 0 && this._nextPage('events')}
                value={user.events.length}
              />
              <EditLink
                label={LANG.t('user.Posts')}
                onPress={() => user.posts.length > 0 && this._nextPage('posts')}
                value={user.posts.length}
              />
            </View>
          </View>
        </ParallaxView>
        <View style={styles.detail.actionbar}>
          <View style={styles.detail.submit}>
            <CallToAction
              label={LANG.t('user.Follow')}
              onPress={this._toggleFollow}
            />
          </View>
        </View>
      </View>
    )
  }
}

UserDetail.propTypes = {
  navigator: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  user: PropTypes.object,
  showLogin: PropTypes.func
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showLogin: bindActionCreators(showLogin, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
