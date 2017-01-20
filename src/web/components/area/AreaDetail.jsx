'user strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

import $ from 'jquery'

import Header from '../shared/Header'
import GalleryPreview from '../shared/GalleryPreview'
import CommentPreview from '../shared/CommentPreview'

import {
  LANG,
  UTIL,
  AppSettings
} from '../../settings'

class AreaDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    $.get(AppSettings.apiUri + 'areas/' + this.props.routeParams.id, (area) => {
      this.setState({
        area,
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

    const {area} = this.state,
      galleryPreview = (area.photos.length > 0) ? (
        <GalleryPreview
          type={'areas'}
          id={area._id}
          photos={area.photos}
        />
      ) : null,
      commentPreview = (area.comments.length > -1) ? (
        <CommentPreview
          type={'areas'}
          id={area._id}
          comments={area.comments}
        />
      ) : null

    return (
      <detail>
        <main>
          <section>
            <Header text={LANG.t('area.Description')} />
            <div
              className="html-content"
              dangerouslySetInnerHTML={UTIL.createMarkup(area.description)}
            />
          </section>
          {galleryPreview}
          {commentPreview}
        </main>
      </detail>
    )
  }
}

AreaDetail.propTypes = {
  id: PropTypes.string
}

export default AreaDetail