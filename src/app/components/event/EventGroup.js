'use strict'

import React, {
  PropTypes
} from 'react'

import {
  TouchableOpacity,
  View
} from 'react-native'

import Icon from '../shared/Icon'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  Lang,
  Graphics
} from '../../settings'

const EventGroup = (props) => {
  const now = (new Date()).getTime(),
    icon = (props.index === props.selected) ? (
      <Icon 
        backgroundColor={Graphics.colors.transparent} 
        fillColor={Graphics.colors.primary} 
        sideLength={36}
        type={'checkmark'}
      />
    ) : null,
    status = (props.deadline < now) ? (
      <TextView
        textColor={'red'}
        text={Lang.DeadlinePassed}
      />
    ) : null,
    view = (
      <View style={styles.editor.link}>
        <View style={styles.editor.label}>
          <TextView
            fontSize={'SML'}
            textColor={Graphics.textColors.h2}
            text={Lang.GroupCountPrefix + Lang.dayArray[props.index] + Lang.GroupCountPostfix}
          />
          <TextView
            text={props.label}
          />
          <TextView
            fontSize={'XS'}
            textColor={Graphics.textColors.endnote}
            text={props.signUps}
          />
        </View>
        <View style={styles.editor.value}>
          {icon}
          {status}
        </View>
      </View>
    )

  if (props.deadline < now) {
    return view
  }

  return (
    <TouchableOpacity onPress={() => props.onPress(props.index)}>
      {view}
    </TouchableOpacity>
  )
}

EventGroup.propTypes = {
  label: PropTypes.string.isRequired,
  signUps: PropTypes.string,
  index: PropTypes.number,
  selected: PropTypes.number,
  deadline: PropTypes.number,
  onPress: PropTypes.func
}

export default EventGroup