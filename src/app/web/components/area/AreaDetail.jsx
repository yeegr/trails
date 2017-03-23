'user strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

import $ from 'jquery'

import Inset from '../shared/Inset'
import Hero from '../shared/Hero'
import Header from '../shared/Header'
import TrailPreview from '../trail/TrailPreview'
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
        <scroll>
          <Hero
            imageUri={imageUri}
            inset={
              <Inset
                title={LANG.t('cities.byCode.' + area.city) + ' ' + area.name}
                excerpt={area.excerpt}
              />
            }
          />
          <main>
            <section>
              <Header text={LANG.t('area.Description')} />
              <content>
                <div
                  className="html-content"
                  dangerouslySetInnerHTML={UTIL.createMarkup(area.description)}
                />
              </content>
            </section>
            <section>
              <Header text={LANG.t('Tags')} />
              <content className="grid">
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
              </content>
            </section>
            {galleryPreview}
            <section>
              <Header text={LANG.t('area.Leaders')} />
              <content>
              </content>
            </section>
            <TrailPreview 
              trails={area.trails}
              query={'?isPublic=true&area=' + area.id}
              title={area.name + LANG.t('trail.trail_plural')}
            />
            {commentPreview}
          </main>
        </scroll>
      </detail>
    )
  }
}

AreaDetail.propTypes = {
  id: PropTypes.string
}

export default AreaDetail