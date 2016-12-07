'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from '../shared/Icon'

import {
  LANG,
  Graphics
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
                value={LANG.t('tags.' + i)}
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
  list: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number,
}

export default IconGrid