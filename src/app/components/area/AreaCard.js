'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {View} from 'react-native'

import {
  Lang,
  Graphics
} from '../../settings'

import Hero from '../shared/Hero'
import TinyStatus from '../shared/TinyStatus'
import {AvatarList} from '../shared/Avatar'
import {ASSET_FOLDERS} from '../../../util/constants'
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
        imageUri={ASSET_FOLDERS.Area + '/' + data._id + '/' + data.hero} 
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