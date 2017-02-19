'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Image,
  Text,
  View
} from 'react-native'

const Upcoming = (props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <Image
          style={{width: 256, height: 256}}
          source={require('../../../../assets/AppIcon/512_transparent.png')}
        />
        <Text style={{width: 256, marginBottom: 50, textAlign: 'center'}}>
          开发中，敬请期待
        </Text>
      </View>
    </View>
  )
}

Upcoming.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default Upcoming