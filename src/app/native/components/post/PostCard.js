'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import Hero from '../shared/Hero'
import Card from '../shared/Card'
import TinyStatus from '../shared/TinyStatus'
import TinyUser from '../user/TinyUser'

import global from '../../styles/global'

import {
  CONSTANTS,
  LANG
} from '../../settings'

const PostCard = (props) => {
  const data = props.data,
    onPress = () => {
      props.navigator.push({
        id: 'PostDetail',
        title: LANG.t('post.post'),
        passProps: {
          id: props.data.id
        }
      })
    }

  return (
    <View>
      <Hero 
        imageUri={CONSTANTS.ASSET_FOLDERS.POST + '/' + data._id + '/' + data.hero} 
        onPress={onPress}
        card={
          <Card
            title={data.title}
            excerpt={data.excerpt}
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
          />
        }
      />
    </View>
  )
}

PostCard.propTypes = {
  navigator: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default PostCard