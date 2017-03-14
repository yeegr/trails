'use strict'

import $ from 'jquery'

import {
  AppSettings
} from '../../../../common/__'

const ImagePath = (props) => {
  const width = $(window).width(),
    height = $(window).height(),
    pixelRatio = window.devicePixelRatio,
    type = '?type=' + props.type,
    path = '&path=' + props.path,
    res = '&res=' + (width * pixelRatio).toString() + 'x' + (height * pixelRatio).toString(),
    url = AppSettings.assetUri + 'image' + type + path + res

  return url
}

export default ImagePath