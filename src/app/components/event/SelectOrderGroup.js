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
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import Intro from '../shared/Intro'
import TextView from '../shared/TextView'
import Icon from '../shared/Icon'
import CallToAction from '../shared/CallToAction'
import {formatEventGroupLabel} from '../../../common'
import styles from '../../styles/main'

class SelectOrderGroup extends Component {
  constructor(props) {
    super(props)
    this.placeOrder = this.placeOrder.bind(this)

    this.state = {
      selectedGroup: null
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
    const event = this.props.event

    return (
      <View style={styles.detail.wrapper}>
        <ParallaxView style={{flex: 1}}
          backgroundSource={{uri: AppSettings.assetUri + event.hero}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
              align='bottom' 
              title={event.title} 
              excerpt={event.excerpt}
            />
          )}>
          <View style={{backgroundColor: Graphics.colors.background}}>
            <View style={[styles.editor.group, {marginTop: 20}]}>
              {
                event.groups.map((group, index) => {
                  return (
                    <EventGroup 
                      key={index}
                      index={index}
                      selected={this.state.selectedGroup}
                      deadline={group.deadline}
                      label={formatEventGroupLabel(event, index)}
                      signUps={'已有' + group.signUps.length + '人报名'}
                      onPress={(selectedGroup) => this.setState({selectedGroup})}
                    />
                  )
                })
              }
            </View>
          </View>
        </ParallaxView>
        <CallToAction
          disabled={(this.state.selectedGroup === null)}
          label={Lang.NextStep}
          onPress={this.placeOrder}
        />
      </View>
    )
  }
}

const EventGroup = (props) => {
  const now = (new Date()).getTime(),
  icon = (props.index === props.selected) ? (
    <Icon 
      backgroundColor={Graphics.colors.transparent} 
      fillColor={Graphics.colors.primary} 
      sideLength='36'
      type='checkmark'
    />
  ) : null,
  status = (props.deadline < now) ? (
    <TextView textColor='red' text={Lang.DeadlinePassed} />
  ) : null,
  view = (
    <View style={[styles.editor.link, {}]}>
      <View style={styles.editor.label}>
        <TextView fontSize='SML' textColor={Graphics.textColors.h2} text={Lang.GroupCountPrefix + Lang.dayArray[props.index] + Lang.GroupCountPostfix} />
        <TextView text={props.label} />
        <TextView fontSize='XS' textColor={Graphics.textColors.endnote} text={props.signUps} />
      </View>
      <View style={styles.editor.value}>
        {icon}
        {status}
      </View>
    </View>
  )

  if (props.deadline < now) {
    return view
  }

  return (
    <TouchableOpacity onPress={() => props.onPress(props.index)}>
      {view}
    </TouchableOpacity>
  )
}

SelectOrderGroup.propTypes = {
  event: PropTypes.object.isRequired
}

export default SelectOrderGroup