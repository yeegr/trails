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
    <View style={styles.list.item}>
      <Hero imageUri={data.hero} title={data.title} tags={data.tags} onPress={onPress} />
      <View style={styles.list.itemFooter}>
        <UserLink user={data.creator} navigator={props.navigator} />
      </View>
    </View>
  )
}

EventCard.propTypes = {
  data: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
}

export default EventCard