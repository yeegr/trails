'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import Icon from '../shared/Icon'
import TextView from '../shared/TextView'

import {
  LANG,
  UTIL,
  Graphics
} from '../../../../common/__'

const TrailInfo = (props) => {
  const title = (props.title.length < 1) ? LANG.t('trail.edit.Unnamed') : props.title

  return (
    <View style={styles.wrapper}>
      <View style={styles.icon}>
        <Icon type={props.type.toString()} />
      </View>
      <View style={styles.content}>
        <TextView fontSize={'L'} text={title} />
        <TextView class={'h5'} text={UTIL.formatTime(props.date)} />
      </View>
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 5,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10
  },
  icon: {
    height: Graphics.icon.sideLength,
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5
  }
})

TrailInfo.propTypes = {
  type: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired
}

export default TrailInfo