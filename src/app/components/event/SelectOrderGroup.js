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
import {bindActionCreators} from 'redux'
import * as navbarActions from '../../redux/actions/navbarActions'

import CallToAction from '../shared/CallToAction'
import ImagePath from '../shared/ImagePath'
import Intro from '../shared/Intro'
import EventGroup from './EventGroup'

import styles from '../../styles/main'

import {
  CONSTANTS,
  LANG,
  UTIL,
  Graphics
} from '../../settings'

class SelectOrderGroup extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)

    this.state = {
      selectedGroup: null
    }
  }

  componentWillMount() {
    this.props.navbarActions.gotToSignUp()
  }

  nextStep() {
    this.props.navigator.push({
      id: 'OrderEvent',
      title: LANG.t('order.Signup'),
      passProps: {
        event: this.props.event,
        selectedGroup: this.state.selectedGroup
      }
    })
  }

  render() {
    const {event} = this.props,
    eventBackgroundUrl = ImagePath({type: 'background', path: CONSTANTS.CONSTANTS.ASSET_FOLDERS.EVENT + '/' + event._id + '/' + event.hero})

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView
          backgroundSource={{uri: eventBackgroundUrl}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Intro
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
          onPress={this.nextStep}
        />
      </View>
    )
  }
}

SelectOrderGroup.propTypes = {
  user: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  navbarActions: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navbarActions: bindActionCreators(navbarActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectOrderGroup)
