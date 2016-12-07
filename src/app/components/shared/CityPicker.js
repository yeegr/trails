'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Modal,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from './Icon'
import JumpListView from './JumpListView'
import TextView from './TextView'

import styles from '../../styles/main'

import {
  LANG,
  Graphics,
  Lang
} from '../../settings'

const CityPicker = (props) => {
  const data = Lang.citiesByPinyin

  return (
    <Modal animationType={'slide'} transparent={false} visible={props.visible}>
      <View style={styles.modal.wrapper}>
        <View style={[styles.modal.main, {paddingRight: 0}]}>
          <TextView
            style={{marginVertical: 20, textAlign: 'center'}}
            fontSize={'XL'}
            text={props.title || LANG.t('cityPicker.SelectCity')}
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
                  textColor={Graphics.textColors.side}
                  text={text.substring(0,1)}
                />
              )
            }}
            onSelect={(value) => props.onPress(value)}
          />
        </View>
      </View>
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

CityPicker.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default CityPicker