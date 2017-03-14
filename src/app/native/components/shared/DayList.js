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
  LANG
} from '../../../../common/__'

const DayList = (props) => {
  const nav = (day, index, agenda) => {
    console.log(JSON.stringify(agenda))
  }

  return (
    <View>
      {
        props.schedule.map(function(day, d) {
          return (
            <View key={d} style={styles.day}>
              <TextView
                class={'h3'}
                style={{marginLeft: 2, marginBottom: 10}}
                text={LANG.t('event.dayCount', {count: LANG.t('alphanumerals.' + d)})}
              />
              {
                day.map(function(agenda, i) {
                  return (
                    <Agenda 
                      key={i}
                      day={d}
                      index={i}
                      agenda={agenda}
                      onPress={(agenda) => nav(d, i, agenda)}
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