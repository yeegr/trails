'user strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

import $ from 'jquery'

import Card from '../shared/Card'
import Hero from '../shared/Hero'
import Header from '../shared/Header'
import GalleryPreview from '../shared/GalleryPreview'
import CommentPreview from '../shared/CommentPreview'

import {
  CONSTANTS,
  LANG,
  UTIL,
  AppSettings
} from '../../../../common/__'

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
      imageUri = CONSTANTS.ASSET_FOLDERS.AREA + '/' + area._id + '/' + area.hero,
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
        <Hero
          imageUri={imageUri}
          card={
            <Card
              title={LANG.t('cities.byCode.' + area.city) + ' ' + area.name}
              excerpt={area.excerpt}
            />
          }
        />
        <main>
          <section>
            <Header text={LANG.t('area.Description')} />
            <div
              className="html-content"
              dangerouslySetInnerHTML={UTIL.createMarkup(area.description)}
            />
          </section>
          <section>
            <Header text={LANG.t('Tags')} />
            <grid>
              {
                area.tags.map((n) => {
                  return (
                    <icon key={n}>
                      <pictogram
                        shape="circle"
                        data-value={n.toString()}
                      />
                      <span>
                        {LANG.t('tags.' + n.toString())}
                      </span>
                    </icon>
                  )
                })
              }
            </grid>
          </section>
          {galleryPreview}
          <section>
            <Header text={LANG.t('area.Leaders')} />
            <list>
            </list>
          </section>
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