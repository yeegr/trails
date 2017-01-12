'use strict'

import React, {
  Component
} from 'react'

import $ from 'jquery'

import {
  UTIL,
  AppSettings
} from '../../settings'

import {
  Hero
} from '../shared/Hero.jsx'

class PostDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: {},
      loading: true
    }
  }

  componentDidMount() {
    console.log(AppSettings.apiUri + 'posts/' + this.props.routeParams.id)
    $.get(AppSettings.apiUri + 'posts/' + this.props.routeParams.id, function(data) {
      console.log(data)
      this.setState({
        detail: data,
        loading: false
      })
    }.bind(this))
  }

  render() {
    if (this.state.loading === true) {
      return (
        <detail data-loading></detail>
      )
    } else {
      const post = this.state.detail,
        //hero = setBackgroundImage(post.hero),
        creator = post.creator

      return (
        <detail>
          <Hero
            imageUri={post.hero}
            title={post.title}
          />
          <main>
            <section>
            </section>
            <section>
              <post>
                <div className="html-content" dangerouslySetInnerHTML={UTIL.createMarkup(post.content)} />
              </post>
            </section>
          </main>
        </detail>
      )
    }
  }
}

export default PostDetail