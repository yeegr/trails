'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import {
  CONSTANTS,
  LANG
} from '../../settings'

import AvatarList from '../shared/AvatarList'
import Hero from '../shared/Hero'
import Card from '../shared/Card'
import TinyStatus from '../shared/TinyStatus'

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
      tags.push(LANG.t('tags.' + n))
    })
  }

  return (
    <View>
      <Hero
        imageUri={CONSTANTS.ASSET_FOLDERS.AREA + '/' + data._id + '/' + data.hero} 
        onPress={onPress}
        card={
          <Card
            title={LANG.t('cities.byCode.' + data.city) + ' ' + data.name}
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
          />
        }
      />
    </View>
  )
}

AreaCard.propTypes = {
  navigator: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default AreaCard