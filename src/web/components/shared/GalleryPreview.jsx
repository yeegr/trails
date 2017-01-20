'use strict'

import React, {
  PropTypes
} from 'react'

import {
  LANG,
  AppSettings
} from '../../settings'

import Gallery from './Gallery'
import Header from './Header'

const GalleryPreview = (props) => {
  const previews = props.photos.slice(0, AppSettings.maxPhotoPreviewsPerGallery),
    more = (props.photos.length > AppSettings.maxPhotoPreviewsPerGallery) ? {
      text: LANG.t('gallery.MorePhotos'),
      url: ''
    } : null

  return (
    <section>
      <Header
        text={props.title || LANG.t('gallery.Photos')}
        more={more}
      />
      <Gallery
        type={props.type}
        id={props.id}
        photos={previews}
        style="preview"
      />
    </section>
  )
}

GalleryPreview.propTypes = {
  photos: PropTypes.array.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string
}

export default GalleryPreview