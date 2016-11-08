'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from './Icon'
import TextView from './TextView'

const ListItem = (props) => {
  const value = (typeof(props.value) === 'string') ? (
    <TextView class={'title'} text={props.value} />
  ) : props.value,

  view = (
    <View style={styles.wrapper}>
      <View style={styles.icon}>
        <Icon type={props.icon} />
      </View>
      <View style={styles.content}>
        <TextView class={'h4'} text={props.label} />
        {value}
      </View>
    </View>
  )

  if (props.onPress) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        {view}
      </TouchableOpacity>
    )
  }

  return view
},
styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 20
  },
  icon: {
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5
  },
  label: {
    marginBottom: 5
  }
})

ListItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onPress: PropTypes.func
}

export default ListItem