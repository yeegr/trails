'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import $ from 'jquery'

import {connect} from 'react-redux'

import {
  CONSTANTS,
  LANG,
  UTIL,
  AppSettings
} from '../../../../common/__'

import Inset from '../shared/Inset'
import Hero from '../shared/Hero'
import UserLink from '../user/UserLink'

class PostDetail extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    $.get(AppSettings.apiUri + 'posts/' + this.props.routeParams.id, (post) => {
      this.setState({
        post,
        loading: false
      })
    })
  }

  render() {
    const {post} = this.state
      
    if (!post) {
      return (
        <detail data-loading />
      )
    }

    const imageUri = CONSTANTS.ASSET_FOLDERS.POST + '/' + post._id + '/' + post.hero

    return (
      <detail>
        <scroll>
          <Hero
            imageUri={imageUri}
            inset={
              <Inset
                title={post.title}
                excerpt={post.excerpt}
                tags={post.tags}
              />
            }loading
          />
          <main>
            <section>
              <content>
                <UserLink
                  title={LANG.t('post.Author')}
                  user={post.creator}
                />
              </content>
            </section>
            <section>
              <content>
                <div
                  className="html-content"
                  dangerouslySetInnerHTML={UTIL.createMarkup(post.content)}
                />
              </content>
            </section>
          </main>
        </scroll>
      </detail>
    )

  }
}

PostDetail.propTypes = {
  user: PropTypes.object,
  id: PropTypes.string
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps)(PostDetail)
