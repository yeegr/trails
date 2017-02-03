'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from './Icon'
import TextView from './TextView'

import {
  Graphics
} from '../../settings'

const Picker = (props) => {
  const animationType = props.animationType || 'slide',
    transparent = props.transparent || false,
    visible = props.visible || false

  return (
    <Modal animationType={animationType} transparent={transparent} visible={visible}>
      <View style={styles.wrapper}>
        <View style={styles.main}>
          <TextView
            style={{paddingVertical: 20, textAlign: 'center'}}
            fontSize={'XL'}
            text={props.title || ''}
          />
          <View style={{flex: 1}}>
            {props.content}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={props.onCancel} style={styles.close}>
        <Icon 
          backgroundColor={Graphics.colors.transparent}
          fillColor={'rgba(0, 0, 0, 0.5)'}
          type={'close'}
        />
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.colors.background,
    flex: 1
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  close: {
    height: Graphics.icon.sideLength,
    right: 15,
    top: 30,
    position: 'absolute',
    width: Graphics.icon.sideLength
  }
})

Picker.propTypes = {
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  selectedIndex: PropTypes.string,
}

export default Picker