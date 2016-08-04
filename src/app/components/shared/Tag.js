'use strict'

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

import {Graphics} from '../../settings'

const Tag = (props) => {
  let bgColor = (props.bgColor) ? {backgroundColor: props.bgColor} : {},
      tag = (
        <View style={[styles.tag, bgColor]}>
          <Text style={styles.tagLabel}>{props.label}</Text>
        </View>
      ),
      wrapper = (props.onPress) ? (
        <TouchableOpacity onPress={props.onPress}>{tag}</TouchableOpacity>
      ) : tag

  return wrapper
}

Tag.propTypes = {
  label: PropTypes.string.isRequired
}

/*
export const TagList = (props) => {
  return (
    <View style={styles.tagList}>
    {
      props.tags.map(function(tag, i) {
        return (
          <Tag key={i} label={tag} />
        )
      })
    }
    </View>
  )
}
*/

export const TagList = (props) => {
  if (props.tags.length > 0) {
    let txt = '# '

    props.tags.map(function(tag) {
      txt += tag + ' '
    })

    return <Text style={styles.tagLabel}>{txt}</Text>
  } else {
    return null
  }
}

TagList.propTypes = {
  tags: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Graphics.tag.backgroundColor,
    borderRadius: 12,
    marginRight: 10,
    marginVertical: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagLabel: {
    color: Graphics.textColors.overlay,
    fontSize: 12,
  },
  tagList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  }
})

export default Tag