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
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from '../shared/Icon'

const TypePicker = (props) => {
  return (
    <Modal animationType={"slide"} transparent={true} visible={props.visible}>
      <ScrollView style={styles.modal}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{Lang.SelectAgendaType}</Text>
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
    </Modal>
  )
},

IconGrid = (props) => {
  return (
    <View style={styles.grid}>
    {
      props.list.map((i) => {
        const color = (i === props.selectedIndex) ? Graphics.colors.primary : Graphics.icon.backgroundColor

        return (
          <TouchableOpacity key={i} onPress={() => props.onPress(i)}>
            <View style={styles.button}>
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
},

styles = StyleSheet.create({
  modal: {
    backgroundColor: Graphics.colors.background,
    flex: 1
  },
  dialog: {
    padding: 10,
  },
  grid: {
    alignItems: 'flex-start',
    borderBottomColor: Graphics.colors.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  button: {
    marginBottom: 10,
    marginHorizontal: 5
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginTop: 20,
    padding: 10,
    textAlign: 'center'
  }
})

TypePicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number,
  onPress: PropTypes.func.isRequired
}

IconGrid.propTypes = {
  selectedIndex: PropTypes.number,
  onPress: PropTypes.func.isRequired
}

export default TypePicker