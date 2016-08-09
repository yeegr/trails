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
  ListView,
  TouchableOpacity,
  View
} from 'react-native'

import TextView from './TextView'
import Icon from './Icon'
import JumpListView from './JumpListView'
import styles from '../../styles/main'

const CityPicker = (props) => {
  const data = {
    A: ['010','021','022'],
    B: ['0837','0997','1997','0483']
  }

  return (
    <Modal animationType={"slide"} transparent={false} visible={props.visible}>
      <View style={styles.modal.wrapper}>
        <View style={[styles.modal.main, {paddingRight: 0}]}>
          <TextView
            style={{marginVertical: 20, textAlign: 'center'}}
            fontSize='XL'
            text={props.title || Lang.SelectCity}
          />
          <JumpListView
            cellHeight={25}
            sectionHeaderHeight={30}
            data={data}
            cellComponent={(data, section, id) => {
              return (
                <View style={[styles.modal.cell, {height: 25}]}>
                  <TextView text={Lang.cities[data]} />
                </View>
              )
            }}
            headerComponent={(data, id) => {
              return (
                <View style={[styles.modal.header, {height: 30}]}>
                  <TextView text={id} />
                </View>
              )
            }}
            linkComponent={(text) => {
              return (
                <TextView
                  style={{backgroundColor: Graphics.colors.transparent}}
                  textColor='#007AFF'
                  text={text}
                />
              )
            }}
            onSelect={(value) => props.onPress(value)}
          />
        </View>
      </View>
      <TouchableOpacity onPress={props.hidePicker} style={styles.modal.close}>
        <Icon 
          backgroundColor={Graphics.colors.transparent}
          fillColor="rgba(0, 0, 0, 0.5)"
          type="close"
        />
      </TouchableOpacity>
    </Modal>
  )
}

CityPicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  hidePicker: PropTypes.func.isRequired
}

export default CityPicker