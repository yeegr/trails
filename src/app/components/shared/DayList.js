'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Agenda from './Agenda'
import TextView from './TextView'
import {Lang} from '../../settings'

const DayList = (props) => {
  return (
    <View>
      {
        props.schedule.map(function(day, d) {
          return (
            <View key={d} style={styles.day}>
              <TextView class='h3' style={{marginLeft: 2, marginBottom: 10}} text={Lang.DayCountPrefix + Lang.dayArray[d] + Lang.DayCountPostfix} />
              {
                day.map(function(agenda, i) {
                  return (
                    <Agenda key={i} day={d} agenda={agenda} onPress={props.itemPressed} />
                  )
                })
              }
            </View>
          )
        })
      }
    </View>
  )
},
styles = StyleSheet.create({
  day: {
    marginBottom: 10
  }
})

export default DayList