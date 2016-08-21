'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import ImagePath from './ImagePath'
import Header from './Header'
import detail from '../../styles/detail'

const Gallery = (props) => {
  let photos = props.photos,
    styles = props.styles || galleryStyles

  return (
    <View style={styles.grid}>
    {
      props.photos.map(function(photo, i) {
        const url = ImagePath({type: 'thumb', path: props.type + '/' + props.id + '/' + photo.url})

        return (
          <TouchableOpacity key={i}>
            <Image
              style={styles.thumb}
              source={{uri: url}}
            />
          </TouchableOpacity>
        )
      })
    }
    </View>
  )
}

export const GalleryPreview = (props) => {
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

const {height, width} = Dimensions.get('window'),
  galleryStyles = StyleSheet.create({
    grid: {
      alignItems: 'flex-start',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    thumb: {
      height: width / 3,
      width: width / 3,
    },
  }),
  previewStyles = StyleSheet.create({
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

export default Gallery