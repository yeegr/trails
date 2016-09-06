'use strict'

import {
  Graphics,
  Lang
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'

import TextView from '../shared/TextView'
import Icon from '../shared/Icon'
import styles from '../../styles/main'

const TypePicker = (props) => {
  return (
    <Modal animationType={"slide"} transparent={false} visible={props.visible}>
      <ScrollView style={styles.modal.wrapper}>
        <View style={styles.modal.main}>
          <TextView
            style={{marginVertical: 20, textAlign: 'center'}}
            fontSize='XL'
            text={props.title || Lang.SelectAgendaType}
          />
          <IconGrid list={[93,92,90,91,94]} selectedIndex={props.selectedIndex} onPress={(value) => props.onPress(value)} />
          <IconGrid list={[100,101,102]} selectedIndex={props.selectedIndex} onPress={(value) => props.onPress(value)} />
          <IconGrid list={[0,1,2,3,4,5,6,7,8,9]} selectedIndex={props.selectedIndex} onPress={(value) => props.onPress(value)} />
          <IconGrid list={[110,111,112,113,114,115,116,117]} selectedIndex={props.selectedIndex} onPress={(value) => props.onPress(value)} />
          <IconGrid list={[20,21,22,23,24,25]} selectedIndex={props.selectedIndex} onPress={(value) => props.onPress(value)} />
          <IconGrid list={[40,41,42,43,44,45,46,47,48,49]} selectedIndex={props.selectedIndex} onPress={(value) => props.onPress(value)} />
          <IconGrid list={[60,61,62,63,64,65,66]} selectedIndex={props.selectedIndex} onPress={(value) => props.onPress(value)} />
          <IconGrid list={[80,81,82,83,84]} selectedIndex={props.selectedIndex} onPress={(value) => props.onPress(value)} />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={props.onCancel} style={styles.modal.close}>
        <Icon 
          backgroundColor={Graphics.colors.transparent}
          fillColor="rgba(0, 0, 0, 0.5)"
          type="close"
        />
      </TouchableOpacity>
    </Modal>
  )
},

IconGrid = (props) => {
  return (
    <View style={styles.modal.grid}>
    {
      props.list.map((i) => {
        const color = (i === props.selectedIndex) ? Graphics.colors.primary : Graphics.icon.backgroundColor

        return (
          <TouchableOpacity key={i} onPress={() => props.onPress(i)}>
            <View style={styles.modal.button}>
              <Icon
                backgroundColor={color}
                stack="vertical"
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

TypePicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

IconGrid.propTypes = {
  selectedIndex: PropTypes.number,
  onPress: PropTypes.func.isRequired
}

export default TypePicker