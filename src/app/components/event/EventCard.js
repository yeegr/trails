'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import Hero from '../shared/Hero'
import TinyStatus from '../shared/TinyStatus'
import TextView from '../shared/TextView'
import TinyUser from '../user/TinyUser'

import global from '../../styles/global'

import {
  CONSTANTS,
  Lang,
  Graphics
} from '../../settings'

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
        imageUri={CONSTANTS.CONSTANTS.ASSET_FOLDERS.EVENT + '/' + data._id + '/' + data.hero} 
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
            <TextView
              fontSize={'XL'}
              textColor={Graphics.textColors.overlay}
              text={'人均' + data.expenses.perHead + Lang.Yuan}
            />
          </View>
        }
        onPress={onPress}
      />
    </View>
  )
}

EventCard.propTypes = {
  navigator: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default EventCard