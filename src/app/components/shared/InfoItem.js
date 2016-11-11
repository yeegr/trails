'use strict'

import React, {
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import TextView from './TextView'

import {
  Lang,
  Graphics
} from '../../settings'

const InfoItem = (props) => {
  let align = (props.align) ? {textAlign: props.align} : null,
  colon = (props.noColon) ? '' : Lang.colon,
  value = (typeof(props.value) === 'string') ? (
    <TextView style={align} text={props.value} />
  ) : props.value

  const customStyles = props.styles || null,
    customWrapperStyles = (customStyles) ? (customStyles.wrapper || null) : null,
    labelStyles = (props.labelWidth) ? {width : props.labelWidth} : null,
    more = (props.more) ? (
      (props.more.onPress) ? (
        <View style={styles.more}>
          <TouchableOpacity onPress={props.more.onPress}>
            <TextView
              textColor={props.more.labelColor || Graphics.textColors.link}
              text={props.more.label}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.more}>
          <TextView
            text={props.more.label}
          />
        </View>
      )
    ) : null 

  return (
    <View style={[styles.wrapper, customWrapperStyles]}>
      <View style={[styles.label, labelStyles]}>
        <TextView text={props.label + colon} />
      </View>
      <View style={styles.value}>
        {value}
      </View>
      {more}
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
    width: 98
  },
  value: {
    flex: 1
  },
  more: {
    marginLeft: 20
  },
})

InfoItem.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
  align: PropTypes.string,
  noColon: PropTypes.bool,
  labelWidth: PropTypes.number,
  styles: PropTypes.object,
  more: PropTypes.object
}

export default InfoItem