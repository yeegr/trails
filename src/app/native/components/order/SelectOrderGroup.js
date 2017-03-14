'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import {connect} from 'react-redux'

import CallToAction from '../shared/CallToAction'
import Card from '../shared/Card'
import ImagePath from '../shared/ImagePath'
import EventGroup from './EventGroup'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  Graphics
} from '../../../../common/__'

class SelectOrderGroup extends Component {
  constructor(props) {
    super(props)
    this._nextStep = this._nextStep.bind(this)

    this.state = {
      selectedGroup: null
    }
  }

  _nextStep() {
    this.props.navigator.push({
      id: 'OrderEvent',
      title: LANG.t('order.SignUp'),
      passProps: {
        event: this.props.event,
        selectedGroup: this.state.selectedGroup
      }
    })
  }

  render() {
    const {event} = this.props,
      eventBackgroundUrl = ImagePath({type: 'background', path: UTIL.getEventHeroPath(event)})

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView
          backgroundSource={{uri: eventBackgroundUrl}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Card
              align={'bottom'}
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
                      label={UTIL.formatEventGroupLabel(event, index)}
                      signUps={LANG.t('event.numberOfPeopleAlreadySignedUp', {count: group.signUps.length})}
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
          label={LANG.t('glossary.NextStep')}
          onPress={this._nextStep}
        />
      </View>
    )
  }
}

SelectOrderGroup.propTypes = {
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

/*
function mapDispatchToProps(dispatch) {
  return {
  }
}
*/

export default connect(mapStateToProps)(SelectOrderGroup)
