'use strict'

import {
  AppSettings,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import Moment from 'moment'

import Icon from './Icon'
import {formatMinutes,formatDuration} from '../../../common'

const Agenda = (props) => {
  const agenda = props.agenda,
    type = agenda.type

  let view = null

  if (type > 89 && type < 100) {
    view = (
      <View style={styles.content}>
        <View style={styles.split}>
          <View style={{flex: 1}}>
            <Text style={styles.pretitle}>{formatMinutes(agenda.startTime)}</Text>
            <Text style={styles.title}>{agenda.startPoi.name}</Text>
          </View>
          <Svg width={16} height={16} style={{flex: 0, marginVertical: 16, marginHorizontal: 4}}>
            <Path scale={0.33333} fill={AppSettings.color.primary} d={Graphics.glyph.next} />
          </Svg>
          <View style={{flex: 1}}>
            <Text style={[styles.pretitle, {textAlign: 'right'}]}>{formatMinutes(agenda.endTime)}</Text>
            <Text style={[styles.title, {textAlign: 'right'}]}>{agenda.endPoi.name}</Text>
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
              <Text style={styles.pretitle}>{formatMinutes(agenda.startTime)}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.pretitle, {textAlign: 'right'}]}>{formatDuration(agenda.duration * 60)}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.title}>{agenda.startPoi.name}</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.row}>
        <Icon type={type} />
        {view}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    marginLeft: 8
  },
  split: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  pretitle: {
    color: AppSettings.color.midGray,
    fontSize: 12,
    marginTop: 4,
  },
  title: {
    fontSize: 14,
    marginTop: 4,
  },
})

Agenda.propTypes = {
  agenda: PropTypes.object.isRequired
}

export default Agenda