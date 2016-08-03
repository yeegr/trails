'use strict'

import {
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
import {AvatarList} from '../shared/Avatar'
import global from '../../styles/global'

const AreaCard = (props) => {
  const {data} = props,
    onPress = () => {
      props.navigator.push({
        id: 'AreaDetail',
        title: props.data.name,
        passProps: {
          id: props.data.id
        }
      })
    },
    showInfoBoard = () => {
      console.log('occupy this area!')
    }

  let tags = []

  if (data.tags.length > 0) {
    data.tags.map(function(n) {
      tags.push(Lang.tagArray[n])
    })
  }

  return (
    <View>
      <Hero 
        imageUri={data.hero} 
        title={Lang.cities[data.city] + ' ' + data.name} 
        excerpt={data.excerpt}
        tags={tags}
        topRight={
          <View style={global.corner}>
            <TinyStatus data={data} />
          </View>
        } 
        bottomLeft={
          <View style={global.corner}>
            <AvatarList users={data.leaders} />
          </View>
        } 
        onPress={onPress}
      />
    </View>
  )
}

AreaCard.propTypes = {
  data: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

export default AreaCard