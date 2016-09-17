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
  Text,
  View
} from 'react-native'

import Hero from '../shared/Hero'
import TinyStatus from '../shared/TinyStatus'
import TextView from '../shared/TextView'
import TinyUser from '../user/TinyUser'
import {ASSET_FOLDERS} from '../../../util/constants'
import global from '../../styles/global'

const EventCard = (props) => {
  const data = props.data,
    onPress = () => {
      props.navigator.push({
        id: 'EventDetail',
        title: Lang.EventDetail,
        passProps: {
          id: props.data.id
        }
      })
    }

  return (
    <View>
      <Hero
        imageUri={ASSET_FOLDERS.Event + '/' + data.hero} 
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
        bottomRight={
          <View style={global.corner}>
            <TextView fontSize='XL' textColor={Graphics.textColors.overlay} text={'人均' + data.expenses.perHead + Lang.Yuan} />
          </View>
        }
        onPress={onPress}
      />
    </View>
  )
}

EventCard.propTypes = {
  data: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
}

export default EventCard