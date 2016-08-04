'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import Moment from 'moment'

import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import CallToAction from '../shared/CallToAction'
import styles from '../../styles/main'

class SelectOrderGroup extends Component {
  constructor(props) {
    super(props)
    this.placeOrder = this.placeOrder.bind(this)

    this.state = {
      selectedGroup: 0
    }
  }

  placeOrder() {
    this.props.navigator.push({
      id: 'EventOrder',
      title: Lang.SignUp,
      passProps: {
        event: this.props.event,
        selectedGroup: this.state.selectedGroup
      }
    })
  }

  render() {
    return (
      <View style={styles.detail.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            {
              this.props.event.groups.map((group, index) => {
                return (
                  <TouchableOpacity 
                    key={index} 
                    onPress={() => this.setState({selectedGroup: index})}>
                    <View style={[styles.editor.link, {}]}>
                      <View style={styles.editor.label}>
                        <Text>
                          Moment(group.startDate).format('LL')
                        </Text>
                      </View>
                      <View style={styles.editor.value}>
                        <Text>{(index === this.state.selectedGroup).toString()}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
        <CallToAction
          label={Lang.NextStep}
          onPress={this.placeOrder}
        />
      </View>
    )
  }
}

SelectOrderGroup.propTypes = {
  event: PropTypes.object.isRequired
}

export default SelectOrderGroup