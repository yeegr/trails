'use strict'

import React, {
  PropTypes
} from 'react'

import JumpListView from './JumpListView'
import Popup from './Popup'

import {
  LANG
} from '../../../../common/__'

const CityPicker = (props) => {
  const data = LANG.t('cities.byPinyin')

  return (
    <Popup
      visible={props.visible}
      onCancel={props.onCancel}
      title={LANG.t('cityPicker.SelectCity')}
      content={
        <JumpListView
          cellHeight={25}
          sectionHeaderHeight={30}
          data={data}
          cellData={(data) => {
            return LANG.t('cities.byCode.' + data)
          }}
          onSelect={(value) => props.onPress(value)}
        />
      }
    />
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