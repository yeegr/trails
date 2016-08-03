'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import Hero from '../shared/Hero'
import TinyStatus from '../shared/TinyStatus'
import TinyUser from '../user/TinyUser'
import global from '../../styles/global'

const PostCard = (props) => {
  const data = props.data,
    onPress = () => {
      props.navigator.push({
        id: 'PostDetail',
        title: Lang.Post,
        passProps: {
          id: props.data.id
        }
      })
    }

  return (
    <View>
      <Hero 
        imageUri={data.hero} 
        title={data.title} 
        tags={data.tags}
        topLeft={
          <View style={global.corner}>
            <TinyUser user={data.creator} />
          </View>
        } 
        topRight={
          <View style={global.corner}>
            <TinyStatus data={data} />
          </View>
        } 
        onPress={onPress}
      />
    </View>
  )
}

PostCard.propTypes = {
  data: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
}

export default PostCard