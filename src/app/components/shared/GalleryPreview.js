'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import {
  AppSettings,
  Lang
} from '../../settings'

import Gallery from './Gallery'
import Header from './Header'

import detail from '../../styles/detail'

const GalleryPreview = (props) => {
  const previews = props.photos.slice(0, AppSettings.maxPhotoPreviewsPerGallery),
    more = (props.photos.length > AppSettings.maxPhotoPreviewsPerGallery) ? {
      text: Lang.MorePhotos,
      onPress: () => {
        props.navigator.push({
          id: 'Gallery',
          title: Lang.Photos,
          passProps: {
            type: props.type,
            id: props.id,
            photos: props.photos
          }
        })
      }
    } : null

  return (
    <View style={detail.section}>
      <Header text={Lang.Photos} more={more} />
      <Gallery type={props.type} id={props.id} photos={previews} styles={previewStyles} />
    </View>
  )
}

GalleryPreview.propTypes = {
  navigator: PropTypes.object.isRequired,
  photos: PropTypes.array,
  type: PropTypes.string,
  id: PropTypes.string
}

const previewStyles = StyleSheet.create({
  grid: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  thumb: {
    height: 80,
    width: 80,
  },
})

export default GalleryPreview