'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import TextView from '../shared/TextView'
import Icon from '../shared/Icon'

import {
  LANG,
  Graphics,
  Lang
} from '../../settings'

const IconGrid = (props) => {
  return (
    <View style={styles.wrapper}>
    {
      props.list.map((i) => {
        const color = (i === props.selectedIndex) ? Graphics.colors.primary : Graphics.icon.backgroundColor

        return (
          <TouchableOpacity key={i} onPress={() => props.onPress(i)}>
            <View style={styles.icon}>
              <Icon
                backgroundColor={color}
                stack={'vertical'}
                textColor={color} 
                type={i.toString()} 
                value={Lang.tagArray[i]}
              />
            </View>
          </TouchableOpacity>
        )
      })
    }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-start',
    borderBottomColor: Graphics.colors.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  icon: {
    marginBottom: 10,
    marginHorizontal: 5
  }
})

IconGrid.propTypes = {
  selectedIndex: PropTypes.number,
  onPress: PropTypes.func.isRequired
}

export default IconGrid