'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ScrollView,
  View
} from 'react-native'

import IconGrid from '../shared/IconGrid'
import Picker from '../shared/Picker'

import styles from '../../styles/main'

const TypePicker = (props) => {
  return (
    <Picker 
      visible={props.visible}
      title={props.title}
      onCancel={props.onCancel}
      content={
        <ScrollView style={styles.modal.wrapper}>
          <View style={styles.modal.main}>
            <IconGrid
              list={[93,92,90,91,94]}
              onPress={(value) => props.onPress(value)}
              selectedIndex={props.selectedIndex}
            />
            <IconGrid
              list={[100,101,102]}
              onPress={(value) => props.onPress(value)}
              selectedIndex={props.selectedIndex}
            />
            <IconGrid
              list={[0,1,2,3,4,5,6,7,8,9]}
              onPress={(value) => props.onPress(value)}
              selectedIndex={props.selectedIndex}
            />
            <IconGrid
              list={[110,111,112,113,114,115,116,117]}
              onPress={(value) => props.onPress(value)}
              selectedIndex={props.selectedIndex}
            />
            <IconGrid
              list={[20,21,22,23,24,25]}
              selectedIndex={props.selectedIndex}
              onPress={(value) => props.onPress(value)}
            />
            <IconGrid
              list={[40,41,42,43,44,45,46,47,48,49]}
              onPress={(value) => props.onPress(value)}
              selectedIndex={props.selectedIndex}
            />
            <IconGrid
              list={[60,61,62,63,64,65,66]}
              onPress={(value) => props.onPress(value)}
              selectedIndex={props.selectedIndex}
            />
            <IconGrid
              list={[80,81,82,83,84]}
              selectedIndex={props.selectedIndex}
              onPress={(value) => props.onPress(value)}
            />
          </View>
        </ScrollView>
      }
    />
  )
}

TypePicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default TypePicker