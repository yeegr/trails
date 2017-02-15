'use strict'

import React, {
  PropTypes
} from 'react'

import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
} from 'react-native'

import TextView from './TextView'

import {
  LANG,
  Graphics
} from '../../settings'

const Saving = (props) => {
  return (
    <Modal animationType={'fade'} transparent={true} visible={props.visible || false}>
      <View style={styles.wrapper}>
        <ActivityIndicator
          size={props.size || 'large'}
          animating={true}
        />
        <TextView
          style={{marginVertical: 10}}
          fontSize={props.fontSize || 'L'}
          textColor={props.textColor || Graphics.textColors.overlay}
          text={props.label || LANG.t('glossary.Saving')}
        />
      </View>
    </Modal>
  )
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: Graphics.colors.modal,
    flex: 1,
    justifyContent: 'center',
    padding: 20
  }
})

Saving.propTypes = {
  visible: PropTypes.bool,
  size: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
  label: PropTypes.string
}

export default Saving