'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import ImagePath from './ImagePath'

const Gallery = (props) => {
  let styles = props.styles || galleryStyles

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

Gallery.propTypes = {
  styles: PropTypes.object,
  photos: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}


const {width} = Dimensions.get('window'),
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
})

export default Gallery