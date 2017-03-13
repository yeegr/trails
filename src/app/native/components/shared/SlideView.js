'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from './Icon'
import ImagePath from './ImagePath'

import styles from '../../styles/main'

import {
  Graphics
} from '../../settings'

class SlideView extends Component {
  constructor(props) {
    super(props)
    this._setRef = this._setRef.bind(this)
    this._scrollHandler = this._scrollHandler.bind(this)
    this._scrollTo = this._scrollTo.bind(this)
    this._toggleImageMode = this._toggleImageMode.bind(this)

    const {width, height} = Dimensions.get('window')

    this.state = {
      visible: this.props.visible,
      resizeMode: 'contain',
      selectedIndex: this.props.selectedIndex || 0,
      height,
      width
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedIndex: nextProps.selectedIndex,
      visible: nextProps.visible
    })
  }

  _setRef(ref) {
    this._scrollView = ref

    if (this._scrollView) {
      this._scrollTo()
    }
  }

  _scrollHandler(e) {
    let x = e.nativeEvent.contentOffset.x
    console.log(x)
  }

  _scrollTo() {
    const x = this.state.selectedIndex * this.state.width 
    this._scrollView.scrollTo({x})
  }

  _toggleImageMode() {
    let resizeMode = (this.state.resizeMode === 'contain') ? 'cover' : 'contain'
    this.setState({resizeMode})
  }

  render() {
    const {visible, resizeMode, width, height} = this.state,
      {images} = this.props

    return (
      <Modal animationType={'slide'} transparent={false} visible={visible}>
        <View style={[styles.modal.wrapper, {backgroundColor: Graphics.colors.mask}]}>
          <ScrollView
            ref={(scrollView) => this._setRef(scrollView)}
            horizontal={true}
            pagingEnable={true}
            scrollEventThrottle={200}
            snapToAlignment={'center'}
            snapToInterval={width}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
          {
            images.map((path, index) => {
              const uri = ImagePath({type: 'background', path}),
                image = (
                  <Image
                    resizeMode={resizeMode}
                    source={{uri}}
                    style={{height, width}}
                  />
                ),
                touchable = (
                  <TouchableOpacity
                    key={index}
                    onPress={this._toggleImageMode}
                  >
                  {image}
                  </TouchableOpacity>
                )

              return touchable
            })
          }
          </ScrollView>
        </View>
        <TouchableOpacity onPress={() => this.setState({visible: false})} style={styles.modal.close}>
          <Icon 
            backgroundColor={Graphics.colors.transparent}
            fillColor={'rgba(255, 255, 255, 0.8)'}
            type={'close'}
          />
        </TouchableOpacity>
      </Modal>
    )
  }
}

SlideView.propTypes = {
  images: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  visible: PropTypes.bool
}

export default SlideView