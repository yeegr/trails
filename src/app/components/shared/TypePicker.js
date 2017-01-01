'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from '../shared/Icon'
import IconGrid from '../shared/IconGrid'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  Graphics
} from '../../settings'

const TypePicker = (props) => {
  return (
    <Modal animationType={'slide'} transparent={false} visible={props.visible}>
      <ScrollView style={styles.modal.wrapper}>
        <View style={styles.modal.main}>
          <TextView
            style={{marginVertical: 20, textAlign: 'center'}}
            fontSize={'XL'}
            text={props.title || LANG.t('event.edit.SelectAgendaType')}
          />
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
      <TouchableOpacity onPress={props.onCancel} style={styles.modal.close}>
        <Icon 
          backgroundColor={Graphics.colors.transparent}
          fillColor={'rgba(0, 0, 0, 0.5)'}
          type={'close'}
        />
      </TouchableOpacity>
    </Modal>
  )
}

TypePicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default TypePicker