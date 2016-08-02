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
import UserLink from '../user/UserLink'
import styles from '../../styles/main'

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
    <View style={styles.list.item}>
      <Hero 
        imageUri={data.hero} 
        title={data.title} 
        tags={data.tags}
        topLeft={<UserLink user={data.creator} navigator={props.navigator} />} 
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