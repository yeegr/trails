'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  View
} from 'react-native'

import TextView from './TextView'

import {
  Lang
} from '../../settings'

const InfoItem = (props) => {
  let align = (props.align) ? {textAlign: props.align} : null,
  colon = (props.noColon) ? '' : Lang.colon,
  value = (typeof(props.value) === 'string') ? (
    <TextView style={align} text={props.value} />
  ) : props.value

  const customStyles = props.styles || null,
  customWrapperStyles = (customStyles) ? (customStyles.wrapper || null) : null,
  labelStyles = (props.labelWidth) ? {width : props.labelWidth} : null 

  return (
    <View style={[styles.wrapper, customWrapperStyles]}>
      <View style={[styles.label, labelStyles]}>
        <TextView text={props.label + colon} />
      </View>
      <View style={styles.value}>
        {value}
      </View>
    </View>
  )
},
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  label: {
    width: 100
  },
  value: {
    flex: 1
  }
})

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  align: PropTypes.string,
  noColon: PropTypes.string,
  labelWidth: PropTypes.width,
  styles: PropTypes.object
}

export default InfoItem