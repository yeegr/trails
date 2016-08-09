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
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import TextView from '../shared/TextView'
import Icon from '../shared/Icon'
import styles from '../../styles/main'

const CityPicker = (props) => {
  return (
    <Modal animationType={"slide"} transparent={false} visible={props.visible}>
      <View style={styles.modal.wrapper}>
        <View style={styles.modal.main}>
          <TextView
            style={{flex: 1, marginVertical: 20, textAlign: 'center'}}
            fontSize='XL'
            text={props.title || Lang.SelectCity}
          />
          <ListView />
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
  selectedIndex: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  hidePicker: PropTypes.func.isRequired
}


export default CityPicker