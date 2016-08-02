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
import Avatar from '../shared/Avatar'
import styles from '../../styles/main'

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

  /*
  let leaders = null, fillers = []

  if (data.leaders.length > 0) {
    leaders = data.leaders.map(function(user, i){
      return (
        <View key={i} style={styles.global.grid}>
          <Avatar user={user} side={Graphics.avatarSmall} navigator={this.props.navigator} />
        </View>
      )
    })
  }

  if (data.leaders.length < AppSettings.maxLeadersPerArea) {
    for (var i = 0, j = AppSettings.maxLeadersPerArea - data.leaders.length; i < j; i++) {
      fillers.push(
        <View key={i} style={styles.global.grid}>
          <Avatar user={null} side={Graphics.avatarSmall} onPress={showInfoBoard} />
        </View>
      )
    }
  }
  */

  return (
    <View style={styles.list.item}>
      <Hero 
        imageUri={data.hero} 
        title={Lang.cities[data.city] + ' ' + data.name} 
        tags={tags}
        excerpt={null}
        onPress={onPress}
      />
    </View>
  )
}
/*
      <View style={styles.list.itemFooter}>
        <View style={styles.global.flex}>
        {leaders}
        {fillers}
        </View>
      </View>
*/

AreaCard.propTypes = {
  data: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

export default AreaCard