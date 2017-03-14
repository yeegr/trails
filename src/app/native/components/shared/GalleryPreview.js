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
} from '../../../../common/__'

import Gallery from './Gallery'
import Header from './Header'
import Device from '../../device'

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
      <Gallery
        type={props.type}
        id={props.id}
        photos={previews}
        styles={previewStyles}
      />
    </View>
  )
}

GalleryPreview.propTypes = {
  navigator: PropTypes.object.isRequired,
  photos: PropTypes.array,
  type: PropTypes.string,
  id: PropTypes.string
}

const {width} = Device,
  marginRight = 15,
  sideLength = Math.floor((width - 15 * 5) / 4),
  previewStyles = StyleSheet.create({
    grid: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      paddingLeft: 15,
    },
    thumb: {
      height: sideLength,
      width: sideLength,
      marginRight
    },
  })

export default GalleryPreview