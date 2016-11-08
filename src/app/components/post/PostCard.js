'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import Hero from '../shared/Hero'
import TinyStatus from '../shared/TinyStatus'
import TinyUser from '../user/TinyUser'

import global from '../../styles/global'

import {
  CONSTANTS,
  Lang
} from '../../settings'

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
        imageUri={CONSTANTS.ASSET_FOLDERS.Post + '/' + data._id + '/' + data.hero} 
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
  navigator: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default PostCard