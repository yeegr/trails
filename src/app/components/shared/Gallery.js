'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component
} from 'react'

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import detail from '../../styles/detail'
import Header from './Header'

const Gallery = (props) => {
  let styles = (props.type === 'preview') ? previewStyles : galleryStyles

  return (
    <View style={styles.grid}>
    {
      props.data.map(function(photo, i) {
        return (
          <TouchableOpacity key={i}>
            <Image style={styles.thumb} source={{uri: AppSettings.assetUri + photo.thumb}} />
          </TouchableOpacity>
        )
      })
    }
    </View>
  )
}

export const GalleryPreview = (props) => {
  const previews = props.gallery.slice(0, AppSettings.maxPhotoPreviewsPerGallery),
    more = (props.gallery.length > AppSettings.maxPhotoPreviewsPerGallery) ? {
      text: Lang.MorePhotos,
      onPress: () => {
        props.navigator.push({
          id: 'Gallery',
          title: Lang.Photos,
          passProps: {
            data: props.gallery
          }
        })
      }
    } : null

  return (
    <View style={detail.section}>
      <Header text={Lang.Photos} more={more} />
      <Gallery type="preview" data={previews} />
    </View>
  )
}

const {height, width} = Dimensions.get('window'),
  galleryStyles = StyleSheet.create({
    grid: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    thumb: {
      height: width / 3,
      width: width / 3,
    },
  }),
  previewStyles = StyleSheet.create({
    grid: {
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

export default Gallery