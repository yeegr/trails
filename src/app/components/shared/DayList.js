'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import Agenda from './Agenda'
import TextView from './TextView'

import {
  Lang
} from '../../settings'

const DayList = (props) => {
  return (
    <View>
      {
        props.schedule.map(function(day, d) {
          return (
            <View key={d} style={styles.day}>
              <TextView class={'h3'} style={{marginLeft: 2, marginBottom: 10}} text={Lang.DayCountPrefix + Lang.dayArray[d] + Lang.DayCountPostfix} />
              {
                day.map(function(agenda, i) {
                  return (
                    <Agenda 
                      key={i}
                      day={d}
                      index={i}
                      agenda={agenda}
                      onPress={(agenda) => props.itemPressed(d, i, agenda)}
                    />
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

DayList.propTypes = {
  schedule: PropTypes.array.isRequired
}

export default DayList