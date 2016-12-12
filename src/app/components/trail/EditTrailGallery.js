'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  CameraRoll,
  StyleSheet,
  Text,
  View
} from 'react-native'

import CameraRollPicker from 'react-native-camera-roll-picker'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

class EditTrailGallery extends Component {
  constructor(props) {
    super(props);
    this.getSelectedImages = this.getSelectedImages.bind(this)

    this.state = {
      imageCount: 0,
      selected: []
    }
  }

  componentWillMount() {
    CameraRoll
    .getPhotos({
      first: 20,
      assetType: 'Photos',
      groupTypes: 'All'
    })
    .then((data) => {
      let selected = [],
        propsArray = this.props.photos,
        nameArray = []

      propsArray.map((photo) => {
        nameArray.push(photo.url)
      })

      data.edges.map((obj) => {
        let image = obj.node.image
        if (nameArray.indexOf(image.filename) > -1) {
          selected.push(image)
        }
      })

      this.setState({selected})
    })
    .catch((err) => {console.log(err)})
  }

  componentWillUnmount() {
    if (this.state.selected.length > 0) {
      this.props.newTrailActions.setTrailPhotos(this.state.selected)
    }
  }

  getSelectedImages(images, current) {
    this.setState({
      imageCount: images.length,
      selected: images,
    })
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.gallery}>
          <CameraRollPicker
            assetType={'Photos'}
            batchSize={5}
            groupTypes={'All'}
            imagesPerRow={4}
            imageMargin={5}
            initialListSize={1}
            pageSize={3}
            removeClippedSubviews={false}
            scrollRenderAheadDistance={500}

            callback={this.getSelectedImages}
            maximum={AppSettings.maxPhotosPerGallery}
            selected={this.state.selected}
          />
        </View>
        <View style={styles.statusBar}>
          <View style={styles.block}>
            <Text style={styles.indicator}>
              {Lang.PhotosSelectedPrefix}
              <Text style={styles.imageCount}>{this.state.imageCount}</Text>
              {Lang.PhotosSelectedPostfix}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

/*
        <View style={styles.block}>
          <TouchableOpacity onPress={this.previewPhotos}>
            <Text style={styles.button}>{Lang.Preview}</Text>
          </TouchableOpacity>
        </View>
*/

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.colors.background,
    flex: 1,
    flexDirection: 'column',
  },
  gallery: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 64
  },
  statusBar: {
    borderTopColor: Graphics.colors.border,
    borderTopWidth: 1,
    height: 48,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  block: {
    flex: 1,
    justifyContent: 'center'
  },
  indicator: {
    justifyContent: 'center',
    marginBottom: 5,
    textAlign: 'right'
  },
  imageCount: {
    color: Graphics.colors.primary,
    fontSize: Graphics.fontSizes.L
  },
  button: {
    color: Graphics.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
})

EditTrailGallery.propTypes = {
  navigator: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    photos: state.newTrail.photos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTrailGallery)
