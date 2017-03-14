'use strict'

import {
  Dimensions,
  PixelRatio
} from 'react-native'

import {
  AppSettings
} from '../../../../common/__'

const ImagePath = (props) => {
  if (props.path.indexOf('/') === 0) {
    return props.path
  } else {
    const {width, height} = Dimensions.get('window'),
      pixelRatio = PixelRatio.get(),
      type = '?type=' + props.type,
      path = '&path=' + props.path,
      res = '&res=' + (width * pixelRatio).toString() + 'x' + (height * pixelRatio).toString(),
      url = AppSettings.assetUri + 'image' + type + path + res

    return url
  }
}

export default ImagePath