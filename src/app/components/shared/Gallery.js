'use strict'

import React, {
  Component,
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
import SlideView from './SlideView'

class Gallery extends Component {
  constructor(props) {
    super(props)

    this._showSlideView = this._showSlideView.bind(this)

    this.state = {
      slideViewVisible: false,
      selectedIndex: this.props.selectedIndex || 0
    }
  }

  _showSlideView(selectedIndex) {
    this.setState({
      slideViewVisible: true,
      selectedIndex
    })
  }

  render() {
    let {type, id, photos} = this.props, 
      styles = this.props.styles || galleryStyles,
      urlArray = []

    return (
      <View style={styles.grid}>
      {
        photos.map((photo, i) => {
          const path = type + '/' + id + '/' + photo.url,
            url = ImagePath({type: 'thumb', path})

          urlArray.push(path)

          return (
            <TouchableOpacity key={i} onPress={() => this._showSlideView(i)}>
              <Image
                style={styles.thumb}
                source={{uri: url}}
              />
            </TouchableOpacity>
          )
        })
      }
        <SlideView
          images={urlArray}
          selectedIndex={this.state.selectedIndex}
          visible={this.state.slideViewVisible}
        />
      </View>
    )
  }
}

Gallery.propTypes = {
  styles: PropTypes.object,
  photos: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number
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