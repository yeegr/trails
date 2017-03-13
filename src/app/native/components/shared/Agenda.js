'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import Icon from './Icon'
import TextView from './TextView'

import {
  UTIL,
  Graphics
} from '../../settings'

const Agenda = (props) => {
  const agenda = props.agenda,
  type = agenda.type

  let view = null

  if (type > 89 && type < 100) {
    view = (
      <View style={styles.content}>
        <View style={styles.split}>
          <View style={{flex: 1}}>
            <TextView
              class={'h5'}
              text={UTIL.formatMinutes(agenda.startTime)}
            />
            <TextView
              fontSize={'L'}
              text={agenda.startPoi.name}
            />
          </View>
          <View style={{flex: 0, marginVertical: 16, marginHorizontal: 10}}>
            <Svg width={16} height={16}>
              <Path
                scale={0.33333}
                fill={Graphics.colors.primary}
                d={Graphics.glyphs.next}
              />
            </Svg>
          </View>
          <View style={{flex: 1}}>
            <TextView
              class={'h5'}
              style={{textAlign: 'right'}}
              text={UTIL.formatMinutes(agenda.endTime)}
            />
            <TextView
              fontSize={'L'}
              style={{textAlign: 'right'}}
              text={agenda.endPoi.name}
            />
          </View>
        </View>
      </View>
    )
  } else {
    view = (
      <View style={styles.content}>
        <View>
          <View style={styles.split}>
            <View style={{flex: 1}}>
              <TextView
                class={'h5'}
                text={UTIL.formatMinutes(agenda.startTime)}
              />
            </View>
            <View style={{flex: 1}}>
              <TextView 
                class={'h5'}
                style={{textAlign: 'right'}}
                text={UTIL.formatDuration(agenda.duration * 60)}
              />
            </View>
          </View>
        </View>
        <TextView fontSize={'L'} text={agenda.startPoi.name} />
      </View>
    )
  }

  return (
    <TouchableOpacity onPress={() => props.onPress(agenda)}>
      <View style={styles.wrapper}>
        <View style={styles.icon}>
          <Icon type={type.toString()} />
        </View>
        {view}
      </View>
    </TouchableOpacity>
  )
},

styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5
  },
  split: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  label: {
    marginBottom: 5
  }
})

Agenda.propTypes = {
  agenda: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
}

export default Agenda