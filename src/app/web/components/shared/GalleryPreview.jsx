'use strict'

import React, {
  PropTypes
} from 'react'

import {
  LANG,
  AppSettings
} from '../../../../common/__'

import Gallery from './Gallery'
import Header from './Header'

const GalleryPreview = (props) => {
  const {type, id, photos} = props,
    previews = photos.slice(0, AppSettings.maxPhotoPreviewsPerGallery),
    target = 'gallery',
    more = (photos.length > AppSettings.maxPhotoPreviewsPerGallery) ? {
      text: LANG.t('gallery.MorePhotos'),
      path: type + '/' + id + '/' + target,
      target,
      data: photos
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