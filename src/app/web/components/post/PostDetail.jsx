'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import $ from 'jquery'

import {
  CONSTANTS,
  UTIL,
  AppSettings
} from '../../../../common/__'

import Inset from '../shared/Inset'
import Hero from '../shared/Hero'
import UserLink from '../user/UserLink'

class PostDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
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
    if (this.state.loading === true) {
      return (
        <detail data-loading />
      )
    }

    const {post} = this.state,
      imageUri = CONSTANTS.ASSET_FOLDERS.POST + '/' + post._id + '/' + post.hero

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
                <UserLink user={post.creator} />
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
  id: PropTypes.string
}

export default PostDetail