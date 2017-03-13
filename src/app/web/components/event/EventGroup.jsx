'use strict'

import React, {
  PropTypes
} from 'react'

import {
  LANG
} from '../../settings'

const EventGroup = (props) => {
  const now = (new Date()).getTime(),
    status = (props.deadline < now) ? (
      <span style={{color: 'red'}}>{LANG.t('order.DeadlinePassed')}</span>
    ) : null,
    selected = (props.selected === props.index) ? (
      <checkmark />
    ) : null

  const _onPress = () => {
    if (props.deadline > now) {
      props.onPress(props.index)
    }
  }

  return (
    <row onClick={_onPress} disabled={(props.deadline < now)}>
      <label>
        <pretitle>{LANG.t('event.GroupCount', {count: LANG.t('alphanumerals.' + props.index)})}</pretitle>
        <title>{props.label}</title>
        <subtitle>{props.signUps}</subtitle>
      </label>
      <value>
        {selected}
        {status}
      </value>
    </row>
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