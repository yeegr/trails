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

import TextView from './TextView'

import {
  LANG,
  Graphics
} from '../../../../common/__'

const Popup = (props) => {
  const styles = StyleSheet.create({
      wrapper: {
        backgroundColor: Graphics.actionSheet.maskColor,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
      },
      popup: (props.type) === 'actionsheet' ? {
        backgroundColor: Graphics.popup.popupColor,
        flex: 1,
        padding: 10,
        marginTop: Graphics.statusbar.height
      } : {
        backgroundColor: Graphics.popup.popupColor,
        flex: 1,
        padding: 10,
        paddingTop: Graphics.statusbar.height
      },
      titlebar: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        marginBottom: 5
      },
      title: {
        alignItems: 'center',
        flex: 3,
        marginHorizontal: 15,
      },
      buttonView: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 5,
      },
      button: {
        flex: 1
      },
      buttonText: {
        color: Graphics.colors.primary,
        fontSize: Graphics.fontSizes.XL
      },
      main: {
        flex: 1
      }
    }),

    cancelButton = (props.onCancel) ? (
      <TouchableOpacity style={styles.button} onPress={props.onCancel}>
        <TextView
          textColor={props.buttonColor || Graphics.colors.primary}
          fontSize={'L'}
          text={props.cancelText || LANG.t('glossary.Cancel')}
        />
      </TouchableOpacity>

    ) : null,

    confirmButton = (props.onConfirm) ? (
      <TouchableOpacity style={styles.button} onPress={props.onCancel}>
        <TextView
          style={{textAlign: 'right'}}
          textColor={props.buttonColor || Graphics.colors.primary}
          fontSize={'L'}
          text={props.confirmText || LANG.t('glossary.Confirm')}
        />
      </TouchableOpacity>
    ) : null,

    titlebar = (props.title || props.onCancel || props.onConfirm) ? (
      <View style={styles.titlebar}>
        <View style={[styles.buttonView, {alignItems: 'flex-start'}]}>
          {cancelButton}
        </View>
        <View style={styles.title}>
          <TextView
            fontSize={'L'}
            text={props.title}
          />
        </View>
        <View style={[styles.buttonView, {alignItems: 'flex-end'}]}>
          {confirmButton}
        </View>
      </View>
    ) : null,

    animationType = props.animationType || 'slide',
    transparent = props.transparent || false

  return (
    <Modal animationType={animationType} transparent={transparent} visible={props.visible}>
      <View style={styles.wrapper}>
        <View style={styles.popup}>
          {titlebar}
          <View style={styles.main}>
            {props.content}
          </View>
        </View>
      </View>
    </Modal>
  )
}

Popup.propTypes = {
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  visible: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  buttonColor: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  content: PropTypes.object.isRequired
}

export default Popup